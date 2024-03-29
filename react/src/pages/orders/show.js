import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { localeDate, sideText, glossText } from "../../lib/helpers"

const OrderShow = () => {
  const [order, setOrder] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/orders/${id}`)
      setOrder(data)
    }
    getData()
  }, [id])

  if (order) {
    return (
      <>
        <div className="max-w-5xl mx-auto">
          <h1 className="mx-auto text-center font-semibold text-lg my-4">
            Sipariş Onayı
          </h1>
          <div className="grid grid-cols-5">
            <div className="px-1">
              <img
                src={process.env.PUBLIC_URL + "/dropLogo.jpeg"}
                alt="logo"
                className="object-cover h-[130px]"
              />
            </div>
            <div className="col-span-3 font-medium text-lg text-center border rounded-md h-min px-2 py-3">
              {order.company?.title}
            </div>
            <div className="ml-auto px-1 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              <div className="font-light">{localeDate(order.createdAt)}</div>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="lg:basis-5/6">
              {order.subOrders.map((subOrder, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-4 border border-black mt-2 mb-6 rounded-t-xl"
                  >
                    <div className="col-span-4 grid grid-cols-8 gap-2 py-4 px-2">
                      <div className="text-base font-medium">
                        {subOrder.recordNo}
                      </div>
                      <div className="text-lg font-medium col-span-3 uppercase flex flex-col">
                        <div>{subOrder.product?.name}</div>
                        <div className="font-normal text-gray-600">
                          {subOrder.product?.code}
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col">
                        <div className="text-xl font-semibold">
                          {subOrder.color} {glossText(subOrder.gloss)}
                        </div>
                        <div>{sideText(subOrder.side)}</div>
                      </div>
                      <div className="grid grid-cols-3 col-span-2">
                        <div className="text-3xl font-semibold">
                          {subOrder.thickness}
                        </div>
                        <div className="col-span-2 text-sm">
                          <div>
                            <div>
                              {subOrder.totalM2}
                              {" m2"}
                            </div>
                            <div>
                              {subOrder.totalQuanty}
                              {" adet"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* SUB ORDER BAŞLIKLAR */}
                    <div className="col-span-4 grid grid-cols-3 gap-1 font-light text-sm border-b border-red-600">
                      <div className="grid grid-cols-8 gap-1">
                        <div className="text-center">No</div>
                        <div className="col-span-7 text-center">Model</div>
                      </div>
                      <div className="grid grid-cols-4 items-center">
                        <div className="text-center">Boy</div>
                        <div className="text-center">En</div>
                        <div className="text-center">Adet</div>
                        <div className="text-center">Yön</div>
                      </div>
                      <div className="grid grid-cols-4">
                        <div className="pl-2">Alan</div>
                        <div>Fiyat</div>
                        <div className="col-span-2">Tutar</div>
                      </div>
                    </div>
                    {/* SUB ORDER ITEMS */}
                    {subOrder?.items.length > 0 &&
                      subOrder.items.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="col-span-4 grid grid-cols-3 gap-1 border-b border-red-600"
                          >
                            <div className="grid grid-cols-8 gap-1 items-center">
                              <div className="border-r text-center font-light">
                                {String(index + 1).padStart(2, "0")}
                              </div>
                              <div className="col-span-7 flex flex-col">
                                <div className="text-center">{item.model}</div>
                                <div className="text-xs font-light text*left px-2 flex">
                                  <div className="mr-4 text-gray-600">
                                    {"Not: "}
                                  </div>
                                  <div> {item.desc}</div>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 text-xl font-semibold items-center">
                              <div className="border-x text-center">
                                {item.length}
                              </div>
                              <div className="border-r text-center">
                                {item.width}
                              </div>
                              <div className="text-center">{item.quanty}</div>
                              <div className="text-base font-normal border-x">
                                {item.turnable ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 mx-auto"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18 18 6M6 6l12 12"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 mx-auto"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center">
                              <div className="pl-2">{item.totalM2}</div>
                              <div>--</div>
                              <div className="col-span-2">--</div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                )
              })}
            </div>
            <div className="w-full lg:basis-1/6 pt-2 pb-6 mx-2 print:hidden">
              <div className="border border-black rounded-lg w-full h-full px-2 py-4 bg-gray-400">
                <div className="font-medium text-sm text-white">Adres : </div>
                <div className="text-xs flex flex-col bg-white px-2 py-4 rounded-md">
                  <div className="flex flex-col">
                    <div>{order.company?.addresses[0]?.line1}</div>
                    <div>{order.company?.addresses[0]?.line2}</div>
                  </div>
                  <div className="flex flex-row gap-x-1">
                    <div>{order.company?.addresses[0]?.district} </div>
                    {order.company?.addresses[0]?.city}
                    <div>{order.company?.addresses[0]?.country}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <pre className="print:hidden">{JSON.stringify(order, null, 2)}</pre>
      </>
    )
  }
}

export default OrderShow
