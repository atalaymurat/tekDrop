import React, { useEffect, useState } from "react"
import OrderForm from "../../components/orders/OrderForm"
import { useParams } from "react-router-dom"
import axios from "axios"


function Edit() {
  const [order, setOrder] = useState(null)
  let { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/orders/edit/${id}`)
      setOrder(data)
    }
    getData()
  }, [id])

  return (
    <div>
      <div className="font-bold text-4xl text-center my-2">Edit#Show</div>
      <OrderForm order={order} />
    </div>
  )
}

export default Edit
