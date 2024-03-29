import React, { useEffect, useState } from "react"
import { Formik, Form } from "formik"
import { useNavigate } from "react-router-dom"
import FormikControl from "../formik/FormikControl"
import axios from "axios"
import * as Yup from "yup"
import { format } from "date-fns"

const validationSchema = Yup.object({
  name: Yup.string().required("Gerekli").min(3, "min 3 karakter"),
})

function PaintForm({ paint }) {
  const [editMode, seteditMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (paint) seteditMode(true)
  }, [paint])

  const handleDelete = async () => {
    if (window.confirm("Silme Islemini Onayliyormusun")) {
      await axios.delete(`/paints/${paint._id}`)
      navigate("/paints")
    }
  }

  return (
    <React.Fragment>
      <p className="text-xs mx-auto text-center">
        Paint Form {<div>EditMode: {JSON.stringify(editMode)} </div>}
      </p>
      <Formik
        enableReinitialize
        initialValues={
          paint || {
            name: "",
            brand: "",
            mainCode: "",
            gloss: "",
            mainQ: { value: "", unit: "" },
            compenant01Q: { value: "", unit: "" },
            baseType: "",
            netPriceTL: "",
            netPriceEUR: "",
            desc: "",
          }
        }
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (editMode) {
            alert(JSON.stringify(values, null, 2))
            await axios.patch(`/paints/${paint._id}`, values)
            setSubmitting(false)
            navigate(`/paints`)
          }
          if (!editMode) {
            alert(JSON.stringify(values, null, 2))
            const res = await axios.post("/paints", values)
            console.log("AXIOS RES", res)
            resetForm()
          } else return
        }}
      >
        <Form autoComplete="off">
          {editMode && 
          <div className="flex flex-col text-slate-600">
            <div className="flex flex-row gap-2">
              <div className="w-1/5 font-semibold">Oluşturma</div>
              <div>
                {paint?.createdAt
                  ? format(new Date(paint.createdAt), "dd/MM/yyyy")
                  : null}
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="w-1/5 font-semibold">Güncelleme</div>
              <div>
                {paint?.createdAt
                ? format(new Date(paint.createdAt), "dd/MM/yyyy")
                  : null}
              </div>
            </div>
          </div>
          }
          <FormikControl control="input" type="text" label="Name" name="name" />
          <FormikControl
            control="input"
            type="text"
            label="brand"
            name="brand"
          />
          <FormikControl
            control="input"
            type="text"
            label="Malzeme Kod"
            name="mainCode"
          />
          <div className="grid grid-cols-2 gap-1">
            <FormikControl
              control="input"
              type="text"
              label="Ana Malzeme miktar"
              name="mainQ.value"
            />
            <FormikControl
              control="select"
              label="Ana Malzeme Birim"
              name="mainQ.unit"
              options={[
                { label: "Select...", value: "" },
                { label: "Kg", value: "Kg" },
                { label: "Lt", value: "Lt" },
              ]}
            />
          </div>
          <FormikControl
            control="input"
            type="text"
            label="K1 Code"
            name="compenant01Code"
          />
          <div className="grid grid-cols-3 gap-1">
            <FormikControl
              control="input"
              type="text"
              label="Katalizör 01 miktar"
              name="compenant01Q.value"
            />
            <FormikControl
              control="select"
              label="Katalizör 01 Birim"
              name="compenant01Q.unit"
              options={[
                { label: "Select...", value: "" },
                { label: "Kg", value: "Kg" },
                { label: "Lt", value: "Lt" },
              ]}
            />
            <FormikControl control="input" label="Oran" name="comp1Ratio" />
          </div>
          <FormikControl
            control="input"
            type="text"
            label="K2 Code"
            name="compenant02Code"
          />
          <div className="grid grid-cols-3 gap-1">
            <FormikControl
              control="input"
              type="text"
              label="Katalizör 02 miktar"
              name="compenant02Q.value"
            />
            <FormikControl
              control="select"
              label="Katalizör 02 Birim"
              name="compenant02Q.unit"
              options={[
                { label: "Select...", value: "" },
                { label: "Kg", value: "Kg" },
                { label: "Lt", value: "Lt" },
              ]}
            />
            <FormikControl control="input" label="Oran" name="comp2Ratio" />
          </div>
          <FormikControl
            control="input"
            type="text"
            label="Gloss"
            name="gloss"
          />
          <FormikControl
            control="select"
            label="Baz Tip"
            name="baseType"
            options={[
              { label: "Select...", value: "" },
              { label: "PU", value: "PU" },
              { label: "ACR", value: "ACR" },
              { label: "SZ", value: "SZ" },
              { label: "WB", value: "WB" },
              { label: "PE", value: "PE" },
            ]}
          />
          <FormikControl
            control="select"
            label="Malzeme Grubu"
            name="materialGroup"
            options={[
              { label: "Select...", value: "" },
              { label: "Tiner", value: "tiner" },
              { label: "Katkı", value: "katkı" },
              { label: "Astar", value: "astar" },
              { label: "Son Kat", value: "son kat" },
              { label: "Renklendirici", value: "renk" },
              { label: "Dolgu", value: "dolgu" },
            ]}
          />
          <FormikControl
            control="input"
            type="text"
            label="Net Fiyat TL KDV Dahil"
            name="netPriceTL"
          />
          <FormikControl
            control="input"
            type="text"
            label="Net Fiyat EUR KDV Dahil"
            name="netPriceEUR"
          />
          <FormikControl
            control="input"
            type="text"
            label="Ödeme Şekli"
            name="paymentTerm"
          />
          <FormikControl
            control="textarea"
            type="text"
            label="Not"
            name="desc"
          />

          <button type="submit" className="btn-submit my-8 w-full">
            Kaydet
          </button>
          {editMode && (
            <button
              type="button"
              onClick={handleDelete}
              className="btn-cancel mt-4 mb-4 w-full"
            >
              Kaydı Sil
            </button>
          )}
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default PaintForm
