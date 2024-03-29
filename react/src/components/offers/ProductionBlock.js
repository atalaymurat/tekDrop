import React, { useEffect, useState } from "react"
import axios from "axios"

const ProductionBlock = ({ offerId }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/offers/works/${offerId}`)
      setData(data)
    }
    getData()
  }, [offerId])
  const m2 = "m\u00B2"

  return (
    <React.Fragment>
      <div className="bg-yellow-400 p-2 border rounded-md w-full h-full my-4 grid grid-cols-3 gap-1 print:hidden">
        <div className="grid grid-cols-3 gap-1 text-sm text-amber-900">
          <div className="font-semibold">Toplam Yüzey</div>
          <div className="ml-auto">{data.totalSumM2}</div>
          <div className="">{m2}</div>
          {data.worksTotalArr &&
            data.worksTotalArr.map((item, index) => (
              <React.Fragment key={index}>
                <div className="font-semibold">{item._id.side}</div>
                <div className="ml-auto">{item.total}</div>
                <div>{m2}</div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductionBlock
