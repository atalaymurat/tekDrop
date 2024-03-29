
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import ProductForm from "../../components/products/ProductForm"

function Edit() {
  const [product, setProduct] = useState(null)
  let { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/products/edit/${id}`)
      setProduct(data)
    }
    getData()
  }, [id])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="font-bold text-4xl text-center my-2">Edit#Product</div>
      <ProductForm product={product} />

      <pre>{JSON.stringify(product, null, 4)}</pre>
    </div>
  )
}

export default Edit
