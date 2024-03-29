import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer"
import { localeDate } from "../../lib/helpers"
import UbuntuRegular from "../../styles/Ubuntu/Ubuntu-Regular.ttf"
import UbuntuBold from "../../styles/Ubuntu/Ubuntu-Bold.ttf"
import UbuntuLight from "../../styles/Ubuntu/Ubuntu-Light.ttf"
import React from "react"
import { format } from "date-fns"

// Register the "Arial" font
Font.register({
  family: "Ubuntu",
  fonts: [
    { src: UbuntuRegular, fontWeight: "normal", fontStyle: "normal" },
    { src: UbuntuBold, fontWeight: "bold", fontStyle: "normal" },
    { src: UbuntuLight, fontWeight: "light", fontStyle: "normal" },
  ],
})

const offerHeading = (tp) => {
  switch (tp) {
    case "SP":
      return { tr: "Sipariş Formu", en: "Order Confirmation" }
    case "NN":
      return { tr: "Diğer Formlar", en: "Other Forms" }
    case "SZ":
      return { tr: "Satış Sözleşmesi", en: "Sales Contract" }
    case "TK":
      return { tr: "Fiyat Teklifi", en: "Sales Offer" }
    case "PF":
      return { tr: "Proforma Fatura", en: "Proforma Invoice" }
    case "SV":
      return { tr: "Sevkiyat Formu", en: "Delivery Form" }
    default:
      return { tr: "", en: "" } // Return empty strings for unknown offer types
  }
}

const PDFShow = ({ offer }) => {
  if (!offer) {
    return <div>Loading offer...</div> // Replace this with your preferred loading indicator
  }

  return (
    <Document author="Drop Ahsap" producer="Drop Ahsap" creator="Drop Api">
      <Page size="A4" style={{ padding: "25 10" }} dpi="72">
        <View style={styles.main}>
          <Head offer={offer} />
          {/*
        <Company offer={offer} /> 
        <PriceTable works={offer.works} offer={offer} />
        <InfoTable offer={offer} />
        <Work works={offer.works} />
        <ProductionBlock offerId={offer._id} />
        */}
          <Company offer={offer} />
          <PriceTable offer={offer} />

          <InfoTable offer={offer} />
        </View>
      </Page>
    </Document>
  )
}

// Styles for PDF content
const styles = StyleSheet.create({
  main: {
    fontFamily: "Ubuntu",
    width: "100%",
    padding: "10px 5px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    fontSize: 10,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "3px 0px",
    padding: "5px 0px",
  },
  containerTotals: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0px 0px",
    padding: "1px 0px",
  },
  col: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  rowLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: "rgb(96,98,99)",
    color: "white",
  },
  rowData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    borderBottom: "0.2px solid silver",
    paddingVertical: "3px",
  },

  heading: {
    fontWeight: "bold",
    fontSize: 14,
    margin: "auto",
  },
  subHeading: {
    fontWeight: "normal",
    fontSize: 10,
    margin: "auto",
  },
  heading2: {
    fontWeight: "bold",
    fontSize: 12,
    margin: "auto",
  },
  subHeading2: {
    fontWeight: "normal",
    fontSize: 8,
    margin: "auto",
  },
  cellLabel: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    borderBottom: "1px solid silver",
    margin: "0px 2px",
    paddingVertical: "2px",
  },
  cellLabel2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    height: "auto",
    margin: "0px 2px",
    paddingVertical: "1px",
  },
  cellData: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "auto",
    borderBottom: "1px solid silver",
    margin: "0px 2px",
    paddingVertical: "2px",
  },
  data: {
    fontSize: "10",
    fontWeight: "normal",
    marginTop: "auto",
  },
  dataEn: {
    marginTop: "auto",
    fontWeight: "light",
    fontSize: 8,
  },
  dataLine: {
    fontSize: 10,
    fontWeight: "normal",
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: "auto",
  },
  labelEn: {
    fontWeight: "light",
    fontSize: 8,
    marginTop: "auto",
  },
  label2: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: "auto",
  },
  label2En: {
    fontWeight: "light",
    fontSize: 8,
    marginTop: "auto",
  },
  headContainer: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  image: {
    width: 100,
    height: 100,
    margin: "auto",
    padding: "5px",
  },
  cell80: {
    flexBasis: "80%",
  },
  cellLine: {
    padding: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  },
  cell: {
    padding: 1,
  },
  cell50: {
    flexBasis: "50%",
  },
  cell65: {
    flexBasis: "65%",
    display: "flex",
  },
  cell40: {
    flexBasis: "40%",
    display: "flex",
  },
  cell60: {
    flexBasis: "60%",
    display: "flex",
  },
  cell5: {
    flexBasis: "5%",
    display: "flex",
  },
  cell30: {
    flexBasis: "30%",
    display: "flex",
  },
  cell35: {
    flexBasis: "35%",
    display: "flex",
    alignItems: "stretch",
  },
  cell20: {
    flexBasis: "20%",
  },
  cell25: {
    flexBasis: "25%",
    display: "flex",
  },
  cell15: {
    flexBasis: "15%",
    display: "flex",
  },
  cell10: {
    flexBasis: "10%",
    display: "flex",
  },
  cell70: {
    flexBasis: "70%",
    display: "flex",
  },
  textSm: {
    fontSize: 7,
    fontWeight: "light",
  },
})
const Head = ({ offer }) => (
  <View style={styles.container}>
    <Text style={styles.heading}>{offerHeading(offer.offerType).tr}</Text>
    <Text style={styles.subHeading}>{offerHeading(offer.offerType).en}</Text>
  </View>
)

const Company = ({ offer }) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <View style={styles.cell20}>
        <Image
          src={process.env.PUBLIC_URL + "/dropLogo.jpeg"}
          style={styles.image}
        />
      </View>

      <View style={styles.cell80}>
        <View styles={styles.col}>
          <View style={styles.row}>
            <View style={styles.cell15}>
              <View style={styles.cellData}>
                <Text style={styles.label}>Firma</Text>
                <Text style={styles.labelEn}>Company</Text>
              </View>
            </View>
            <View style={styles.cell65}>
              <View style={styles.cellData}>
                <Text style={styles.data}>
                  {offer.company?.title || offer.customer || ""}
                </Text>
              </View>
            </View>
            <View style={styles.cell20}>
              <View style={styles.row}>
                <View style={styles.cell40}>
                  <View style={styles.cellLabel}>
                    <Text style={styles.label}>Tarih</Text>
                    <Text style={styles.labelEn}>Date</Text>
                  </View>
                </View>
                <View style={styles.cell60}>
                  <View style={styles.cellData}>
                    <Text style={styles.data}>
                      {localeDate(offer.createdAt)}
                    </Text>
                    <Text style={{ ...styles.dataEn, fontSize: 7 }}>
                      {offer.offerCode}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.col}>
          {[
            {
              label: "Yetkili",
              labelEn: "Person",
              label2: "Eposta",
              labelEn2: "Email",
              data: offer.person,
              data2: offer.company?.email || offer.email,
            },
            {
              label: "Tel",
              labelEn: "Phone",
              label2: "Adres",
              labelEn2: "Address",
              data: offer.company.phone || offer.phone,
              data2:
                offer.company?.addresses[0]?.district +
                  " " +
                  offer.company?.addresses[0]?.city || offer.address,
            },
            {
              label: "Vergi Dairesi",
              labelEn: "Vat",
              label2: "Vergi No",
              labelEn2: "Vat Number",
              data: offer.company?.vd,
              data2: offer.company?.vatNo || offer.company?.tcNo,
            },
          ].map((e, i) => (
            <View style={styles.row} key={i}>
              <View style={styles.cell15}>
                <View style={styles.cellLabel}>
                  <Text style={styles.label}>{e.label}</Text>
                  <Text style={styles.labelEn}>{e.labelEn}</Text>
                </View>
              </View>
              <View style={styles.cell35}>
                <View style={styles.cellData}>
                  <Text style={styles.data}>{e.data}</Text>
                </View>
              </View>
              <View style={styles.cell15}>
                <View style={styles.cellLabel}>
                  <Text style={styles.label}>{e.label2}</Text>
                  <Text style={styles.labelEn}>{e.labelEn2}</Text>
                </View>
              </View>
              <View style={styles.cell35}>
                <View style={styles.cellData}>
                  <Text style={styles.data}>{e.data2}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  </View>
)

const PriceTable = ({ offer }) => (
  <View style={styles.container}>
    <View style={{ ...styles.col }}>
      <Text style={styles.heading2}>Fiyatlandırma</Text>
      <Text style={{ ...styles.subHeading2, marginBottom: 4 }}>
        Price Offer
      </Text>

      {["TL", "USD", "EUR"].map((cr, i) => (
        <React.Fragment key={i}>
          {offer.works.filter((e) => e.price.cur === cr).length ? (
            <React.Fragment>
              <View style={styles.rowLabel}>
                <View style={styles.cell5}>
                  <View style={styles.cellLabel2}>
                    <Text style={styles.label2}>No</Text>
                    <Text style={styles.label2En}>No</Text>
                  </View>
                </View>
                <View style={styles.cell10}>
                  <View style={styles.cellLabel2}>
                    <Text style={styles.label2}>Kod</Text>
                    <Text style={styles.label2En}>Code</Text>
                  </View>
                </View>
                <View style={styles.cell35}>
                  <View style={styles.cellLabel2}>
                    <Text style={styles.label2}>Açıklama</Text>
                    <Text style={styles.label2En}>Description</Text>
                  </View>
                </View>
                <View style={styles.cell10}>
                  <View style={styles.cellLabel2}>
                    <Text style={styles.label2}>Birim Fiyat</Text>
                    <Text style={styles.label2En}>Item Price</Text>
                  </View>
                </View>
                <View style={styles.cell10}>
                  <View style={styles.cellLabel2}>
                    <Text style={styles.label2}>Miktar</Text>
                    <Text style={styles.label2En}>Quanty</Text>
                  </View>
                </View>
                <View style={styles.cell10}>
                  <View style={styles.cellLabel2}>
                    <Text style={styles.label2}>Birim</Text>
                    <Text style={styles.label2En}>Unit</Text>
                  </View>
                </View>
                <View style={styles.cell15}>
                  <View style={styles.cellLabel2}>
                    <Text style={{ ...styles.label2, marginLeft: "auto" }}>
                      Toplam Fiyat
                    </Text>
                    <Text style={{ ...styles.label2En, marginLeft: "auto" }}>
                      Total Price
                    </Text>
                  </View>
                </View>
                <View style={styles.cell5}>
                  <View style={styles.cellLabel2}>
                    <Text style={styles.label2}> </Text>
                    <Text style={styles.label2En}> </Text>
                  </View>
                </View>
              </View>

              {offer.works
                .filter((e) => e.price.cur === cr)
                .sort((a, b) => a.unit < b.unit)
                .map((e, i) => (
                  <View style={styles.rowData} key={i}>
                    <View style={styles.cell5}>
                      <View style={styles.cellLine}>
                        <Text
                          style={{
                            ...styles.dataLine,
                            marginLeft: "2px",
                            ...styles.textSm,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cell10}>
                      <View style={styles.cellLine}>
                        <Text style={{...styles.dataLine, fontSize: 8}}>{e.code.trim()}</Text>
                      </View>
                    </View>
                    <View style={styles.cell35}>
                      <View style={styles.cellLine}>
                        <Text style={{ ...styles.dataLine, fontSize: 8 }}>
                          {e.product
                            ? e.product.name + " " + e.typeOfwork
                            : e.typeOfwork.slice(0, 25).trim()}{" "}
                          {e.color}
                          {e.side === "TY" && " Tek Yüz"}
                          {e.side === "CY" && " Çift Yüz"}
                          {e.gloss !== "100" && e.gloss !== "" ? " Mat" : null}
                          {e.gloss === "100" && " Parlak"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cell10}>
                      <View style={styles.cellLine}>
                        <Text style={styles.dataLine}>
                          {formPrice(e.price.val)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cell10}>
                      <View style={styles.cellLine}>
                        <Text
                          style={{ ...styles.dataLine, fontWeight: "bold" }}
                        >
                          {formNumber(e.totalUnit)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cell10}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "baseline",
                        }}
                      >
                        <Text style={styles.dataLine}>{e.unit}</Text>
                        <Text
                          style={{
                            ...styles.dataLine,
                            marginLeft: 4,
                            ...styles.textSm,
                          }}
                        >
                          {(e.unit === "m2" && "m2") ||
                            (e.unit === "m" && "meter") ||
                            (e.unit === "adet" && "pieces") ||
                            (e.unit === "takım" && "set")}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cell15}>
                      <View style={styles.cellLine}>
                        <Text
                          style={{
                            ...styles.dataLine,
                            marginLeft: "auto",
                            fontWeight: "bold",
                          }}
                        >
                          {formPrice(e.workTotalPrice.val)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cell5}>
                      <View style={styles.cellLine}>
                        <Text style={{ ...styles.dataLine, ...styles.textSm }}>
                          {e.price.cur}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              <GrandTotalTable offer={offer} cur={cr} />
            </React.Fragment>
          ) : null}
        </React.Fragment>
      ))}
    </View>
  </View>
)

const GrandTotalTable = ({ offer, cur }) => {
  const renderPriceTable = (label, value) => (
    <View
      style={{
        ...styles.containerTotals,
        marginBottom:
          label.tr === "İndirim" || label.tr === "KDV" ? "6px" : "0px",
      }}
    >
      <View style={styles.row}>
        <View style={{ ...styles.cell60 }}></View>
        <View style={{ ...styles.cell20 }}>
          <View
            style={{
              ...styles.row,
              alignItems: "baseline",
              fontWeight: "bold",
            }}
          >
            <Text>{label.tr}</Text>
            <View style={{ ...styles.textSm, marginLeft: "5px" }}>
              <Text>{label.en}</Text>
            </View>
            {label.tr === "İndirim" ? (
              <View style={{ ...styles.textSm, marginLeft: "3px" }}>
                <Text>%{offer.discount}</Text>
              </View>
            ) : null}
            {label.tr === "KDV" ? (
              <View style={{ ...styles.textSm, marginLeft: "3px" }}>
                <Text>%{offer.kdv}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{ ...styles.cell15 }}>
          <View
            style={{
              ...styles.row,
              alignItems: "baseline",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                ...styles.dataLine,
                fontWeight:
                  label.tr === "Genel Toplam" || label.tr === "Toplam"
                    ? "bold"
                    : "normal",
              }}
            >
              {formPrice(offer[value][cur])}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.cell5 }}>
          <View style={{ ...styles.cellLine, ...styles.textSm }}>
            <Text>{cur}</Text>
          </View>
        </View>
      </View>
    </View>
  )

  if (offer.noTotals) return null

  return (
    <React.Fragment>
      <View style={{ marginVertical: "6px" }} wrap={false}>
        {(offer.kdv > 0 || offer.discount > 0) &&
          renderPriceTable({ tr: "Toplam", en: "Total" }, "offerTotalPrice")}
        {offer.discount > 0 &&
          renderPriceTable(
            { tr: "İndirim", en: "Discount" },
            "offerDiscountPrice"
          )}
        {offer.discount > 0 &&
          offer.kdv > 0 &&
          renderPriceTable(
            { tr: "Net Toplam", en: "Net Total" },
            "offerNetTotalPrice"
          )}
        {offer.kdv > 0 &&
          renderPriceTable({ tr: "KDV", en: "VAT" }, "offerKdvPrice")}
        {renderPriceTable(
          { tr: "Genel Toplam", en: "Grand Total" },
          "offerGrandTotalPrice"
        )}
      </View>
    </React.Fragment>
  )
}

const InfoTable = ({ offer }) => {
  const {
    showTerms,
    salesConditions,
    paymentTerms,
    deliveryDate,
    packaging,
    warranty,
    infos,
  } = offer

  const titles = [
    {
      tr: "Teslim Yeri",
      en: "Delivery of Goods",
      desc: [salesConditions],
    },
    {
      tr: "Ödeme Şekli",
      en: "Payment Terms",
      desc: [paymentTerms],
    },
    {
      tr: "Teslim Şartları",
      en: "Terms of Delivery",
      desc: ["Sipariş ödemesinin alınmasından sonra,", deliveryDate],
    },
    { tr: "Paketleme", en: "Packaging", desc: [packaging] },
    {
      tr: "Garanti Şartları",
      en: "Warranty Terms",
      desc: [
        "Drop Ahşap ürünleri ile birlikte verilen garanti belgesinin kullanılmasına 4077 sayılı kanun ile bu kanuna dayanılarak düzenlenen TRKGM-95/116-117 sayılı tebliğ uyarınca T.C. Sanayi ve Ticaret Bakanlığı, Tüketicinin ve Rekabetin Korunması Genel Müdürlüğü tarafından 24618 sayısı ile izin verilmiştir. Drop Ahşap kanun ve mevzuatın belirlediği yükümlülüklere uymayı kabul ve taahhüt etmektedir.",
        `${warranty}`,
      ],
    },
    {
      tr: "Bilgilendirme",
      en: "Info",
      desc: [
        "Özellikle belirtilmedikçe, fiyatlara KDV dahil değildir.",
        "Fason boya üretimlerde boyanan toplam yüzeyin m2'si hesaplanır.",
        "Katalog renkleri, Renk kodları ile biten mamül arasında ton farklılıkları olabilir.",
        "Ek sipariş veya hasar görmüş parçaların temini en az (10) iş günüdür.",
        "Teklif geçerlilik süresi (10) gündür.",
        `${infos}`,
      ],
    },
  ]

  if (showTerms) {
    return (
      <React.Fragment>
        <View style={styles.container}>
          {titles.map((t, i) => {
            return (
              <View style={{ ...styles.row, marginVertical: "1px" }} key={i}>
                <View
                  style={{
                    ...styles.cell20,
                    borderBottom: "1px solid silver",
                    marginRight: "2px",
                    padding: "2px",
                  }}
                >
                  <View style={{ ...styles.col }}>
                    <Text style={styles.label}>{t.tr}</Text>
                    <Text style={styles.labelEn}>{t.en}</Text>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.cell80,
                    borderBottom: "1px solid silver",
                    padding: "2px",
                  }}
                >
                  {t.desc.map((d, i) => (
                    <React.Fragment key={i}>
                      <Text style={{ fontSize: 9, textAlign: "justify" }}>
                        {d}
                      </Text>
                    </React.Fragment>
                  ))}
                </View>
              </View>
            )
          })}
        </View>
      </React.Fragment>
    )
  } else {
    return null
  }
}

export default PDFShow

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
}
