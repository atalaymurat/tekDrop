import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, FieldArray } from "formik"
import FormikControl from "./formik/FormikControl"
import axios from "axios"

const OfferForm = ({ offer, formHead, setFormHead, ...props }) => {
  const [editMode, seteditMode] = useState(false)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (offer) seteditMode(true)
  }, [offer])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/products")
      setProducts(data)
    }
    getData()
  }, [])

  const setProductOptions = (data) => {
    const prdOps = data.map((d) => {
      return { label: d.name.toLocaleUpperCase("en-US"), value: d._id }
    })
    return prdOps
  }

  const teklifTipleri = [
    { label: "Sipariş", value: "SP" },
    { label: "Teklif", value: "TK" },
    { label: "Pr0forma", value: "PF" },
    { label: "Sözleşme", value: "SZ" },
  ]
  const glossTipleri = [
    { label: "Mat 5", value: "mat 5" },
    { label: "Mat 15", value: "mat 15" },
    { label: "Mat 25", value: "mat 25" },
    { label: "Mat 35", value: "mat 35" },
    { label: "Parlak 100", value: "parlak 100" },
  ]
  const curTypes = [
    { label: "TL", value: "TL" },
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
  ]
  const sideTypes = [
    { label: "Tek Yüz", value: "TY" },
    { label: "Çift Yüz", value: "CY" },
    { label: "Tek Yüz Arka Astar", value: "TYA" },
  ]
  const unitTypes = [
    { label: "m2", value: "m2" },
    { label: "m/tül", value: "m" },
    { label: "adet", value: "adet" },
    { label: "takım", value: "takım" },
  ]

  const handleDelete = async () => {
    if (window.confirm("Silme Islemini Onayliyormusun")) {
      await axios.delete(`/offers/${offer._id}`)
      navigate("/offer")
    }
  }
  const reformData = (data) => {
    // const filterdWorks = data.works.filter((d) => d.typeOfwork !== "")
    // data.works = filterdWorks
    data.discount = Number(data.discount) || 0
    data.kdv = Number(data.kdv) || 0
    data.customer = data.customer || ""

    data.works.map((w, i) => {
      if (w.product) {
        data.works[i].product = w.product.value || w.product._id
      }
      

      data.works[i].thickness = Number(data.works[i].thickness) || 0
      data.works[i].price.val = Number(data.works[i].price.val) || 0
      data.works[i].code = data.works[i].code || ""
      w.dimensions.map((d, n) => {
        data.works[i].dimensions[n].length =
          Number(data.works[i].dimensions[n].length) || 0
        data.works[i].dimensions[n].width =
          Number(data.works[i].dimensions[n].width) || 0
        data.works[i].dimensions[n].quanty =
          Number(data.works[i].dimensions[n].quanty) || 0
        return d
      })

      const filterdDims = w.dimensions.filter((d) => d != null)

      data.works[i].dimensions = filterdDims
      console.log("REFORMED DATA", data)
      return data
    })
  }

  return (
    <Formik
      enableReinitialize
      initialValues={
        offer || {
          customer: "",
          offerType: "SP",
          person: "",
          phone: "",
          email: "",
          adress: "",
          discount: 0,
          showTerms: false,
          kdv: 18,
          salesConditions: "",
          paymentTerms: "",
          deliveryDate: "",
          packaging: "",
          warranty: "",
          infos: "",
          works: [
            {
              typeOfwork: "",
              product: {},
              side: "TY",
              gloss: "mat 25",
              color: "RAL",
              thickness: 18,
              unit: "m2",
              dimensions: [
                {
                  length: "",
                  width: "",
                  quanty: "",
                  desc: "",
                },
              ],
              price: { val: "", cur: "TL" },
              noList: false,
              machineData: false,
            },
          ],
        }
      }
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (!editMode) {
          reformData(values)
          const res = await axios.post("/offers/", values)
          setSubmitting(false)
          resetForm()
          navigate(`/offer/${res.data.ofr._id}`)
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
                <FormikControl
                  control="select"
                  type="text"
                  name="offerType"
                  options={teklifTipleri}
                  label="Teklif Tipi"
                  onClick={() => setFormHead(values.offerType)}
                />
                <div className="bg-blue-200 grid grid-cols-4 gap-1">
                  <FormikControl
                    control="input"
                    type="text"
                    name="person"
                    label="Yetkili"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    name="phone"
                    label="Telefon"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    name="email"
                    label="Email"
                  />
                </div>
                <FormikControl
                  control="input"
                  type="text"
                  name="adress"
                  label="Adres"
                />
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

              {values.works.map((w, i) => (
                <FieldArray name="works" key={"ww-" + i}>
                  {({ insert, remove, push }) => (
                    <>
                      <div
                        className={`${
                          i % 2 === 0 ? "bg-green-200" : "bg-red-200"
                        } px-4 py-8 rounded-lg w-full my-4`}
                      >
                        <div className="grid grid-cols-3 gap-2 col-span-3">
                          <FormikControl
                            control="input"
                            type="text"
                            name={`works.${i}.typeOfwork`}
                            label="Is Tipi"
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
                              options={unitTypes}
                              type="text"
                              name={`works.${i}.unit`}
                              label="Birim"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <FormikControl
                            control="reactSelect"
                            options={setProductOptions(products)}
                            type="text"
                            name={`works.${i}.product`}
                            label="Model"
                          />
                          <FormikControl
                            control="select"
                            options={glossTipleri}
                            type="text"
                            name={`works.${i}.gloss`}
                            label="Gloss"
                          />
                          <FormikControl
                            control="select"
                            options={sideTypes}
                            type="text"
                            name={`works.${i}.side`}
                            label="Yüz"
                          />
                        </div>
                        <Dimensions works={w} name={`works.${i}.dimensions`} />
                        <div className="grid grid-cols-4 gap-1">
                          <FormikControl
                            control="input"
                            type="text"
                            name={`works.${i}.price.val`}
                            label="Fiyat"
                          />
                          <FormikControl
                            control="select"
                            options={curTypes}
                            type="text"
                            name={`works.${i}.price.cur`}
                            label="Para Birimi"
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
                                product: {},
                                side: "TY",
                                gloss: "mat 15",
                                color: "",
                                thickness: "",
                                unit: "m2",
                                dimensions: [
                                  {
                                    length: "",
                                    width: "",
                                    quanty: "",
                                    desc: "",
                                  },
                                ],
                                noList: false,
                                machineData: false,
                                price: { val: "", cur: "TL" },
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
              {/* SATIS KONDİSYONLARI BLOK   */}
              <div className="bg-red-200 px-4 py-8 mt-2 rounded-lg w-full flex flex-col">
                <FormikControl
                  control="input"
                  type="text"
                  name="salesConditions"
                  label="Teslim Yeri"
                />
                <FormikControl
                  control="textarea"
                  type="text"
                  name="paymentTerms"
                  label="Ödeme Şekli"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="deliveryDate"
                  label="Teslim Süresi"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="packaging"
                  label="Paketleme"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="warranty"
                  label="Garanti Şartları"
                />
                <FormikControl
                  control="textarea"
                  type="text"
                  name="infos"
                  label="Bilgi"
                />
                <div className="mt-2 flex h-10">
                  <FormikControl
                    control="checkbox"
                    name={"showTerms"}
                    label="Sözleşme Şartlarını Göster"
                  />
                </div>
              </div>
              {/* SATIS KONDİSYONLARI BLOK   */}

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
                <pre>{JSON.stringify(values, null, 4)}</pre>
                <pre>{JSON.stringify(products, null, 4)}</pre>
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
                      type="text"
                      name={`${name}.${i}.length`}
                      label="Boy"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      name={`${name}.${i}.width`}
                      label="En"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <FormikControl
                      control="input"
                      type="text"
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
