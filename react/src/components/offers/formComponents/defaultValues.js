const DEFAULT_WORK = {
  typeOfwork: "",
  position: 1,
  product: "",
  side: "",
  gloss: "",
  color: "",
  thickness: "",
  unit: "m2",
  interChangeable: true,
  dimensions: [
    {
      length: "",
      width: "",
      quanty: "",
      control: false,
      desc: "",
    },
  ],
  noList: false,
  machineData: false,
  price: { val: "", cur: "TL" },
}

const DEFAULTS_VALUES = {
  customer: "",
  company: "",
  offerType: "",
  person: "",
  phone: "",
  email: "",
  adress: "",
  discount: 0,
  showTerms: false,
  noTotals: false,
  kdv: 20,
  salesConditions: "",
  paymentTerms: "",
  deliveryDate: "",
  packaging: "",
  warranty: "",
  infos: "",
  status: "",
  startDate: null,
  finishDate: null,
  works: [DEFAULT_WORK],
}

const TEKLIF_TYPES = [
  { label: "Seçiniz...", value: "" },
  { label: "Sipariş", value: "SP" },
  { label: "Teklif", value: "TK" },
  { label: "Proforma", value: "PF" },
  { label: "Sözleşme", value: "SZ" },
  { label: "Sevk", value: "SV" },
  { label: "Diğer", value: "NN" },
]
const GLOSS_OPTIONS = [
  { label: "Seçiniz...", value: "" },
  { label: "Zero Mat", value: "0" },
  { label: "Tam Mat 10", value: "10" },
  { label: "Mat 20", value: "20" },
  { label: "İpek Mat 40", value: "40" },
  { label: "Parlak 100", value: "100" },
]
const CUR_TYPES = [
  { label: "Seçiniz...", value: "" },
  { label: "TL", value: "TL" },
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
]
const SIDE_OPTIONS = [
  { label: "Seçiniz...", value: "" },
  { label: "Tek Yüz", value: "TY" },
  { label: "Çift Yüz", value: "CY" },
  { label: "Tek Yüz Arka Astar", value: "TYA" },
]
const UNIT_TYPES = [
  { label: "Seçiniz...", value: "" },
  { label: "m2", value: "m2" },
  { label: "m/tül", value: "m" },
  { label: "adet", value: "adet" },
  { label: "takım", value: "takım" },
]
const STATUS_TYPES = [
  { label: "seçiniz...", value: "" },
  { label: "sipariş", value: "siparis" },
  { label: "beklemede", value: "beklemede" },
  { label: "imalat", value: "imalat" },
  { label: "bitti", value: "bitti" },
  { label: "iptal", value: "iptal" },
  { label: "diğer", value: "diger" },
]
const TURN_OPTIONS = [
  { label: "Seçiniz...", value: "" },
  { label: "Dönebilir", value: true },
  { label: "Dönemez", value: false },
]


export {
  DEFAULTS_VALUES,
  TEKLIF_TYPES,
  GLOSS_OPTIONS,
  CUR_TYPES,
  SIDE_OPTIONS,
  UNIT_TYPES,
  STATUS_TYPES,
  DEFAULT_WORK,
  TURN_OPTIONS
}
