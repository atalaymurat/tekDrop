import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, FieldArray } from "formik"
import FormikControl from "../formik/FormikControl"
import CompanyForm from "./NewCompanyForm"
import axios from "axios"
import SalesConditions from "./formComponents/SalesConditions"
import ProductionConditions from "./formComponents/ProductionConditions"
import Dimensions from "./formComponents/Dimensions"
import VALIDATION_SCHEMA from "./formComponents/validations"
import {
  DEFAULTS_VALUES,
  TEKLIF_TYPES,
  GLOSS_OPTIONS,
  CUR_TYPES,
  SIDE_OPTIONS,
  UNIT_TYPES,
  STATUS_TYPES,
} from "./formComponents/defaultValues"
import WorkButtonGroup from "./formComponents/WorkButtonGroup"
import RemoveWorkButton from "./formComponents/RemoveWorkButton"
import SaveButtons from "./formComponents/SaveButtons"
import {
  setProductOptions,
  reformData,
  getCompanies,
} from "./formComponents/helperFunctions"

const validationSchema = VALIDATION_SCHEMA

const OfferForm = ({ offer, setFormHead }) => {
  const [editMode, setEditMode] = useState(false)
  const [products, setProducts] = useState([])
  const [companyOptions, setCompanyOptions] = useState([])
  const [newCompany, setNewCompany] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    getCompanies(setCompanyOptions)
  }, [newCompany])

  useEffect(() => {
    if (offer) setEditMode(true)
  }, [offer])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/products")
      setProducts(data)
    }
    getData()
  }, [])

  const handleDelete = async () => {
    if (window.confirm("Silme Islemini Onayliyormusun")) {
      await axios.delete(`/offers/${offer._id}`)
      navigate("/offer")
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={offer || DEFAULTS_VALUES}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (!editMode) {
          reformData(values)

          const res = await axios.post("/offers/", values)
          setSubmitting(false)
          resetForm()
          navigate(`/offer/${res.data.offer._id}`)
        }
        if (editMode) {
          reformData(values)
          await axios.patch(`/offers/${offer._id}`, values)
          setSubmitting(false)
          navigate("/offer")
        } else return
      }}
    >
      {({ values, setFieldValue }) => {
        const handleProductChange = (selectedProduct, index) => {
          console.log("Selected Products", selectedProduct)
          const selectedProductData = products.find(
            (p) => p._id === selectedProduct.value
          )
          console.log(
            "SELECTED PRODUCT DATA",
            JSON.stringify(selectedProductData, null, 2)
          )
          setFieldValue(`works.${index}.gloss`, selectedProductData.finishGloss )
          setFieldValue(`works.${index}.side`, selectedProductData.finishSide )
          setFieldValue(`works.${index}.price`, selectedProductData.netPrice )
          setFieldValue(`works.${index}.unit`, selectedProductData.unit )
        }
        return (
          <React.Fragment>
            <div className="flex flex-col items-center mx-auto">
              <CompanyForm setNewCompany={setNewCompany} />
              <Form autoComplete="off">
                <div className="flex flex-col max-w-5xl  mx-auto">
                  <div className="bg-blue-200 px-4 py-8 rounded-lg w-full flex flex-col">
                    <FormikControl
                      control="reactSelect"
                      type="text"
                      options={companyOptions}
                      name="company"
                      label="Kayıtlı Firma"
                    />
                    <FormikControl
                      control="select"
                      type="text"
                      name="offerType"
                      options={TEKLIF_TYPES}
                      label="Teklif Tipi"
                      onClick={
                        !editMode ? () => setFormHead(values.offerType) : null
                      }
                    />
                    <div className="bg-blue-200 grid grid-cols-4 gap-1">
                      <FormikControl
                        control="input"
                        type="text"
                        name="person"
                        label="Yetkili"
                      />
                    </div>
                    <div className="bg-blue-200 grid grid-cols-4 gap-1 pt-1">
                      <FormikControl
                        control="input"
                        type="text"
                        name="discount"
                        label="Indirim"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        name="kdv"
                        label="kdv"
                      />
                    </div>
                  </div>

                  {values.works
                    .sort((a, b) => a.position - b.position)
                    .map((w, i) => (
                      <FieldArray name="works" key={"ww-" + i}>
                        {({ insert, remove, push }) => (
                          <>
                            <div
                              className={`${
                                i % 2 === 0 ? "bg-green-200" : "bg-red-200"
                              } px-4 py-8 rounded-lg w-full my-4`}
                            >
                              <div className="grid grid-cols-full mb-2">
                                <FormikControl
                                  control="reactSelect"
                                  options={setProductOptions(products)}
                                  type="text"
                                  name={`works.${i}.product`}
                                  label="Ürün"
                                  onChange={(selectedOption) =>
                                    handleProductChange(selectedOption, i)
                                  }
                                />

                              </div>
                              <div className="grid grid-cols-3 gap-2 col-span-3">
                                <FormikControl
                                  control="input"
                                  type="text"
                                  name={`works.${i}.typeOfwork`}
                                  label="Özel Açıklama"
                                />
                                <FormikControl
                                  control="input"
                                  type="text"
                                  name={`works.${i}.color`}
                                  label="Renk"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                  <FormikControl
                                    control="input"
                                    type="text"
                                    name={`works.${i}.thickness`}
                                    label="Kalinlik"
                                  />
                                  <FormikControl
                                    control="select"
                                    options={UNIT_TYPES}
                                    type="text"
                                    name={`works.${i}.unit`}
                                    label="Birim"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-1">
                                <FormikControl
                                  control="select"
                                  options={GLOSS_OPTIONS}
                                  type="text"
                                  name={`works.${i}.gloss`}
                                  label="Gloss"
                                />
                                <FormikControl
                                  control="select"
                                  options={SIDE_OPTIONS}
                                  type="text"
                                  name={`works.${i}.side`}
                                  label="Yüz"
                                />
                              </div>
                              <Dimensions
                                works={w}
                                name={`works.${i}.dimensions`}
                              />
                              <div className="grid grid-cols-6 gap-1">
                                <FormikControl
                                  control="input"
                                  type="text"
                                  name={`works.${i}.price.val`}
                                  label="Fiyat"
                                />
                                <FormikControl
                                  control="select"
                                  options={CUR_TYPES}
                                  type="text"
                                  name={`works.${i}.price.cur`}
                                  label="Para Birimi"
                                />
                                <FormikControl
                                  control="input"
                                  name={`works.${i}.position`}
                                  label="Pozisyon"
                                />
                                <FormikControl
                                  control="checkbox"
                                  name={`works.${i}.noList`}
                                  label="No List"
                                />
                                <FormikControl
                                  control="checkbox"
                                  name={`works.${i}.machineData`}
                                  label="Makina Datasına Ekle"
                                />
                                <FormikControl
                                  control="checkbox"
                                  name={`works.${i}.interChangeable`}
                                  label="Dönebilir"
                                />
                              </div>
                            </div>
                            {values.works.length - i === 1 ? (
                              <WorkButtonGroup
                                values={values}
                                i={i}
                                remove={remove}
                                push={push}
                              />
                            ) : (
                              <RemoveWorkButton remove={remove} i={i} />
                            )}
                          </>
                        )}
                      </FieldArray>
                    ))}
                  <SalesConditions />
                  <ProductionConditions statusType={STATUS_TYPES} />

                  <SaveButtons offer={offer} handleDelete={handleDelete} />

                  <div className="w-100 bg-slate-400 h-100 p-8 my-4">
                    <pre>{JSON.stringify(values, null, 4)}</pre>
                  </div>
                </div>
              </Form>
            </div>
          </React.Fragment>
        )
      }}
    </Formik>
  )
}

export default OfferForm
