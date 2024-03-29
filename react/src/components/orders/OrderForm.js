import React, { useState, useEffect } from "react"
import { Formik, Form, FieldArray } from "formik"
import FormikControl from "../formik/FormikControl"
import { DEFAULT_ORDER } from "../orders/formComponents/defaultValues"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getCompanies } from "../offers/formComponents/helperFunctions"
import ItemSubForm from "./ItemSubForm"
import ItemsList from "./formComponents/ItemsList"
import VALIDATE_SCHEMA from "../orders/formComponents/validation"
import { removeEmptyFields } from "./formComponents/helperFunctions"


const validationSchema = VALIDATE_SCHEMA

const OrderForm = ({ order }) => {
  const [editMode, setEditMode] = useState(false)
  const [companyOptions, setCompanyOptions] = useState([])
  const [showSubForm, setShowSubForm ] = useState(true)
  const navigate = useNavigate()
  const [editIndex, setEditIndex] = useState(null)
  const [products, setProducts] = useState([])



  useEffect(() => {
    getCompanies(setCompanyOptions)
  }, [])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/products")
      setProducts(data)
    }
    getData()
  }, [])

  useEffect(() => {
    if (order) setEditMode(true)
  }, [order])

  

  return (
    <Formik
      enableReinitialize
      initialValues={order || DEFAULT_ORDER}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (!editMode) {
          const removedItems = removeEmptyFields(values.items)
          values.items = removedItems
          alert(JSON.stringify(values, null, 1))
          const res = await axios.post("/orders/", values)
          console.log(JSON.stringify(res.doc, null, 1))
          setSubmitting(false)
          navigate(`/order`)
        }
        if (editMode) {
          await axios.patch(`/orders/${order._id}`, values)
          setSubmitting(false)
          navigate("/order")
        } else return
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <React.Fragment>
            <Form autoComplete="off">
              <div className="grid grid-cols-1 gap-1 mx-2 my-4">
                <FormikControl
                  control="reactSelect"
                  type="text"
                  options={companyOptions}
                  name="company"
                  label="Firma"
                />
                {/* ItemList ve SubForm mantıksal sıkıntı var 
                    values burda maplayip Field array indexleri teker teker basarsak daha kolay olucak
                    itemSub Form last index aldıgı için form surekli bir degeri alıyor 
                    su an sistem çok karısık düzeltmek lazım.
                */ }
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <>
                      <ItemsList
                        values={values}
                        arrayHelpers={arrayHelpers}
                        editIndex={editIndex}
                        setEditIndex={setEditIndex}
                        products={products}
                      />
                      { showSubForm ? 
                      
                      <ItemSubForm
                        values={values}
                        arrayHelpers={arrayHelpers}
                        editIndex={editIndex}
                        setEditIndex={setEditIndex}
                        setFieldValue={setFieldValue}
                        products={products}
                        show={showSubForm}
                        setShow={setShowSubForm}
                        editMode={editMode}
                      />
                    : <button 
                    className="btn-cancel"
                    type="button"
                    onClick={() => setShowSubForm(true)}
                    >Yeni</button> }
                    </>
                  )}
                />
                <button type="submit" className="btn-submit mt-4 mb-8">
                  Kaydet
                </button>
              </div>
            </Form>
            <div>
              <pre>{JSON.stringify(editMode, null, 1)}</pre>
              Values of Form :::: 
              <pre>{JSON.stringify(values, null, 1)}</pre>
            </div>
          </React.Fragment>
        )
      }}
    </Formik>
  )
}

export default OrderForm
