import React, { useState, useEffect } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import axios from "axios"
import { localeDate } from "../../lib/helpers"
import EditButton from "../../components/buttons/EditButton"
import BackButton from "../../components/buttons/BackButton"
import { format } from "date-fns"
import ProductionBlock from "../../components/offers/ProductionBlock"
import PDFShow from "../../components/offers/PDFShow"
import { BlobProvider } from "@react-pdf/renderer"

function Show() {
  const [offer, setOffer] = useState(null)
  const { id } = useParams()
  const { state } = useLocation()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/offers/${id}`)
      setOffer(data)
    }
    getData()
  }, [id])

  const offerHeading = (tp) =>
    (tp === "SP" && { tr: "Sipariş Formu", en: "Order Confirmation" }) ||
    (tp === "SZ" && { tr: "Satış Sözleşmesi", en: "Sales Contract" }) ||
    (tp === "TK" && { tr: "Fiyat Teklifi", en: "Sales Offer" }) ||
    (tp === "SV" && { tr: "Sevkiyat Formu", en: "Delivery Form" }) ||
    (tp === "PF" && { tr: "Proforma Fatura", en: "Proforma Invoice" })

  if (!offer) return <div>Loading..</div>

  if (offer)
    return (
      <div className="max-w-4xl mx-auto flex flex-col lining-nums">
        <div className="print:hidden grid grid-flow-col auto-cols-min gap-1 grid-rows-1 items-center py-4">
          <Link to="/offer" state={state}>
            <BackButton />
          </Link>
          <Link to={`/offer/edit/${offer._id}`} state={state}>
            <EditButton />
          </Link>

          <BlobProvider document={<PDFShow offer={offer} />}>
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading PDF..."
              ) : error ? (
                "Error occurred"
              ) : (
                <a
                  href={url}
                  className="text-sm font-medium border border-purple-600 rounded-md p-2 h-full flex items-center justify-center"
                  download={encodeURIComponent(
                    `${offer.offerCode.slice(
                      2
                    )}_${offer.company.normalizedTitle.replace(/\s/g, "")}`
                  )
                    .slice(0, 14)
                    .toUpperCase()}
                >
                  PDF
                </a>
              )
            }
          </BlobProvider>
        </div>
        <h1 className="mx-auto font-extrabold text-xl">
          <div>{offerHeading(offer.offerType).tr}</div>
          <div className="text-sm font-normal">
            {offerHeading(offer.offerType).en}
          </div>
        </h1>
        <div className="ml-auto border-b">
          <div className="border-b text-sm font-semibold">
            Tarih <span className="ml-2 text-xs font-normal">Date</span>
          </div>
          <div className="ml-auto text-sm">{localeDate(offer.createdAt)}</div>
        </div>
        <div className="ml-auto text-xs">{offer.offerCode}</div>
        <Customer offer={offer} />
        <PriceTable works={offer.works} offer={offer} />
        <InfoTable offer={offer} />
        <Work works={offer.works} />
        <ProductionBlock offerId={offer._id} />

        <pre className="p-4 my-4 hidden">{JSON.stringify(offer, null, 2)}</pre>
      </div>
    )
}

export default Show

const InfoTable = ({ offer }) => {
  const {
    showTerms,
    salesConditions,
    paymentTerms,
    deliveryDate,
    packaging,
    warranty,
    infos,
    startDate,
    finishDate,
  } = offer
  const titles = [
    {
      tr: "Teslim Yeri",
      en: "Delivery of Goods",
      desc: salesConditions,
    },
    {
      tr: "Ödeme Şekli",
      en: "Payment Terms",
      desc: paymentTerms,
    },
    {
      tr: "Teslim Şartları",
      en: "Terms of Delivery",
      desc: (
        <div>
          Sipariş avansının alınmasından itibaren.
          <br />
          {deliveryDate}
        </div>
      ),
      details: [
        {
          tr: "İmalat Tarihi",
          en: "Manufacturing Date",
          desc: startDate ? (
            <div>{format(new Date(startDate), "dd/MM/yyyy")}</div>
          ) : null,
        },
        {
          tr: "Sevk Tarihi",
          en: "Delivery Date",
          desc: finishDate ? (
            <div>{format(new Date(finishDate), "dd/MM/yyyy")}</div>
          ) : null,
        },
      ],
    },
    { tr: "Paketleme", en: "Packaging", desc: packaging },
    {
      tr: "Garanti Şartları",
      en: "Warranty Terms",
      desc: (
        <div className="text-sm">
          <p className="text-xs justify">
            Drop Ahşap ürünleri ile birlikte verilen garanti belgesinin
            kullanılmasına 4077 sayılı kanun ile bu kanuna dayanılarak
            düzenlenen TRKGM-95/116-117 sayılı tebliğ uyarınca T.C. Sanayi ve
            Ticaret Bakanlığı, Tüketicinin ve Rekabetin Korunması Genel
            Müdürlüğü tarafından 24618 sayısı ile izin verilmiştir. Drop Ahşap
            kanun ve mevzuatın belirlediği yükümlülüklere uymayı kabul ve
            taahhüt etmektedir.
          </p>

          {warranty}
        </div>
      ),
    },
    {
      tr: "Bilgilendirme",
      en: "Info",
      desc: (
        <div className="font-normal">
          Özellikle belirtilmedikçe, fiyatlara KDV dahil değildir.
          <br />
          Fason boya üretimlerde boyanan toplam yüzeyin m2'si hesaplanır.
          <br />
          Katalog renkleri, Renk kodları ile biten mamül arasında ton
          farklılıkları olabilir.
          <br />
          Ek sipariş veya hasar görmüş parçaların temini en az (10) iş günüdür.
          <br />
          Teklif geçerlilik süresi (10) gündür.
          <br />
          <div className="w-full h-full">{infos}</div>
        </div>
      ),
    },
  ]
  if (showTerms) {
    return (
      <div className="grid grid-cols-6 gap-1 text-sm my-2">
        {titles
          .filter((t) => t.desc)
          .map((t, i) => {
            if (t.tr === "Teslim Şartları") {
              // Teslim Süresi ile ilgili detaylı bilgi
              return (
                <React.Fragment key={i}>
                  <div className="col-span-6  grid grid-cols-6 gap-1">
                    <div className="border-b pl-1">
                      <div className="font-semibold">{t.tr}</div>
                      <div className="font-light text-xs">{t.en}</div>
                    </div>
                    <div className="col-span-2 text-xs border-b">{t.desc}</div>
                    <div className="grid grid-cols-2 gap-1 col-span-3">
                      {t.details
                        .filter((d) => d.desc)
                        .map((d, i) => (
                          <div className="col-span-1 border-b" key={i}>
                            <div className="font-semibold">{d.tr}</div>
                            <div className="font-light text-xs">{d.en}</div>
                            <div>{d.desc}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </React.Fragment>
              )
            } else {
              // Diğerleri                                                             // Diğerleri
              return (
                <React.Fragment key={i}>
                  <div className="border-b font-semibold pl-1">
                    <div>{t.tr}</div>
                    <div className="font-light text-xs">{t.en}</div>
                  </div>
                  <div className="col-span-5 border-b text-xs">
                    <div>{t.desc}</div>
                    <div className="font-light text-xs"></div>
                  </div>
                </React.Fragment>
              )
            }
          })}
      </div>
    )
  } else {
    return <></>
  }
}

const Work = ({ works }) => {
  if (!works) {
    return <div>Loading...</div>
  }
  return (
    <div className="">
      {works
        .sort((a, b) => a.unit < b.unit)
        .map((w, i) => {
          if (!w.noList) {
            return (
              <div className="flex flex-col my-4 text-sm" key={i}>
                <div className="text-center font-semibold py-2">
                  <h1>Sipariş Detayı</h1>
                  <div className="text-xs font-normal">Order Detail</div>
                </div>
                <div className="grid grid-cols-6 gap-2 content-center bg-gray-50  px-2 border rounded-md shadow-md">
                  <div className="grid grid-cols-6 col-span-6">
                    <div className="grid grid-cols-4 col-span-2 gap-1">
                      <div className="font-semibold">
                        <div>Kod</div>
                        <div className="text-xs font-light">Code</div>
                      </div>
                      <div className="flex items-center col-span-3 text-sm font-medium">
                        {w.code}
                      </div>
                    </div>

                    <div className="font-semibold">
                      <div>Sipariş</div>
                      <div className="text-xs font-light">Order</div>
                    </div>

                    <div className="flex items-center col-span-1 pl-2 capitalize">
                      {w.product
                        ? w.product.name + " " + w.typeOfwork
                        : w.typeOfwork}
                    </div>
                    <div className="grid grid-cols-2 gap-1 col-span-2">
                      <div className="font-semibold text-right pr-4">
                        <div>Yüz</div>
                        <div className="text-xs font-light">Side</div>
                      </div>
                      <div className="text-left flex items-center pl-2">
                        {w.side === "CY" && "Çift Yüz"}
                        {w.side === "TY" && "Tek Yüz"}
                        {w.side === "AA" && "Tek Yüz Arka Yüz Astar"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1 col-span-2">
                    <div className="font-semibold">
                      <div>Renk</div>
                      <div className="text-xs font-light">Color</div>
                    </div>
                    <div className="flex items-center col-span-3 ">
                      {w.color}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 col-span-2">
                    <div className="font-semibold pr-4">
                      <div>Parlaklık</div>
                      <div className="text-xs font-light">Gloss</div>
                    </div>
                    <div className="text-left flex items-center pl-2">
                      {w.gloss}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 col-span-2">
                    <div className="font-semibold text-right pr-4">
                      <div>Kalınlık</div>
                      <div className="text-xs font-light">Thickness</div>
                    </div>
                    <div className="text-left flex items-center pl-2">
                      {w.thickness}
                    </div>
                  </div>
                  <Dimensions
                    dimensions={w.dimensions}
                    unit={w.unit}
                    work={w}
                  />
                  <div className="col-span-6 grid grid-cols-2 gap-1">
                    <div></div>
                    <div className="grid grid-cols-4 gap-1">
                      <div className="text-sm">
                        <div>Toplam Adet</div>
                        <div className="text-xs font-light">Total Quanty</div>
                      </div>
                      <div className="text-center font-bold flex items-center mx-auto">
                        {w.totalQuanty}
                      </div>
                      <div>
                        <div>Toplam ({w.unit})</div>
                        <div className="text-xs font-light">
                          Total (
                          {(w.unit === "adet" && "pieces") ||
                            (w.unit === "takım" && "set") ||
                            (w.unit === "m2" && "m2") ||
                            (w.unit === "m" && "meter")}
                          )
                        </div>
                      </div>
                      <div className="text-center font-bold flex items-center mx-auto">
                        {formNumber(w.totalUnit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          return null
        })}
    </div>
  )
}

const Dimensions = ({ dimensions, unit, work }) => {
  if (!dimensions || !unit) {
    return <div>Loading Dims ... or No DATA</div>
  }
  return (
    <>
      <div className="grid grid-cols-11 gap-1 col-span-6 bg-stone-500">
        {[
          { tr: "No", en: "No" },
          { tr: "Boy", en: "Length" },
          { tr: "En", en: "width" },
          { tr: "Adet", en: "quanty" },
          { tr: "Açıklama", en: "description" },
          (unit === "m2" && { tr: "M2", en: unit }) ||
            (unit === "m" && { tr: "M.tül", en: "meter" }) ||
            (unit === "adet" && { tr: unit, en: "piece" }) ||
            (unit === "takım" && { tr: unit, en: "set" }),
          { tr: "Toplam", en: "total" },
        ].map((t, i) => (
          <div
            key={"headers-" + i}
            className={`
            ${t.tr === "Açıklama" ? "col-span-3" : null} 
            ${t.tr === "Boy" ? "col-span-2" : null} 
            ${t.tr === "Toplam" ? "text-center" : null} 
            ${t.tr === unit ? "capitalize text-center" : null} 
            ${
              t.tr === "En" ? " col-span-1" : null
            } text-white font-medium px-2 text-sm`}
          >
            <div>{t.tr}</div>
            <div className="text-xs font-normal">{t.en}</div>
          </div>
        ))}
      </div>

      <div className="col-span-6 text-sm">
        {dimensions.map((dim, i) => {
          return (
            <div className="grid grid-cols-11 gap-1" key={"dim-headers-" + i}>
              {[
                String(i + 1).padStart(2, "0"),
                dim.length,
                dim.width,
                dim.quanty,
                dim.desc,
                work.unit === "m2" ? dim.m2 : "-",
                (work.unit === "m2" && dim.tm2) ||
                  (work.unit === "adet" && dim.quanty) ||
                  (work.unit === "takım" && dim.quanty) ||
                  (work.unit === "m" && dim.tLength),
              ].map((d, i) => (
                <div
                  key={"dims-" + i}
                  className={`

            ${i === 0 ? "text-xs font-light " : null} 
            ${i === 4 ? "col-span-3 " : null} 
            ${i === 5 || i === 6 ? "text-center" : null} 
            ${i === 1 ? " col-span-2" : null}
             border-b capitalize px-2`}
                >
                  {d}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}

const Customer = ({ offer }) => {
  const company = offer.company ? offer.company : null
  const colsData = (offer) => [
    { title: "Yetkili", en: "Person", text: offer.person },
    {
      title: "Eposta",
      en: "Email",
      text: (company ? company.email : "") || offer.email,
    },
    {
      title: "Tel",
      en: "Phone",
      text: (company ? company.phone : "") || offer.phone,
    },
    {
      title: "Adres",
      en: "Address",
      text: company
        ? `${company.addresses[0]?.district || ""} ${
            company.addresses[0]?.city || ""
          } ${company.addresses[0]?.zip || ""}`
        : "" || offer.address,
    },
  ]
  if (!offer) {
    return <div>Loading offer</div>
  }
  return (
    <div className="grid grid-cols-5 gap-4 content-center">
      <img
        src={process.env.PUBLIC_URL + "/dropLogo.jpeg"}
        alt="logo"
        className="object-cover h-[130px]"
      />
      <div className="grid grid-cols-2 gap-2 col-span-4 content-center text-sm">
        <div className="grid grid-cols-6 col-span-2 gap-1 content-center">
          <div className="px-1 border-b font-semibold">
            <div>Firma</div>
            <div className="text-xs font-normal">Company</div>
          </div>
          <div className="px-1 col-span-5 border-b capitalize flex items-center">
            {offer.customer || (company ? company.title : "No Company")}
          </div>
        </div>
        {colsData(offer).map((dd, i) => (
          <div
            key={"data-" + i}
            className="grid grid-cols-3 gap-1 content-center"
          >
            <div className="px-1 border-b font-semibold">
              <div className="">{dd.title}</div>
              <div className="text-xs font-normal">{dd.en}</div>
            </div>
            <div className="px-1 col-span-2 border-b flex items-center">
              {dd.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PriceTable = ({ works, offer }) => {
  if (!works) {
    return <div>Loading works</div>
  }
  return (
    <div className="flex flex-col border mb-6 w-full my-2  shadow-lg rounded px-2">
      <h1 className="mx-auto py-2 text-center font-semibold text-base">
        <div>Fiyatlandırma</div>
        <div className="text-xs font-normal flex items-center justify-center">
          Price Offer
        </div>
      </h1>

      {["TL", "USD", "EUR"].map((cr, i) => (
        <React.Fragment key={i}>
          {works.filter((e) => e.price.cur === cr).length ? (
            <React.Fragment>
              <div className="grid grid-cols-8 gap-1 bg-stone-500 text-white font-medium text-sm">
                <div className="grid grid-cols-4 gap-1">
                  <div className="text-center pl-1">No</div>
                  <div className="col-span-3 text-center">
                    <div>Kod</div>
                    <div className="text-xs font-normal">Code</div>
                  </div>
                </div>

                <div className="col-span-3">
                  <div>Açıklama</div>
                  <div className="text-xs font-normal">Description</div>
                </div>

                <div className="col-span-2 grid grid-cols-2 gap-1">
                  <div className="text-left">
                    <div>B.Fiyat</div>
                    <div className="text-xs font-normal">Item Price</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="col-span-2 text-left">
                      <div>Miktar</div>
                      <div className="text-xs font-normal">Quanty</div>
                    </div>
                    <div className=""></div>
                  </div>
                </div>

                <div className="grid grid-cols-7 col-span-2 gap-1">
                  <div className="col-span-6 text-right">
                    <div>Toplam Fiyat</div>
                    <div className="text-xs font-normal">Total Price</div>
                  </div>
                  <div></div>
                </div>
              </div>
              {works
                .filter((e) => e.price.cur === cr)
                .sort((a, b) => a.unit < b.unit)
                .map((w, i) => (
                  <div key={"pw-" + i} className="border-b py-1">
                    <div className="grid grid-cols-8 gap-1 text-sm">
                      <div className="grid grid-cols-4 gap-1">
                        <div className="text-center font-light text-xs">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="col-span-3 ml-4 text-xs">{w.code}</div>
                      </div>

                      <div className="col-span-3 uppercase text-xs">
                        {w.product
                          ? w.product.name + " " + w.typeOfwork
                          : w.typeOfwork.slice(0, 25)}{" "}
                        {w.color}
                        {w.side === "TY" && " tek yüz"}
                        {w.side === "CY" && " çİft yüz"}
                        {w.gloss !== "100" && w.gloss !== "" ? " mat" : null}
                        {w.gloss === "100" && " parlak"}
                      </div>

                      <div className="col-span-2 grid grid-cols-2 gap-1">
                        <div className="">{formPrice(w.price.val)}</div>
                        <div className="grid grid-cols-3 gap-1 items-baseline">
                          <div className="col-span-2 text-left text-xs">
                            {formNumber(w.totalUnit)}
                          </div>
                          <div className="text-sm flex items-baseline">
                            <div>{(w.unit === "m" && "m.tül") || w.unit}</div>
                            <div className="ml-2 text-xs font-light ">
                              {(w.unit === "m2" && "m2") ||
                                (w.unit === "m" && "meter") ||
                                (w.unit === "adet" && "pieces") ||
                                (w.unit === "takım" && "set")}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 col-span-2 gap-1 items-baseline">
                        <div className="col-span-6 text-right font-semibold">
                          {formPrice(w.workTotalPrice.val)}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {w.price.cur}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <GrandTotalTable works={works} offer={offer} cur={cr} />
            </React.Fragment>
          ) : (
            <div></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const GrandTotalTable = ({ works, offer, cur }) => {
  if (!works || !offer)
    return <div className="bg-green-500">Loading works...</div>
  if (offer.noTotals) return null

  return (
    <div className="grid grid-cols-5 gap-1 mt-4 my-4 py-2">
      <div className="col-span-3"></div>
      <div className="col-span-2">
        {(offer.kdv > 0 || offer.discount > 0) && (
          <div className="grid grid-cols-11 gap-1 text-sm">
            <div className="col-span-6 font-semibold flex items-baseline">
              Toplam
              <div className="text-xs font-light pl-2">Total</div>
            </div>
            <div className="col-span-4 font-semibold flex items-center ml-auto">
              {formPrice(offer.offerTotalPrice[cur])}
            </div>
            <div className="text-xs text-gray-500 flex items-center">{cur}</div>
          </div>
        )}
        {offer.discount > 0 && (
          <div className="grid grid-cols-11 gap-1 text-sm">
            <div className="col-span-6 flex items-baseline">
              <div className="font-semibold">İndirim</div>
              <div className="text-xs font-light pl-2">
                Discount
                <span className="text-xs text-gray-600 pl-1">
                  %{offer.discount}
                </span>
              </div>
            </div>
            <div className="col-span-4 ml-auto flex items-center">
              {formPrice(offer.offerDiscountPrice[cur])}
            </div>
            <div className="text-xs text-gray-500 flex items-center">{cur}</div>
          </div>
        )}
        {offer.discount > 0 && offer.kdv > 0 && (
          <div className="grid grid-cols-11 gap-1 mt-2">
            <div className="col-span-6 text-sm flex items-baseline">
              <div className="font-semibold">Net Toplam</div>
              <div className="text-xs font-light pl-2">Net Total</div>
            </div>
            <div className="col-span-4 text-right text-sm flex items-center ml-auto">
              {formPrice(offer.offerNetTotalPrice[cur])}
            </div>
            <div className="text-xs text-gray-500 flex items-center">{cur}</div>
          </div>
        )}
        {offer.kdv > 0 && (
          <div className="grid grid-cols-11 gap-1 text-sm">
            <div className="col-span-6 text-sm flex items-baseline">
              <div className="font-semibold">KDV</div>
              <div className="font-light text-xs pl-2">VAT</div>
              <div className="text-sm font-light pl-2">%{offer.kdv}</div>
            </div>
            <div className="col-span-4 flex items-center ml-auto">
              {formPrice(offer.offerKdvPrice[cur])}
            </div>
            <div className="text-xs text-gray-500 flex items-center">{cur}</div>
          </div>
        )}
        <div className="grid grid-cols-11 gap-1 mt-2 font-semibold">
          <div className="col-span-6 flex items-baseline">
            <div>Genel Toplam</div>
            <div className="text-xs font-light pl-2">Grand Total</div>
          </div>
          <div className="col-span-4 flex items-center ml-auto">
            {formPrice(offer.offerGrandTotalPrice[cur])}
          </div>
          <div className="text-xs text-gray-500 flex items-center">{cur}</div>
        </div>
      </div>
    </div>
  )
}

const formPrice = (number) => {
  let n = Number(number)
  return n.toLocaleString("tr-TR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
}
const formNumber = (number) => {
  let n = Number(number)
  return n.toLocaleString("tr-TR", {
    maximumFractionDigits: 4,
    minimumFractionDigits: 2,
  })
  // return new Intl.NumberFormat("tr-TR").format(n);
}
