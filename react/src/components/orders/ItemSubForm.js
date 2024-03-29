import React, { useRef, useEffect } from "react"
import FormikControl from "../formik/FormikControl"
import ButtonPush from "./formComponents/ButtonPush"
import {
  GLOSS_OPTIONS,
  SIDE_OPTIONS,
  TURN_OPTIONS,
  UNIT_TYPES,
} from "../offers/formComponents/defaultValues"
import { DEFAULT_ITEM } from "./formComponents/defaultValues"
import { setProductOptions } from "../offers/formComponents/helperFunctions"

const ItemSubForm = ({
  values,
  arrayHelpers,
  editIndex,
  setEditIndex,
  setFieldValue,
  products,
  setShow,
}) => {
  const lengthInputRef = useRef(null)
  const isEditIndexMode = editIndex !== null

  const handleCloseForm = () => {
    // remove the last item in the array when closed
    // write a condition if values.items last one do not have quanty then remove it ??
    // Get the last item in the items array
    const lastItem = values.items[values.items.length - 1]

    if (!lastItem?.quanty) {
      arrayHelpers.remove(values.items.length - 1)
    }

    setShow(false)
  }

  const handleProductChange = (selectedProduct, index) => {
    console.log("Selected Products", selectedProduct)
    const selectedProductData = products.find(
      (p) => p._id === selectedProduct.value
    )
    console.log(
      "SELECTED PRODUCT DATA",
      JSON.stringify(selectedProductData, null, 2)
    )
    setFieldValue(`items.${index}.side`, selectedProductData.finishSide)
    setFieldValue(`items.${index}.unit`, selectedProductData.unit)
  }

  // Use this to set default values in ButtonPush
  const lastItemValues =
    values.items.length > 0
      ? {
          length: "",
          width: "",
          quanty: "",
          product: values.items[values.items.length -1].product,
          model: values.items[values.items.length -1].model,
          gloss: values.items[values.items.length -1].gloss,
          side: values.items[values.items.length -1].side,
          thickness: values.items[values.items.length -1].thickness,
          color: values.items[values.items.length -1].color,
          unit: values.items[values.items.length -1].unit,
        }
      : DEFAULT_ITEM

  const handleSave = () => {
    setEditIndex(null) // Reset edit mode after saving changes
  }

  // useEffect to set focus on the length input when the component mounts or when buttons are clicked
  useEffect(() => {
    lengthInputRef.current.focus()
  }, [values.items.length]) // Adding values.items.length as a dependency to trigger the effect when items length changes

  return (
    <div className="grid grid-cols-3 gap-1 my-4 border-y-2 py-4">
      <div className="grid col-span-full">
        <FormikControl
          control="reactSelect"
          options={setProductOptions(products)}
          type="text"
          name={
            isEditIndexMode
              ? `items.${editIndex}.product`
              : `items.${values.items.length - 1}.product`
          }
          label="Ürün"
          onChange={
            isEditIndexMode
              ? (selectedOption) =>
                  handleProductChange(selectedOption, editIndex)
              : (selectedOption) =>
                  handleProductChange(selectedOption, values.items.length - 1)
          }
        />
      </div>
      <div className="grid grid-cols-5 gap-1 col-span-3">
        <FormikControl
          control="input"
          type="text"
          name={
            isEditIndexMode
              ? `items.${editIndex}.color`
              : `items.${values.items.length - 1}.color`
          }
          label="Renk"
        />
        <div className="col-span-2">
          <FormikControl
            control="input"
            type="text"
            name={
              isEditIndexMode
                ? `items.${editIndex}.desc`
                : `items.${values.items.length - 1}.desc`
            }
            label="Açıklama"
          />
        </div>
        <div className="grid grid-cols-3 col-span-2 gap-1">
          <div className="col-span-2">
            <FormikControl
              control="input"
              type="text"
              name={
                isEditIndexMode
                  ? `items.${editIndex}.model`
                  : `items.${values.items.length - 1}.model`
              }
              label="Model"
            />
          </div>
          <FormikControl
            control="input"
            type="text"
            name={
              isEditIndexMode
                ? `items.${editIndex}.thickness`
                : `items.${values.items.length - 1}.thickness`
            }
            label="Kalınlık"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 col-span-3">
        <FormikControl
          control="select"
          type="text"
          options={TURN_OPTIONS}
          name={
            isEditIndexMode
              ? `items.${editIndex}.turnable`
              : `items.${values.items.length - 1}.turnable`
          }
          label="Yön"
        />

        <FormikControl
          control="select"
          options={SIDE_OPTIONS}
          type="text"
          name={
            isEditIndexMode
              ? `items.${editIndex}.side`
              : `items.${values.items.length - 1}.side`
          }
          label="Yüz"
        />
        <FormikControl
          control="select"
          options={GLOSS_OPTIONS}
          type="text"
          name={
            isEditIndexMode
              ? `items.${editIndex}.gloss`
              : `items.${values.items.length - 1}.gloss`
          }
          label="Gloss"
        />
        <FormikControl
          control="select"
          options={UNIT_TYPES}
          type="text"
          name={
            isEditIndexMode
              ? `items.${editIndex}.unit`
              : `items.${values.items.length - 1}.unit`
          }
          label="Birim"
        />
      </div>
      <FormikControl
        control="input"
        type="text"
        name={
          isEditIndexMode
            ? `items.${editIndex}.length`
            : `items.${values.items.length - 1}.length`
        }
        label="Boy"
        inputRef={lengthInputRef}
      />
      <FormikControl
        control="input"
        type="text"
        name={
          isEditIndexMode
            ? `items.${editIndex}.width`
            : `items.${values.items.length - 1}.width`
        }
        label="En"
      />
      <FormikControl
        control="input"
        type="text"
        name={
          isEditIndexMode
            ? `items.${editIndex}.quanty`
            : `items.${values.items.length - 1}.quanty`
        }
        label="Adet"
      />

      {isEditIndexMode ? (
        <button
          type="button"
          onClick={handleSave}
          className="col-span-full btn-green mx-2 my-4"
        >
          kaydet
        </button>
      ) : (
        <>
          <ButtonPush
            arrayHelpers={arrayHelpers}
            className="col-span-full btn-submit mx-2 my-4"
            defaultValues={lastItemValues}
          />
          <button
            className="btn-green col-span-full mx-2 my-2"
            type="button"
            onClick={handleCloseForm}
          >
            Kapat
          </button>
        </>
      )}
    </div>
  )
}

export default ItemSubForm
