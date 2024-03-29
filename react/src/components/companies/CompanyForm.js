import React from "react"
import { Formik, Form, FieldArray } from "formik"
import FormikControl from "../formik/FormikControl"
import axios from "axios"
import * as Yup from "yup"

const validationSchema = Yup.object({
  title: Yup.string().required("Gerekli").min(3, "Minimum 3 characters"),
  email: Yup.string().email("Geçersiz email"),
  vatNo: Yup.string()
    .matches(/^\d+$/, "VAT No must be a number")
    .min(10, "Minimum 10 characters")
    .max(10, "Maximum 10 characters"),
  tcNo: Yup.string()
    .matches(/^\d+$/, "Tc No must be a number")
    .min(11, "Minimum 11 characters")
    .max(11, "Maximum 11 characters"),

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

const CompanyForm = ({
  selectedCompany,
  setSelectedCompany,
  companies,
  setCompanies,
}) => {
  return (
    <React.Fragment>
      <div className="w-full max-w-xl p-2 mx-2 border border-yellow-500 my-2">
        <p>[Company From]</p>
        {/* new company */}
        <button
          onClick={() => setSelectedCompany(null)}
          className="btn-small my-2"
        >
          Yeni Firma
        </button>

        <p>{selectedCompany && selectedCompany.title}</p>
        <Formik
          enableReinitialize={true}
          initialValues={
            selectedCompany || {
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
            }
          }
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // Update mode
            if (selectedCompany) {
              const res = await axios.patch(
                `/companies/${selectedCompany._id}`,
                values
              )
              setSubmitting(false)
              // update companies
              const index = companies.findIndex(
                (company) => company._id === selectedCompany._id
              )
              const newCompanies = [...companies]
              newCompanies[index] = res.data.doc
              setCompanies(newCompanies)
              setSelectedCompany(null)
              resetForm()
              return
            }
            // Create mode
            setSubmitting(true)
            const { data } = await axios.post(`/companies`, values)

            setCompanies([...companies, data.doc])
            setSubmitting(false)
            resetForm()
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
              label="Şahıs Tc No"
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

            <button type="submit" className="btn-submit mt-4 mb-8 w-full">
              Kaydet
            </button>
          </Form>
        </Formik>
      </div>
    </React.Fragment>
  )
}

export default CompanyForm
