import React from "react"
import { Formik, Form, FieldArray } from "formik"
import FormikControl from "../formik/FormikControl"
import axios from "axios"
import * as Yup from "yup"

const checkUniqueEmail = async (email) => {
  const { data } = await axios.post("offers/email", { email: email })
  const unique = data.isUnique
  console.log("EMAİL UNİQUE", unique)
  return unique
}

const validationSchema = Yup.object({
  title: Yup.string().required("Gerekli").min(3, "Minimum 3 characters"),
  email: Yup.string()
    .email("Geçersiz email")
    .test(
      "unique",
      "Email kayıtlı firmalarda var kontrol ediniz",
      function (value) {
        const { create, email } = this.parent

        if (create && !email) {
          // If it's a create operation and email field is not touched, skip uniqueness check
          return true
        }

        if (!value) {
          return true
        }
        const isValidEmailFormat = Yup.string().email().isValidSync(value)
        if (!isValidEmailFormat) {
          return false
        }

        return checkUniqueEmail(value)
      }
    ),
  vatNo: Yup.string()
    .matches(/^\d+$/, "VAT No must be a number")
    .min(10, "Minimum 10 characters"),
  tcNo: Yup.string()
    .matches(/^\d+$/, "Tc No must be a number")
    .min(11, "Minimum 11 characters"),

  addresses: Yup.array().of(
    Yup.object().shape({
      city: Yup.string().required("Gerekli"),
      country: Yup.string().required("Gerekli"),
      zip: Yup.string()
        .matches(/^\d+$/, "PK rakamlardan oluşmalıdır")
        .min(5, "en az 5 karakter olmalıdır"),
    })
  ),
})

const NewCompanyForm = ({ setNewCompany }) => {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <React.Fragment>
      <button
        className="block mx-auto btn-small my-4"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Yeni Firma Oluştur
      </button>

      {showModal ? (
        <>
          <div className="bg-yellow-400 absolute  px-4 py-2 rounded-lg z-50 flex flex-col max-w-2xl  mx-auto">
            <Formik
              initialValues={{
                title: "",
                vatTitle: "",
                phone: "",
                email: "",
                vd: "",
                vatNo: "",
                tcNo: "",
                addresses: [
                  {
                    title: "",
                    line1: "",
                    line2: "",
                    district: "",
                    city: "",
                    country: "",
                    zip: "",
                  },
                ],
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // Create mode
                setSubmitting(true)
                const { data } = await axios.post(`/companies`, values)
                setNewCompany(true)
                setSubmitting(false)
                resetForm()
                setShowModal(false)
              }}
            >
              <Form autoComplete="off">
                <FormikControl
                  control="input"
                  type="text"
                  label="Kısa Ünvan"
                  name="title"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Tam Ünvan"
                  name="vatTitle"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Telefon"
                  name="phone"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Email"
                  name="email"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Vergi Dairesi"
                  name="vd"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Vergi No"
                  name="vatNo"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Tc No"
                  name="tcNo"
                />
                <FieldArray name="addresses">
                  {({ push, remove, form }) => {
                    const { values } = form
                    const { addresses } = values
                    return (
                      <div className="my-2 border px-2 py-4">
                        {addresses.map((address, index) => (
                          <div key={index}>
                            <FormikControl
                              control="input"
                              type="text"
                              label="Addres Başlık"
                              name={`addresses.${index}.title`}
                            />
                            <FormikControl
                              control="input"
                              type="text"
                              label="Sokak Mahalle"
                              name={`addresses.${index}.line1`}
                            />
                            <FormikControl
                              control="input"
                              type="text"
                              label="İlave Adres"
                              name={`addresses.${index}.line2`}
                            />
                            <FormikControl
                              control="input"
                              type="text"
                              label="İlçe"
                              name={`addresses.${index}.district`}
                            />
                            <FormikControl
                              control="input"
                              type="text"
                              label="Şehir"
                              name={`addresses.${index}.city`}
                            />
                            <FormikControl
                              control="input"
                              type="text"
                              label="Ülke"
                              name={`addresses.${index}.country`}
                            />
                            <FormikControl
                              control="input"
                              type="text"
                              label="Posta Kodu"
                              name={`addresses.${index}.zip`}
                            />
                            <button
                              type="button"
                              className="btn-purple my-2 w-full"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn-submit my-1 w-full"
                          onClick={() =>
                            push({
                              title: "",
                              line1: "",
                              line2: "",
                              district: "",
                              city: "",
                              country: "",
                              zip: "",
                            })
                          }
                        >
                          Add Address
                        </button>
                      </div>
                    )
                  }}
                </FieldArray>

                <button type="submit" className="btn-submit mt-4 mb-3 w-full">
                  Kaydet
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="submit"
                  className="btn-submit mb-8 w-full"
                >
                  Kapat
                </button>
              </Form>
            </Formik>
          </div>
          <div
            className="opacity-50 fixed inset-0 z-40 bg-black"
            onClick={() => setShowModal(false)}
          ></div>
        </>
      ) : null}
    </React.Fragment>
  )
}

export default NewCompanyForm
