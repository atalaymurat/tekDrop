import React, { useState, useEffect } from "react"
import NavMenu from "../../components/general/NavMenu"
import axios from "axios"
import { Link } from "react-router-dom"

const Index = () => {
  const [formulas, setFormulas] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/formulas")
      setFormulas(data)
    }
    getData()
  }, [])

  if (!formulas.length) {
    return (
      <div>
        <Link
          to="/formulas/new"
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
      </div>
    )
  }
  if (formulas) {
    return (
      <div className="max-w-4xl text-sm mx-auto flex flex-col border">
        <NavMenu />

        <Link
          to="/formulas/new"
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
        <p className="text-xs mx-auto">[Formula#Index]</p>
        {formulas.map((f, i) => {
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col border-2 border-teal-700 mb-3">
                <div
                  className={`border w-full flex items-center p-1 font-medium`}
                >
                  {f.title}
                  <div className="ml-auto">
                    <Link to={`/formulas/edit/${f._id}`}>
                      <button className="btn-purple">Edit</button>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-10 border border-red-400 my-2">
                    <div className="font-semibold">Ana Malzeme:</div>
                    <div className={`border`}>{f.mainBase?.mainCode}</div>
                    <div className={`border`}>{f.mainBase?.brand}</div>
                    <div className={`border`}>{f.mainBase?.name}</div>

                    <div className={`border`}>
                      {f.mainBase?.mainQ.value}
                      {f.mainBase?.mainQ.unit}
                    </div>
                    <div className="flex flex-col col-span-3 bg-amber-300">
                      <div className="grid grid-cols-3">
                        <div className="font-semibold border">A</div>
                        <div className={`border`}>
                          {f.mainBase?.compenant01Code}
                        </div>

                        <div className={`border`}>
                          {f.mainBase?.compenant01Q.value}
                          {f.mainBase?.compenant01Q.unit}
                        </div>
                      </div>
                      <div className="grid grid-cols-3">
                        <div className="font-semibold border">B</div>
                        <div className={`border`}>
                          {f.mainBase?.compenant02Code}
                        </div>

                        <div className={`border`}>
                          {f.mainBase?.compenant02Q?.value}
                          {f.mainBase?.compenant02Q?.unit}
                        </div>
                      </div>
                    </div>
                  </div>
                  {[1, 2, 3].map((e, i) => {
                    const matMap = {
                      1: f.mat01,
                      2: f.mat02,
                      3: f.mat03,
                    }
                    const quantityMap = {
                      1: { value: f.mat01Qnty?.value, unit: f.mat01Qnty?.unit },
                      2: { value: f.mat02Qnty?.value, unit: f.mat02Qnty?.unit },
                      3: { value: f.mat03Qnty?.value, unit: f.mat03Qnty?.unit },
                    }
                    if (matMap[e]) {
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-10 border border-yellow-400 my-2"
                        >
                          <div className="font-semibold border">İlave {e}:</div>
                          <div className={`border`}>{matMap[e]?.mainCode}</div>
                          <div className={`border`}>{matMap[e]?.brand}</div>
                          <div className={`border`}>{matMap[e]?.name}</div>
                          <div className={`border`}>
                            {quantityMap[e]?.value}
                            {quantityMap[e]?.unit}
                          </div>
                          <div className="flex flex-col col-span-3 bg-purple-300">
                            <div className="grid grid-cols-3">
                              <div className="font-semibold border">A</div>
                              <div className={`border`}>
                                {matMap[e]?.compenant01Code}
                              </div>
                              <div className={`border`}>
                                {e === 1
                                  ? matMap[e]?.mainQ?.value +
                                    matMap[e]?.mainQ?.unit
                                  : null}
                              </div>
                            </div>
                            <div className="grid grid-cols-3">
                              <div className="font-semibold border">B</div>
                              <div className={`border`}>
                                {matMap[e]?.compenant02Code}
                              </div>
                            </div>
                          </div>
                          <div>{`${matMap[e]?.kgPriceTl}`}</div>
                        </div>
                      )
                    }
                  })}
                </div>
                <div className="flex flex-col">
                  {f.consuption.map((c, i) => {
                    return (
                      <React.Fragment>
                        <div className="grid grid-cols-3 mx-2 my-1">
                          <div className="grid grid-cols-4 border-y">
                            <div className="col-span-2">{c.cover}</div>
                            <div>{c.value}</div>
                            <div>{c.unit}</div>
                          </div>
                          <div className="grid grid-cols-4 border-y">
                            <div> --- </div>
                            <div> --- </div>
                            <div>{c.unitCostNetTl}</div>
                            <div className="bg-red-500 font-bold text-center text-white">
                              {c.unitCostTl}
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>
            </React.Fragment>
          )
        })}
        <pre>{JSON.stringify(formulas.slice(-1)[0], null, 2)}</pre>
      </div>
    )
  }
}

export default Index
