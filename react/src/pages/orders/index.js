import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import NavMenu from "../../components/general/NavMenu"

const OrderIndex = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/orders")
      setOrders(data)
      return
    }
    getData()
  }, [])

  if (orders.length > 0) {
    return (
      <div className="max-w-4xl grid grid-cols-1 mx-auto ">
        <h1 className="text-xs mb-5 mx-auto">index#Order</h1>
        <NavMenu />
        <Link to="/order/new">
          <button className="btn-purple my-4 px-1 py-2">Yeni Sipariş</button>
        </Link>
        <div className="my-2">
          {orders.map((order, index) => {
            return (
              <div className="grid grid-cols-2 gap-1 items-center border">
                <div className="flex gap-4">
                  <Link to={`/order/${order._id}`}>
                    <div className="text-sm">{order.recordNo}</div>
                  </Link>
                  <div>{order.company?.title}</div>
                </div>
                <div className="flex flex-row gap-2 ml-auto">
                  <div>
                    <Link to={`/order/edit/${order._id}`}>
                      <button
                        type="button"
                        className="btn-small p-1 my-1"
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link to={`/order/edit/${order._id}`}>
                      <button type="button" className="btn-small p-1 my-1">
                        Del
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <pre>{JSON.stringify(orders, null, 2)}</pre>
      </div>
    )
  } else {
    return (
      <div className="max-w-2xl grid grid-cols-1 mx-auto justify-items-center ">
        <h1 className="text-xs mb-5 mx-auto">index#Order</h1>
        <Link to="/order/new">
          <button className="btn-purple">Yeni Sipariş</button>
        </Link>
      </div>
    )
  }
}

export default OrderIndex
