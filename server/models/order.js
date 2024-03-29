const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongooseSerial = require("mongoose-serial")

const orderSchema = new Schema({
  code: String,
  date: Date,
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  deliveryDate: String,
  packaging: String,
  desc: String,
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  deliveryPlace: String,
  startDate: Date,
  finishDate: Date,
  recordNo: String,
})

orderSchema.set("timestamps", true)
orderSchema.plugin(mongooseSerial, {
  field: "recordNo",
  initCounter: "yearly",
  separator: "-",
  digits: 5,
  prefix: "OR",
})

// Define a static method for calculating totalM2
orderSchema.statics.calculateTotals = async function (orderId) {
  try {
    const result = await this.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(orderId) },
      },
      {
        $lookup: {
          from: "items",
          localField: "items",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$_id",
          totalM2: { $sum: "$items.totalM2" },
          totalQuanty: { $sum: "$items.quanty" },
        },
      },
    ])


    if (result.length > 0) {
      return {
        totalM2: truncateNumber(result[0].totalM2),
        totalQuanty: result[0].totalQuanty,
      }
    }

    return { totalM2: 0, totalQuanty: 0 } // Or any default value you prefer
  } catch (error) {
    console.error("Error calculating totalM2:", error)
    throw error
  }
}

// Add a static method to the Order model for grouping items
orderSchema.statics.groupItems = async function (orderId, additionalFields) {
  try {
    const result = await this.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(orderId) },
      },
      {
        $lookup: {
          from: "items", // Assuming the name of the items collection is "items"
          localField: "items",
          foreignField: "_id",
          as: "itemsDetails",
        },
      },
      {
        $unwind: "$itemsDetails",
      },
      {
        $group: {
          _id: {
            color: "$itemsDetails.color",
            side: "$itemsDetails.side",
            product: "$itemsDetails.product",
            thickness: "$itemsDetails.thickness",
            gloss: "$itemsDetails.gloss",
          },
          orderId: { $first: "$_id" },
          orderCode: { $first: "$code" },
          items: { $push: "$itemsDetails" },
        },
      },
    ])

    if (result.length > 0) {
      const savedOrders = []

      for (const order of result) {
        // console.log("GROUPED ORDER", order)
        const newGroupedOrder = new GroupedOrder({
          color: order._id.color,
          side: order._id.side,
          company: additionalFields.company,
          items: order.items,
          order: order.orderId,
          product: order._id.product,
          thickness: order._id.thickness,
          gloss: order._id.gloss,
        })

        // console.log("NEW GROUPED ORDER :: ", newGroupedOrder);

        // Save the new grouped order one by one
        const savedOrder = await newGroupedOrder.save()
        savedOrders.push(savedOrder)
      }

      // Calculate totalM2 for each grouped order
      for (const order of savedOrders) {
        const { totalM2, totalQuanty } = await this.calculateTotals(order._id)
        order.totalM2 = totalM2 // Assuming you have a field for totalM2 in the GroupedOrder model
        order.totalQuanty = totalQuanty // Assuming you have a field for totalM2 in the GroupedOrder model
        await order.save() // Save the updated totalM2 to the database
      }

      return savedOrders
    }

    return []
  } catch (err) {
    console.error(err)
    throw err
  }
}

const Order = mongoose.model("Order", orderSchema)

const GroupedOrderSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: "Order" },
  color: String,
  side: String,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  thickness: Number,
  totalM2: Number,
  totalQuanty: Number,
  gloss: String,

  // Additional fields specific to this type of grouped order
})

// Create a discriminator model for this specific type of grouped order
const GroupedOrder = Order.discriminator("GroupedOrder", GroupedOrderSchema)

module.exports = Order

function truncateNumber(number, digits = 2) {
  const result = Number(number.toString().match(/^\d+(?:\.\d{0,2})?/))
  return result
}
