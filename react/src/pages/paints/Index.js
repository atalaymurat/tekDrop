import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import NavMenu from "../../components/general/NavMenu"

const Index = () => {
  const [paints, setPaints] = useState([])

  useEffect(() => {
    const getData = async () => {
      // navigate() --- location.state sıfırlamak için gerekiyor
      const { data } = await axios.get("/paints")
      setPaints(data)
    }

    getData()
  }, [])

  if (!paints.length) {
    return <div>Loading paints....</div>
  }

  if (paints) {
    return (
      <React.Fragment>
        <div className="max-w-7xl mx-auto flex flex-col justify-center border">
          <NavMenu />
          <Link
            to="/paints/new"
            tabIndex={-1}
            className="focus:outline-none my-2 mx-4"
          >
            <button className="btn-green">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
          <p className="text-xs mx-auto">[paint-index]</p>
          <div className="text-xs">
            {["astar", "dolgu", "son kat", "tiner", "renk"].map((gr, i) => {
              return (
                <div key={i} className="px-4 mx-auto">
                  {paints
                    .filter((p) => p.materialGroup === gr)
                    .sort((a, b) =>
                      a.normalizedName.localeCompare(b.normalizedName)
                    )
                    .map((p, i) => {
                      return (
                        <React.Fragment key={i}>
                          {i === 0 ? (
                            <React.Fragment>
                              <div className="text-xl capitalize font-bold mt-3 px-1 py-2 rounded-tr-xl bg-yellow-500 text-white">
                                {gr}
                              </div>
                              <div className="grid grid-cols-11 font-bold items-center">
                                <div className="col-span-2">Name</div>

                                <div className="grid grid-cols-5 gap-1 col-span-2">
                                  <div className="col-span-2">Marka</div>
                                  <div>Type</div>
                                </div>

                                <div className="grid col-span-4 grid-cols-7 bg-slate-400 px-1">
                                  <div className="col-span-7 grid grid-cols-3">
                                    <div className="flex flex-col border-r px-1">
                                      <div className="text-center">A</div>
                                      <div className="grid grid-cols-2">
                                        <div>code</div>
                                        <div className="text-center">miktar</div>
                                      </div>
                                    </div>
                                    <div className="flex flex-col border-r px-1">
                                      <div className="text-center">B</div>
                                      <div className="grid grid-cols-2">
                                        <div>code</div>
                                        <div className="text-center">miktar</div>
                                      </div>
                                    </div>
                                    <div className="flex flex-col px-1">
                                      <div className="text-center">C</div>
                                      <div className="grid grid-cols-2">
                                        <div>code</div>
                                        <div className="text-center">miktar</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-1 px-1">Miktar</div>

                                <div className="text-xs col-span-2 flex flex-col bg-gray-500 text-white">
                                  <div className="text-center">
                                    Fiyat (KDV dahil)
                                  </div>
                                  <div className="grid grid-cols-3 px-1">
                                    <div>Kg/Tl</div>
                                    <div>TL</div>
                                    <div>EUR</div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          ) : null}
                          <div className="border-b grid grid-cols-11 text-sm items-center">
                            <div className="col-span-2 font-bold text-blue-700">
                              <Link to={`/paints/edit/${p._id}`}>
                                <div>{p.name}</div>
                              </Link>
                            </div>

                            <div className="grid grid-cols-5 gap-1 col-span-2">
                              <div className="col-span-2">{p.brand}</div>
                              <div>{p.baseType}</div>
                            </div>

                            <div className="grid col-span-4 grid-cols-7 bg-slate-300">
                              <div className="col-span-7 grid grid-cols-3">
                                <div className="grid grid-cols-2 px-1">
                                  <div>{p.mainCode}</div>
                                  <div className="text-center">
                                    {p.mainQ?.value}
                                    {p.mainQ?.unit}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 px-1">
                                  <div>{p.compenant01Code}</div>
                                  <div className="text-center">
                                    {p.compenant01Q?.value}
                                    {p.compenant01Q?.unit}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 px-1">
                                  <div>{p.compenant02Code}</div>
                                  <div className="text-center">
                                    {p.compenant02Q?.value}
                                    {p.compenant02Q?.unit}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-1 px-1">
                              {parseFloat(p.totalQ?.value).toFixed(1)}{" "}
                              {p.totalQ?.unit}
                            </div>

                            <div className="grid grid-cols-3 col-span-2 bg-gray-500 text-white px-1 font-semibold">
                              <div>{parseFloat(p.kgPriceTl).toFixed(2)}</div>
                              <div>{p.netPriceTL}</div>
                              <div>{p.netPriceEUR}</div>
                            </div>
                          </div>
                        </React.Fragment>
                      )
                    })}
                </div>
              )
            })}
          </div>
          <pre>{JSON.stringify(paints, null, 2)}</pre>
        </div>
      </React.Fragment>
    )
  }
}

export default Index
