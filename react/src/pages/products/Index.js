import React, { useEffect, useState } from "react"
import axios from "axios"

const Index = () => {
  const [products, setProducts] = useState([])
  const [ message, setMessage ] = useState({
    error: false,
    products: false,
    loading: false
  })

  useEffect(() => {
    const getData = async () => {
      try {
        setMessage( { products: false,  error: false, loading: true } )
        const { data } = await axios.get(`/products`)
        setProducts(data)
        setMessage( {error: false, loading: false, products: true } )
      } catch (err) {
        console.log(err)
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
      <div className="max-w-2xl mx-auto text-sm">
        <div className="flex flex-col items-center justify-center border">
          <h1>[ Index - Product ]</h1>
          <div className="grid grid-cols-2 gap-1 mt-4 border border-green-500 w-full">
            {products.map((p, i) => {
              return (
                <div className="p-1">{p.name.toLocaleUpperCase("en-US")}</div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Index
