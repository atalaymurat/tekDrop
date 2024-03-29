import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { formPrice } from "./../lib/helpers"
import { differenceInDays } from "date-fns"
import OfferChart from "../components/offers/OfferChart"
import NavMenu from "../components/general/NavMenu"

function Home() {
  const [pData, setPData] = useState([])
  const [nData, setNData] = useState([])
  const [bData, setBData] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getData = async () => {
    try {
      setLoading(true)
      const { data: pData } = await axios.post("/search", { search: "SZ" })
      const { data: nData } = await axios.post("/search", { search: "TK" })
      const { data: bData } = await axios.post("/search", { search: "SV" })
      setPData(pData)
      setNData(nData)
      setBData(bData)
      setError(false)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setPData(null)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-500  bg-forest bg-cover py-4">
        <div className="my-2 border p-4 bg-slate-900">
          <h1 className="text-5xl text-center font-extrabold text-white">
            <span className="text-xs mx-4 font-light">[home]</span>
            Drop Ahşap
          </h1>
        </div>
        <div className="flex flex-col w-full items-center justify-center mt-10">
          <div>Loading...</div>
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-500  bg-forest bg-cover py-4">
        <div className="my-2 border p-4 bg-slate-900">
          <h1 className="text-5xl text-center font-extrabold text-white">
            <span className="text-xs mx-4 font-light">[home]</span>
            Drop Ahşap
          </h1>
        </div>
        <div className="flex flex-col w-full items-center justify-center mt-10">
          <div>{JSON.stringify(error)}</div>
        </div>
      </div>
    )
  }

  if (!error && !loading) {
    return (
      <div className="min-h-screen w-full bg-gray-500  bg-forest bg-cover py-4">
        <div className="my-2 border p-4 bg-slate-900">
          <h1 className="text-5xl text-center font-extrabold text-white">
            <span className="text-xs mx-4 font-light">[home]</span>
            Drop Ahşap
          </h1>
        </div>
        <NavMenu />
        <div className="border border-amber-400 h-[300px] mx-auto p-4">
          <div className="flex flex-col h-full">
            <div className="md:text-8xl opacity-90 font-black m-auto text-transparent tracking-widest flex bg-clip-text bg-gradient-to-r from-yellow-400 via-gray-900 to-black">
              DROPtech
            </div>
          </div>
        </div>
        <div>
          < OfferChart />
        </div>
        <div className="grid md:grid-cols-3 gap-2 border border-amber-400 mt-4 text-sm font-medium justify-center">
          {nData.length ? <WorkList data={nData} title="Teklif" /> : null}
          {pData.length ? <WorkList data={pData} title="Sözleşme" /> : null}
          {bData.length ? <WorkList data={bData} title="Sevk" /> : null}
        </div>
      </div>
    )
  }
}

const WorkList = ({ data, title }) => {
  return (
    <React.Fragment>
      <div className="p-2">
        <div className="w-full max-w-md p-2 bg-gray-200 bg-opacity-70 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              {title}
            </h5>
            <a
              href="/offer"
              className="text-sm font-medium text-amber-600 hover:underline dark:text-amber-500"
            >
              Liste
            </a>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {data
                .sort((a, b) => a.createdAt < b.createdAt)
                .slice(0, 20)
                .map((of, i) => (
                  <React.Fragment key={i}>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="font-medium" />
                          {of.startDate &&
                            differenceInDays(
                              of.finishDate
                                ? new Date(of.finishDate)
                                : new Date(),
                              new Date(of.startDate)
                            ) +
                              " " +
                              "gün"}
                        </div>
                        <Link to={`/offer/${of._id}`} >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {of.company.title}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-400">
                            {of.deliveryDate ? of.deliveryDate : null}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {of.offerNetTotalPrice && of.offerNetTotalPrice.TL
                            ? formPrice(of.offerNetTotalPrice.TL, "TRY")
                            : null}
                        </div>
                        <div className="text-xs font-bold">
                          {of.createdAt}
                        </div>
                        </Link>
                      </div>
                    </li>
                  </React.Fragment>
                ))}
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4 font-normal">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate dark:text-white">
                      Toplam
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400"></p>
                  </div>
                  <div className="inline-flex items-center text-base text-gray-900 dark:text-white">
                    {toplamFiyat(data)}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const toplamFiyat = (data) => {
  let fiyatArray = []
  data.forEach((e) => {
    fiyatArray.push(e.offerNetTotalPrice.TL)
    return
  })
  let sonuc = fiyatArray.reduce((sum, item) => sum + item)
  return formPrice(sonuc, "TRY")
}

export default Home
