import React, { useState, useEffect } from "react"
import { Formik, Form, FieldArray } from "formik"
import FormikControl from "../formik/FormikControl"
import axios from "axios"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"

const validationSchema = Yup.object({
  title: Yup.string().required("Gerekli").min(3, "min 3 karakter"),
})

const FormulasForm = ({ formula }) => {
  const [editMode, seteditMode] = useState(false)
  const [paints, setPaints] = useState([])
  const [labels, setLabels] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const getPaints = async () => {
      const { data } = await axios.get("/paints")
      setPaints(data)
    }

    const getLabels = () => {
      const enumFields = [
        "consuption.cover",
        "consuption.unit",
        "mat01Qnty.unit",
        "mat02Qnty.unit",
        "mat03Qnty.unit",
      ]

      const labels = {}
      const promiseArray = enumFields.map(async (field) => {
        const { data } = await axios.post(`/formulas/enums`, {
          enumValue: field,
        })
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
    getLabels()
    getPaints()
  }, [])

  useEffect(() => {
    if (formula) seteditMode(true)
  }, [formula])


  const removeEmptyFields = (data) => {
    //remove empty fields
    const cleanedData = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined && value !== "") {
      if (typeof value === "object" && !Array.isArray(value)) {
        const nestedCleanedData = removeEmptyFields(value);
        if (Object.keys(nestedCleanedData).length > 0) {
          cleanedData[key] = nestedCleanedData;
        }
      } else {
        cleanedData[key] = value;
      }
    }
  }
  return cleanedData;

  }


  const formatOps = (paints) => {
  return paints
    .sort((a, b) => {
      // First, sort by brand
      const brandComparison = a.brand.localeCompare(b.brand);

      if (brandComparison === 0) {
        // Brands are the same, sort by name
        return a.name.localeCompare(b.name);
      }

      return brandComparison;
    })
    .map((e) => {
      return {
        value: e._id,
        label: e.brand + " " + e.mainCode + " " + e.name + " " + e.baseType,
      };
    });
};


  const options = formatOps(paints)

  if (!paints || !labels) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Paints Please wait Patiently...
      </div>
    )
  }

  if (paints.length && labels) {
    return (
      <React.Fragment>
        <p className="text-xs mx-auto text-center">Reçete Form</p>
        <pre>{/* JSON.stringify(labels, null, 4) */}</pre>

        <Formik
          enableReinitialize
          initialValues={
            formula || {
              title: "",
              mainBase: "",
              mat01: null,
              mat01Qnty: { value: "", unit: "" },
              mat02: null,
              mat02Qnty: { value: "", unit: "" },
              mat03: null,
              mat03Qnty: { value: "", unit: "" },
              consuption: [
                {
                  cover: "",
                  unit: "",
                  value: "",
                },
              ],
            }
          }
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            if (!editMode) {
              const cleanValues = removeEmptyFields(values)
              alert(JSON.stringify(cleanValues, null, 2))
              await axios.post("/formulas", cleanValues)
              resetForm()
            }
            if (editMode) {
              const cleanValues = removeEmptyFields(values)
              alert(JSON.stringify(cleanValues, null, 2))
              await axios.patch(`/formulas/${formula._id}`, cleanValues)
              navigate("/formulas")
            } else return
          }}
        >
          {({ values }) => (
            <React.Fragment>
              <div className="flex flex-col items-center mx-auto">
                <Form autoComplete="off" autoCapitalize="on">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Başlık"
                    name="title"
                  />
                  <div className="flex flex-col">
                    <FormikControl
                      control="reactSelect"
                      type="text"
                      label="Main Base"
                      options={options}
                      name="mainBase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    <FormikControl
                      control="reactSelect"
                      label="MAT01"
                      options={options}
                      name="mat01"
                    />
                    <div className="grid grid-cols-2 gap-1">
                      <FormikControl
                        control="input"
                        type="text"
                        label="MAT01 Miktar"
                        name="mat01Qnty.value"
                      />
                      <FormikControl
                        control="select"
                        label="birim"
                        name="mat01Qnty.unit"
                        options={labels["mat01Qnty.unit"]}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <FormikControl
                      control="reactSelect"
                      label="MAT02"
                      options={options}
                      name="mat02"
                    />
                    <div className="grid grid-cols-2 gap-1">
                      <FormikControl
                        control="input"
                        type="text"
                        label="MAT02 Miktar"
                        name="mat02Qnty.value"
                      />
                      <FormikControl
                        control="select"
                        label="birim"
                        name="mat02Qnty.unit"
                        options={labels["mat02Qnty.unit"]}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <FormikControl
                      control="reactSelect"
                      label="MAT03"
                      options={options}
                      name="mat03"
                    />
                    <div className="grid grid-cols-2 gap-1">
                      <FormikControl
                        control="input"
                        type="text"
                        label="MAT03 Miktar"
                        name="mat03Qnty.value"
                      />
                      <FormikControl
                        control="select"
                        label="birim"
                        name="mat03Qnty.unit"
                        options={labels["mat03Qnty.unit"]}
                      />
                    </div>
                  </div>
                  <FieldArray name="consuption">
                    {({ remove, push }) => (
                      <React.Fragment>
                        {values.consuption.map((c, i) => {
                          return (
                            <div className="grid grid-cols-4 gap-1" key={i}>
                              <FormikControl
                                control="select"
                                label="Yüzey"
                                name={`consuption.${i}.cover`}
                                options={labels["consuption.cover"]}
                              />
                              <FormikControl
                                control="input"
                                type="text"
                                label="Miktar"
                                name={`consuption.${i}.value`}
                              />
                              <FormikControl
                                control="select"
                                label="Birim"
                                name={`consuption.${i}.unit`}
                                options={labels["consuption.unit"]}
                              />
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  className="btn-purple mt-auto"
                                  onClick={() => remove(i)}
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          )
                        })}
                        <button
                          className="btn-submit my-3 text-xs"
                          type="button"
                          onClick={() =>
                            push({
                              cover: "",
                              unit: "",
                              value: "",
                            })
                          }
                        >
                          add data
                        </button>
                      </React.Fragment>
                    )}
                  </FieldArray>
                  <pre>{JSON.stringify(values, null, 4)}</pre>

                  <button type="submit" className="btn-submit my-2 w-full">
                    Kaydet
                  </button>
                </Form>
              </div>
            </React.Fragment>
          )}
        </Formik>
      </React.Fragment>
    )
  }
}

export default FormulasForm
