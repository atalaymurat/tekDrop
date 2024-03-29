const Order = require("../models/order")
const Item = require("../models/item")
const isEqual = require("lodash/isEqual")

module.exports = {
  show: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id).populate([
        { path: "company" },
      ])

      const subOrders = await Order.discriminators["GroupedOrder"]
        .find({ order: order._id })
        .populate([{ path: "items" }])
        .populate("product")
      const data = { ...order._doc, subOrders }
      res.status(200).json(data)
    } catch (err) {
      res.status(404).send({ error: "error on controller order show" })
    }
  },
  index: async (req, res, next) => {
    try {
      // FIND ORDERS
      const docs = await Order.find({ __t: { $exists: false } }).populate(
        "company"
      )
      res.status(200).json(docs)
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, msg: err.message })
    }
  },
  create: async (req, res, next) => {
    try {
      let data = req.body
      const { items, ...orderData } = data

      // CREATE ORDER
      let doc = new Order(orderData)

      // CREATE ASSOCIATED ITEMS
      if (items?.length > 0) {
        const createdItems = []

        for (const itemData of items) {
          try {
            // Assuming you have an Item model
            const item = new Item(itemData)
            item.order = doc._id // Associate the item with the order
            await item.save()

            createdItems.push(item)
          } catch (error) {
            console.error("Error creating item:", error)
            // Handle the error as needed (e.g., log it, throw it, etc.)
          }
        }

        // Update the order with the associated item references
        doc.items = createdItems.map((item) => item._id)
        await doc.save()

        // Call groupItems to group items after creating the order
        const additionalFields = orderData
        await Order.groupItems(doc._id, additionalFields)
      }
      // END CREATE ITEMS

      res.status(200).json({ success: true, doc })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, msg: err.message })
    }
  },
  edit: async (req, res, next) => {
    try {
      // FIND ORDER
      const order = await Order.findById(req.params.id).populate([
        {
          path: "company",
          path: "items",
        },
      ])

      if (!order) {
        return
      }

      res.status(200).json(order)
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, msg: err.message })
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params
      const data = req.body

      // FIND ORDER TO UPDATE
      const doc = await Order.findById(id).populate({ path: "items" })

      // Delete all items if update data does not contain any items
      if (!data.items && doc.items.length > 0) {
        await Item.deleteMany({ _id: { $in: doc.items } })
        doc.items = [] // Clear items array
      }

      // Update associated items
      if (data.items && data.items.length > 0) {
        // Get the list of current item IDs associated with the order
        const currentItems = doc.items.map((item) => item.toObject())
        const updatedItems = data.items.map((item) => item)

        // Identify items to delete
        const itemsToDelete = currentItems.filter(
          (item) =>
            !updatedItems.some(
              (updatedItem) =>
                updatedItem?._id &&
                updatedItem?._id.toString() === item?._id.toString()
            )
        )
        const itemsToDeleteIds = itemsToDelete.map((item) =>
          item._id.toString()
        )
        // Delete the items
        if (itemsToDeleteIds.length > 0) {
          // await Item.deleteMany({ _id: { $in: itemsToDeleteIds } })


          // Remove deleted item IDs from doc.items array
          const removedItems = doc.items
            .map((item) => item._id.toString()) // Map to IDs
            .filter((itemId) => {
              return !itemsToDeleteIds.includes(itemId) // Filter out deleted item IDs
            })

          doc.set({ items: removedItems })

        }

        // Identify new items to create
        const newItems = updatedItems.filter((item) => !item._id)

        // Create new items
        if (newItems.length > 0) {
          const createdItems = await Item.create(newItems)
          // Associate the new items with the order
          doc.items = doc.items.concat(createdItems.map((item) => item._id))
        }

        // Identify items to update
        const itemsToUpdate = data.items.filter((updatedItem) => {
          const currentItem = currentItems.find(
            (item) => item._id.toString() === updatedItem._id
          )
          return currentItem && !isEqual(currentItem, updatedItem)
        })

        // Update existing items
        if (itemsToUpdate.length > 0) {
          for (const itemData of itemsToUpdate) {
            const itemId = itemData._id
            const itemToUpdate = await Item.findById(itemId)

            // Update fields in the item
            Object.assign(itemToUpdate, itemData)

            // Save the updated item
            await itemToUpdate.save()

          }
        }
      }

      // FIND SUB ORDERS FOR ORDER
      const subOrders = await Order.discriminators["GroupedOrder"].find({
        order: id,
      })

      // Delete all associated GroupedOrder documents
      if (subOrders && subOrders.length > 0) {
        for (const subOrder of subOrders) {
          if (subOrder.__t === "GroupedOrder") {
            const subOrderDeleted = await Order.deleteOne({ _id: subOrder._id })
          }
        }
      }

      // save doc
      await doc.save()

      // Call groupItems to group items after creating the order
      const additionalFields = { company: doc.company }
      const resGroup = await Order.groupItems(doc._id, additionalFields)

      res.status(200).json({ msg: "success", doc })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, msg: err.message })
    }
  },
  destroy: async (req, res, next) => {
    try {
      let id = req.params.id
      // FIND ORDER TO DELETE
      const doc = await Order.findByIdAndDelete(id)
      res.status(200).json({ success: true, doc })
    } catch (err) {
      res.status(400).json({
        success: false,
        msg: err,
      })
    }
  },
  // ENUM VCALUES FOR DROPDOWN SELECTION LIST ON FORMS
  enums: async (req, res, next) => {
    try {
      const { enumValue } = req.body
      // console.log(enumValue)
      // if enum value is not exist in schema path then return error
      if (!Order.schema.path(enumValue)) {
        return res.status(400).json({ error: "Enum value is not exist" })
      }
      // Make enums to object array with label and value
      const enums = await Order.schema.path(enumValue).enumValues.map((e) => {
        return { label: e, value: e }
      })
      const concatEnums = [{ label: "seçiniz...", value: "" }, ...enums]

      res.status(200).json(concatEnums)
    } catch (err) {
      console.log("ENUM ERROR ", err)
    }
  },
}
