import * as Yup from "yup"

const VALIDATE_SCHEMA = Yup.object({
  company: Yup.string().required("Gerekli"),
  items: Yup.array().of(
    Yup.object().shape({
      product: Yup.string().required("Gerekli"),
      color: Yup.string().required("Gerekli"),
      quanty: Yup.number()
        .typeError("Rakam Giriniz")
        .min(1, "Minimum 1 adet")
        .required("Gerekli"),
    })
  ),
})

export default VALIDATE_SCHEMA
