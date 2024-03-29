import React, { useState, useEffect } from "react"
import { Formik, Form } from "formik"
import FormikControl from "../formik/FormikControl"
import axios from "axios"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"

const validationSchema = Yup.object({
  surfaceMaterial: Yup.string().required("Gerekli"),
  productType: Yup.string().required("Gerekli"),
  surfaceShape: Yup.string().required("Gerekli"),
  finish: Yup.string().required("Gerekli"),
  baseLaqType: Yup.string().required("Gerekli"),
  finishLaqType: Yup.string().required("Gerekli"),
  finishPore: Yup.string().required("Gerekli"),
  finishGloss: Yup.string().required("Gerekli"),
  finishSide: Yup.string().required("Gerekli"),
  finishColor: Yup.string().required("Gerekli"),
  unit: Yup.string().required("Gerekli"),
})

const ProductForm = ({ product }) => {
  const [editMode, seteditMode] = useState(false)
  const [labels, setLabels] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (product) seteditMode(true)
  }, [product])

  useEffect(() => {
    const getData = async () => {
      // Get enum values from backend mongoose schema
      const enumFields = [
        "unit",
        "surfaceMaterial",
        "productType",
        "finish",
        "finishPore",
        "finishGloss",
        "finishSide",
        "finishColor",
        "surfaceShape",
        "baseLaqType",
        "finishLaqType",
        "productionStyle",
      ]
      const labels = {}

      const promiseArray = enumFields.map(async (field) => {
        const { data } = await axios.post(`/products/enums`, {
          enumValue: field,
        })
        // data is an array of enum values label:value pairs

        labels[field] = data
      })

      Promise.all(promiseArray)
        .then(() => {
          setLabels((prevLabels) => ({
            ...prevLabels,
            ...labels,
          }))
        })
        .catch((error) => {
          console.error("Promise.all error:", error)
        })
    }

    getData()
  }, [])

  // Render if labels is not null
  if (labels) {
    return (
      <div className="max-w-2xl mx-auto p-2 m-4 border border-emerald-700">
        [ProductForm]
        <Formik
          enableReinitialize
          initialValues={
            product || {
              name: "",
              desc: "",
              priceGroup: "",
              image: "",
              unit: "",
              surfaceMaterial: "",
              productType: "",
              surfaceShape: "",
              finish: "",
              finishPore: "",
              finishGloss: "",
              finishSide: "",
              finishColor: "",
              netPrice: { cur: "", val: "" },
              listPrice: { cur: "", val: "" },
              baseLaqType: "",
              finishLaqType: "",
              productionStyle: "",
              thickness:"",
            }
          }
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (editMode) {
              alert(JSON.stringify(values, null, 2))
              await axios.patch(`/products/${product._id}`, values)
              setSubmitting(false)
              navigate("/product")
            }
            // create mode
            if (!editMode) {
              setSubmitting(true)
              alert(JSON.stringify(values, null, 2))
              const res = await axios.post(`/products`, values)
              console.log("res.data:", res)
              setSubmitting(false)
              resetForm()
            } else return
          }}
        >
          {({ values, submitting }) => {
            return (
              <Form autoComplete="off">
                <FormikControl
                  control="input"
                  type="text"
                  label="Name"
                  name="name"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Desc"
                  name="desc"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Kalınlık"
                  name="thickness"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Price Group"
                  name="priceGroup"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Image"
                  name="image"
                />
                <div className="grid grid-cols-4 gap-1">
                  <div className="col-span-3">
                    <FormikControl
                      control="input"
                      type="text"
                      label="Net Price"
                      name="netPrice.val"
                    />
                  </div>
                  <FormikControl
                    control="select"
                    options={[
                      { label: "Seçiniz", value: "" },
                      { label: "TL", value: "TL" },
                      { label: "USD", value: "USD" },
                      { label: "EUR", value: "EUR" },
                    ]}
                    type="text"
                    label="Para Birimi"
                    name="netPrice.cur"
                  />
                </div>
                <div className="grid grid-cols-4 gap-1">
                  <div className="col-span-3">
                    <FormikControl
                      control="input"
                      type="text"
                      label="List Price"
                      name="listPrice.val"
                    />
                  </div>
                  <FormikControl
                    control="select"
                    options={[
                      { label: "Seçiniz", value: "" },
                      { label: "TL", value: "TL" },
                      { label: "USD", value: "USD" },
                      { label: "EUR", value: "EUR" },
                    ]}
                    type="text"
                    label="Para Birimi"
                    name="listPrice.cur"
                  />
                </div>
                <FormikControl
                  control="select"
                  label="Style"
                  name="productionStyle"
                  options={labels.productionStyle}
                />
                <FormikControl
                  control="select"
                  label="Finish"
                  name="finish"
                  options={labels.finish}
                />
                <FormikControl
                  control="select"
                  label="Unit"
                  name="unit"
                  options={labels.unit}
                />
                <FormikControl
                  control="select"
                  label="Surface Material"
                  name="surfaceMaterial"
                  options={labels.surfaceMaterial}
                />
                <FormikControl
                  control="select"
                  label="Product Type"
                  name="productType"
                  options={labels.productType}
                />
                <FormikControl
                  control="select"
                  label="Surface Shape"
                  name="surfaceShape"
                  options={labels.surfaceShape}
                />
                <FormikControl
                  control="select"
                  label="Finish Pore"
                  name="finishPore"
                  options={labels.finishPore}
                />
                <FormikControl
                  control="select"
                  label="Finish Gloss"
                  name="finishGloss"
                  options={labels.finishGloss}
                />
                <FormikControl
                  control="select"
                  label="Finish Side"
                  name="finishSide"
                  options={labels.finishSide}
                />
                <FormikControl
                  control="select"
                  label="Finish Color"
                  name="finishColor"
                  options={labels.finishColor}
                />
                <FormikControl
                  control="select"
                  label="Base Laq Type"
                  name="baseLaqType"
                  options={labels.baseLaqType}
                />
                <FormikControl
                  control="select"
                  label="Finish Laq Type"
                  name="finishLaqType"
                  options={labels.finishLaqType}
                />

                <button
                  type="submit"
                  className="btn-submit mt-4 mb-8 w-full"
                  disabled={submitting}
                >
                  Kaydet
                </button>
              </Form>
            )
          }}
        </Formik>
        <pre>{/* JSON.stringify(labels, null, 4)  */}</pre>
      </div>
    )
  }
}

export default ProductForm
