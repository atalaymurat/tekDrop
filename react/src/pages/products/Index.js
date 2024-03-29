import React, { useEffect, useState } from "react"
import axios from "axios"
import ProductForm from "../../components/products/ProductForm"
import NavMenu from "../../components/general/NavMenu"
import { Link } from "react-router-dom"

const Index = () => {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState({
    error: false,
    products: false,
    loading: false,
  })

  useEffect(() => {
    const getData = async () => {
      try {
        setMessage({ products: false, error: false, loading: true })
        const { data } = await axios.get(`/products`)
        setProducts(data)
        setMessage({ error: false, loading: false, products: true })
      } catch (err) {
        setMessage({ products: false, error: true, loading: false })
      }
    }
    getData()
  }, [])

  if (message.loading) {
    return (
      <div className="h-screen flex items-center justify-center w-full text-2xl font-bold animate-pulse">
        Loading...
      </div>
    )
  }
  if (message.error) {
    return (
      <div className="h-screen flex items-center justify-center w-full text-2xl font-bold animate-pulse text-red-700">
        Not Found ... Error !
      </div>
    )
  }
  if (message.products) {
    return (
      <React.Fragment>
        <div className="max-w-4xl mx-auto text-sm">
          <NavMenu />
          <div className="flex flex-col items-center justify-center border">
            <h1>[ Index - Product ]</h1>
            <div className="grid gap-1 mt-4 border border-green-500 w-full">
              {products.map((p, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="grid grid-cols-2 border text-sm px-1">
                      <div className="grid grid-cols-6 gap-2">
                        <div className="font-semibold my-auto">
                          <Link to={`/product/edit/${p._id}`}>{p.code}</Link>
                        </div>
                        <div className="text-sm col-span-3 flex flex-col">
                          <div className="font-medium">
                            {p.name?.toLocaleUpperCase("en-US")}
                          </div>

                          <div>{p.desc}</div>
                        </div>
                        <div>{p.productionStyle}</div>
                        <div className="flex flex-col">
                          <div>{p.productType}</div>
                          <div>{p.surfaceMaterial}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4">
                        <div className="flex flex-col">
                          <div>{p.finish}</div>
                          <div>{p.surfaceShape} </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="mx-auto">{p.finishGloss}</div>
                          <div className="mx-auto">{p.finishSide}</div>
                        </div>
                        <div className="mx-auto">{p.unit}</div>
                        <div className="p-1 flex flex-col ml-auto">
                          <div>
                            {p.listPrice?.val} {p.listPrice?.cur}
                          </div>
                          <div>
                            {p.netPrice?.val} {p.netPrice?.cur}
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
          <Link to="/product/new" tabIndex={-1} className="focus:outline-none">
            <button className="btn-green my-4">
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

        <pre className="max-w-lg mx-auto bg-amber-300 my-4">
          {/* JSON.stringify(products, null, 4) */}
        </pre>
      </React.Fragment>
    )
  }
}

export default Index
