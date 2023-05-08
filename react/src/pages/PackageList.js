import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function PackageList() {
  const [offer, setOffer] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/offers/${id}`)
      setOffer(data)
    }
    getData()
  }, [id])
  if (offer) {
    return (
      <div className="max-w-4xl mx-auto text-sm lining-nums">
        <h1 className="mx-auto text-center font-semibold text-base">
          Sevkiyat Listesi
        </h1>
        <div className="flex flex-col">
          <Company offer={offer} />
          <List offer={offer} />

          <pre className="border">{/* JSON.stringify(offer, null, 2)*/}</pre>
        </div>
      </div>
    )
  } else {
    return <div>Loading....</div>
  }
}

const Company = ({ offer }) => {
  const fieldData = [
    { title: "Firma", en: "Company", data: offer.customer },
    { title: "Adres", en: "Address", data: offer.adress },
    { title: "Yetkili", en: "Person", data: offer.person },
    { title: "Telefon", en: "Phone", data: offer.phone },
    { title: "Paket Tipi", en: "Package Type", data: offer.packaging },
    { title: "Teslim Yeri", en: "Control", data: offer.salesConditions },
    { title: "Kontrol Eden", en: "Control", data: "" },
    { title: "Sevk Tarihi", en: "Date", data: "" },
  ]
  return (
    <div className="grid grid-cols-8 gap-1">
      {fieldData.map((e, i) => {
        return (
          <React.Fragment key={i}>
            <div className="border font-medium" key="i">
              {e.title}
            </div>
            <div className="border col-span-3">{e.data}</div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

const List = ({ offer }) => {
  const { works } = offer
  return (
    <div className="grid grid-cols-3 gap-1 my-4 break-before-auto border border-green-700 p-2">
      {works.map((w, i) => {
        const fData = [
          { title: "Sipariş", en: "Order", data: w.product ? w.product.name + " " + w.typeOfwork : w.typeOfwork  },
          { title: "Renk", en: "Color", data: w.color },
          { title: "Parlaklık", en: "Gloss", data: w.gloss },
          { title: "Yüz", en: "Side", data: w.side },
          { title: "Toplam Adet", en: "Total Pieces", data: w.totalQuanty },
          { title: "Kod", en: "Code", data: w.code },
        ]
        return (
          <React.Fragment key={i}>
            {fData.map((d, n) => {
              return (
                <React.Fragment key={n}>
                  <div
                    className={`grid gap-1 break-inside-avoid ${
                      n === 0 ? "col-span-3 grid-cols-9" : "grid-cols-3"
                    }`}
                  >
                    <div className={`border font-medium`}>{d.title}</div>
                    <div
                      className={`border ${
                        n === 0 ? "col-span-8" : "col-span-2"
                      }`}
                    >
                      {d.data}
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
            <div className="col-span-3 border border-green-800 mb-6 break-after-auto">
              <Dims dims={w.dimensions} thickness={w.thickness} />
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
const Dims = ({ dims, thickness }) => {
  const renderBox = (quanty) => {
    let result = []
    let qnt =
      quanty <= 100 ? quanty / 2 : quanty = 1
    for (let i = 0; i < qnt; i++) {
      result.push(
        <React.Fragment key={i}>
        <svg
          aria-hidden="true"
          className="w-10 h-10 border"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        </React.Fragment>
      )
    }
    return <>{result}</>
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-1 break-inside-avoid">
        <React.Fragment>
          <div className="border grid grid-cols-11 gap-1 font-medium">
            <div className="border">No</div>
            <div className="border col-span-3">Boy</div>
            <div className="border col-span-3">En</div>
            <div className="border col-span-2">Kalınlık</div>
            <div className="border col-span-2">Adet</div>
          </div>
          <div className="border font-medium">Kontrol</div>
        </React.Fragment>
        {dims.map((d, i) => {
          return (
            <React.Fragment key={i}>
              <div className="border grid grid-cols-11 gap-1">
                <div className="border">{String(i + 1).padStart(2, "0")}</div>
                <div className="border col-span-3">{d.length}</div>
                <div className="border col-span-3">{d.width}</div>
                <div className="border col-span-2">
                  {thickness && thickness}
                </div>
                <div className="border col-span-2">{d.quanty}</div>
              </div>
              <div className="border flex flex-wrap">{renderBox(d.quanty)}</div>
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}

export default PackageList
