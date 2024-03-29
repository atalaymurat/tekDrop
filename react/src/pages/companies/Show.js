import React, { useState, useEffect } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import axios from "axios"
import { format } from "date-fns"

const Show = () => {
  const [company, setCompany] = useState(null)
  const [offers, setOffers] = useState([])
  const [offerTotals, setOfferTotals] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/companies/${id}`)
      const { data: data2 } = await axios.get(`/companies/${id}/offers`)
      setCompany(data)
      setOffers(data2.offers)
      setOfferTotals(data2.offerTotal)
    }
    getData()
  }, [id])
  const leftData = [
    { title: "Firma", value: company?.title },
    { title: "Tam Ünvan", value: company?.vatTitle },
    { title: "Telefon", value: company?.phone },
    { title: "Eposta", value: company?.email },
    { title: "Vergi Da.", value: company?.vd },
    { title: "Vergi No", value: company?.vatNo },
    {
      title: "Kayıt",
      value: company ? format(new Date(company?.createdAt), "dd/MM/yyyy") : "",
    },
    {
      title: "Güncelleme",
      value: company ? format(new Date(company?.updatedAt), "dd/MM/yyyy") : "",
    },
  ]
  if (company) {
    return (
      <React.Fragment>
        <div className="max-w-5xl mx-auto text-sm">
          <div className="grid grid-cols-2 gap-1 border">
            <div>
              <div className="grid grid-cols-4 border">
                {leftData.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="text-xs font-medium px-1 border-b">
                      {item.title}
                    </div>
                    <div className="col-span-3 px-1 border-b capitalize">
                      {item.value}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div>
              <div className="grid grid-cols-4 border">
                {company?.addresses?.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="p-1 my-1 border grid grid-cols-4 col-span-4">
                      <div className="text-xs font-medium">Adress</div>
                      <div className="col-span-3 capitalize"> {item.title}</div>
                      <div className="text-xs font-medium">Mah. Sk.</div>
                      <div className="col-span-3 capitalize">
                        {" "}
                        {item.line1} {item.line2}
                      </div>
                      <div className="text-xs font-medium">İlçe</div>
                      <div className="col-span-3 capitalize">
                        {" "}
                        {item.district}
                      </div>
                      <div className="text-xs font-medium">Şehir</div>
                      <div className="col-span-3 capitalize">
                        {" "}
                        {item.city} / {item.country} {item.zip}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          {/* COMPANY OFFERS */}
          {offers.length > 0 && (
            <div className="mt-4 border">
              <div className="text-xs font-medium border-b text-center">
                Siparişler
              </div>
              <div className="grid grid-cols-8 gap-1 py-1 font-medium">
                <div className="bg-yellow-200">Code</div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-yellow-200">Tür</div>
                  <div className="bg-yellow-200">Durum</div>
                </div>
                <div className="bg-yellow-200">Baslangıç</div>
                <div className="bg-yellow-200">Sevk</div>
                <div className="bg-yellow-200">Net Tutar</div>
                <div className="bg-yellow-200">KDV</div>
                <div className="bg-yellow-200">Toplam</div>
                <div className="bg-yellow-200">--</div>
              </div>
              {offers
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((item, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`grid grid-cols-8 gap-1 border-b py-1 
                      ${item.offerType == "SV" ? "bg-green-400" : null}
                      ${item.offerType == "SP" ? "bg-red-400" : null}
                      ${item.offerType == "TK" ? "bg-yellow-400" : null}
                        
                        `}
                    >
                      <div>{item.offerCode}</div>
                      <div className="grid grid-cols-2 gap-1">
                        <div>{item.offerType}</div>
                        <div>{item.status}</div>
                      </div>
                      <div>
                        {item.startDate
                          ? format(new Date(item.startDate), "dd/MM/yyyy")
                          : null}
                      </div>
                      <div>
                        {item.createdAt
                          ? format(new Date(item.createdAt), "dd/MM/yyyy")
                          : null}
                      </div>
                      <div>{formPrice(item.offerNetTotalPrice.TL)} TL</div>
                      <div>{formPrice(item.offerKdvPrice.TL)} TL</div>
                      <div>{formPrice(item.offerGrandTotalPrice.TL)} TL</div>
                      <div>
                        <Link to={`/offer/${item._id}`}>
                          <button className="font-medium">Göster</button>
                        </Link>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          )}
          {/* COMPANY OFFERS */}
          {offerTotals ? (
            <div className="grid grid-cols-8 gap-1 py-1 bg-yellow-600">
              <div className="col-span-4 font-medium">Toplam</div>
              <div>{formPrice(offerTotals?.netTotal)}</div>
              <div>{formPrice(offerTotals?.kdvTotal)}</div>
              <div>{formPrice(offerTotals?.total)}</div>
            </div>
          ) : null}
          <pre>{/* JSON.stringify(offers, null, 2)*/}</pre>
        </div>
      </React.Fragment>
    )
  } else {
    return <React.Fragment>Loading ... </React.Fragment>
  }
}

const formPrice = (number) => {
  let n = Number(number)
  return n.toLocaleString("tr-TR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
}

export default Show
