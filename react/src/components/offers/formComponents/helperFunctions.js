import axios from "axios"

const setProductOptions = (data) => {
  const prdOps = data.map((d) => {
    return { label: `${d.name.toLocaleUpperCase("en-US")} ${d.desc} ${d.finishGloss} ${d.finishSide}`, value: d._id }
  })
  return prdOps
}
const reformData = (data) => {
  // const filterdWorks = data.works.filter((d) => d.typeOfwork !== "")
  // data.works = filterdWorks
  data.discount = Number(data.discount) || 0
  data.kdv = Number(data.kdv) || 0
  data.customer = data.customer || ""

  data.works.map((w, i) => {
    if (w.product === "") {
      delete data.works[i].product
    }

    data.works[i].thickness = Number(data.works[i].thickness) || 0
    data.works[i].price.val = Number(data.works[i].price.val) || 0
    data.works[i].code = data.works[i].code || ""
    w.dimensions.map((d, n) => {
      data.works[i].dimensions[n].length =
        Number(data.works[i].dimensions[n].length) || 0
      data.works[i].dimensions[n].width =
        Number(data.works[i].dimensions[n].width) || 0
      data.works[i].dimensions[n].quanty =
        Number(data.works[i].dimensions[n].quanty) || 0
      return d
    })

    const filterdDims = w.dimensions.filter((d) => d != null)

    data.works[i].dimensions = filterdDims
    return data
  })
}

const getCompanies = async (setCompanyOptions) => {
  const { data } = await axios.get("/companies/labels")
  setCompanyOptions(data)
}

export { setProductOptions, reformData, getCompanies }
