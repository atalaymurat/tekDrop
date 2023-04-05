import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, FieldArray } from "formik"
import FormikControl from "./formik/FormikControl"
import axios from "axios"

const OfferForm = ({ offer, ...props }) => {
  const [editMode, seteditMode] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (offer) seteditMode(true)
    console.log("EDIT MODE SETTED")
  }, [offer])

  const handleDelete = async () => {
    if (window.confirm("Silme Islemini Onayliyormusun")) {
      const res = await axios.delete(
        `http://localhost:3001/offers/${offer._id}`
      )
      console.log("Doc DESTROYED", res)
      navigate("/offer")
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={
        offer || {
          customer: "",
          discount: 0,
          works: [
            {
              typeOfwork: "Lake Duz Panel",
              gloss: "Mat",
              color: "RAL",
              thickness: 18,
              unit: "m2",
              code: "",
              kdv: 18,
              price: { val: 0, cur: "TL" },
              dimensions: [
                {
                  length: 0,
                  width: 0,
                  quanty: 0,
                  desc: "",
                },
              ],
            },
          ],
        }
      }
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (!editMode) {
          const res = await axios.post("http://localhost:3001/offers/", values)
          console.log("response from post values :: ", res)
          setSubmitting(false)
          resetForm()
          navigate(`/offer/${res.data.ofr._id}`)
        }
        if (editMode) {
          alert(JSON.stringify("YOU ARE IN EDIT MODE"))
          const res = await axios.patch(
            `http://localhost:3001/offers/${offer._id}`,
            values
          )
          console.log("response from post values :: ", res)
          setSubmitting(false)
          navigate("/offer")
        } else return
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form autoComplete="off">
            <div className="flex flex-col max-w-5xl  mx-auto">
              <div className="bg-blue-200 px-4 py-8 rounded-lg w-full flex flex-col">
                <FormikControl
                  control="input"
                  type="text"
                  name="customer"
                  label="Musteri"
                  autoFocus
                />
                <div className="bg-blue-200 grid grid-cols-4 gap-1">
                  <FormikControl
                    control="input"
                    type="number"
                    name="discount"
                    label="Indirim"
                  />
                  <FormikControl
                    control="input"
                    type="number"
                    name="kdv"
                    label="kdv"
                  />
                </div>
              </div>

              {values.works.map((w, i) => (
                <FieldArray name="works" key={"ww-" + i}>
                  {({ insert, remove, push }) => (
                    <>
                      <div
                        className={`${
                          i % 2 === 0 ? "bg-green-200" : "bg-red-200"
                        } px-4 py-8 rounded-lg w-full my-4`}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <FormikControl
                            control="input"
                            type="text"
                            name={`works.${i}.typeOfwork`}
                            label="Is Tipi"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <FormikControl
                              control="input"
                              type="text"
                              name={`works.${i}.gloss`}
                              label="Gloss"
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
                                control="input"
                                type="text"
                                name={`works.${i}.unit`}
                                label="Birim"
                              />
                            </div>
                          </div>
                        </div>
                        <Dimensions works={w} name={`works.${i}.dimensions`} />
                        <div className="grid grid-cols-4 gap-1">
                          <FormikControl
                            control="input"
                            type="number"
                            name={`works.${i}.price.val`}
                            label="Fiyat"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            name={`works.${i}.price.cur`}
                            label="Para Birimi"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            name={`works.${i}.code`}
                            label="Kod"
                          />
                        </div>
                      </div>
                      {values.works.length - i === 1 ? (
                        <div className="grid grid-cols-2">
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                typeOfwork: "",
                                color: "",
                                gloss: "",
                                thickness: 0,
                                unit: "",
                                code: "",
                                price: { val: 0, cur: "TL" },
                                dimensions: [
                                  {
                                    length: 0,
                                    width: 0,
                                    quanty: 0,
                                    desc: "",
                                  },
                                ],
                              })
                            }
                          >
                            Yeni Is Tipi Ekle
                          </button>
                          {values.works.length > 1 && (
                            <button
                              type="button"
                              className="btn-cancel"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Silme Islemini Onayliyormusun"
                                  )
                                )
                                  remove(i)
                              }}
                            >
                              X
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn-cancel"
                          onClick={() => {
                            if (window.confirm("Silme Islemini Onayliyormusun"))
                              remove(i)
                          }}
                        >
                          X
                        </button>
                      )}
                    </>
                  )}
                </FieldArray>
              ))}

              <button type="submit" className="btn-submit mt-2 mb-2">
                Kaydet
              </button>
              {offer && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn-cancel mt-2 mb-2"
                >
                  Sil
                </button>
              )}
              <div className="w-100 bg-slate-400 h-100 p-8 my-4 ">
                <p>{JSON.stringify(values, 4, null)}</p>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

const Dimensions = ({ works, name }) => {
  return (
    <div>
      <FieldArray name={name}>
        {({ insert, remove, push }) => (
          <div>
            {works.dimensions.length > 0 &&
              works.dimensions.map((dim, i) => (
                <div className="grid grid-cols-2 gap-2 py-2" key={"dim-" + i}>
                  <div className="grid grid-cols-2 gap-2">
                    <FormikControl
                      control="input"
                      type="number"
                      name={`${name}.${i}.length`}
                      label="Boy"
                    />
                    <FormikControl
                      control="input"
                      type="number"
                      name={`${name}.${i}.width`}
                      label="En"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <FormikControl
                      control="input"
                      type="number"
                      name={`${name}.${i}.quanty`}
                      label="Adet"
                    />
                    <div className="col-span-2">
                      <FormikControl
                        control="input"
                        type="text"
                        name={`${name}.${i}.desc`}
                        label="Aciklama"
                      />
                    </div>
                    <div className="flex flex-row justify-center items-center">
                      {works.dimensions.length - i !== 1 ? (
                        <button
                          type="button"
                          tabIndex="-1"
                          onClick={() => {
                            if (window.confirm("Silme Islemini Onayliyormusun"))
                              remove(i)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="red"
                            className="w-8 h-8 ring-0"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      ) : (
                        <div className="grid grid-cols-2 items-center justify-center">
                          <button type="button" onClick={() => push()}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="green"
                              className="w-8 h-8 focus:ring-0"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          {works.dimensions.length > 1 && (
                            <button
                              type="button"
                              tabIndex="-1"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Silme Islemini Onayliyormusun"
                                  )
                                )
                                  remove(i)
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="red"
                                className="w-8 h-8 ring-0"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </FieldArray>
    </div>
  )
}

export default OfferForm
