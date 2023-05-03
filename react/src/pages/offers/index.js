import axios from "axios"
import React, { useEffect, useState } from "react"
import { localeDate } from "../../lib/helpers"
import { Link } from "react-router-dom"

function Index() {
  const [offers, setOffers] = useState([])
  const getData = async () => {
    const { data } = await axios.get("http://localhost:3001/offers")
    setOffers(data.reverse())
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="w-100 max-w-4xl mx-auto flex flex-col">
      <div className="font-bold text-4xl text-center my-2 grid grid-cols-1">
        Siparisler Index
      </div>
      <div>
        <Link to="/offer/new">
          <button className="btn-submit">Yeni Is Emri</button>
        </Link>
        <Link to="/">
          <button className="btn-submit">Giris</button>
        </Link>
      </div>
      <div className="my-4">
        {offers &&
          offers.map((of, i) => (
            <div key={`of-${i}`} className="bg-slate-100 grid grid-cols-12">
              <div className="px-2 py-2 border">{i+1}</div>
              <div className="px-2 py-2 border col-span-2">{localeDate(of.createdAt)}</div>
              <div className="px-2 py-2 border col-span-5">{of.customer}</div>
              <div className="flex py-2 border justify-center col-span-4">
                <Link to={`/offer/${of._id}`} className="mx-auto">
                  <button className="btn-submit">İncele</button>
                </Link>
                <Link to={`/offer/edit/${of._id}`} className="mx-auto">
                  <button className="btn-purple">Güncelle</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <pre className="bg-slate-200">{JSON.stringify(offers, null, " ")}</pre>
    </div>
  )
}

export default Index
