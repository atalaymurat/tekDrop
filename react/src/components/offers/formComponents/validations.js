import * as Yup from "yup"

const VALIDATION_SCHEMA = Yup.object({
  offerType: Yup.string().required("Gerekli"),
  company: Yup.string().required("Gerekli"),
  kdv: Yup.number()
    .typeError("rakam giriniz veya boş bırakmak için 0")
    .min(0, "Minumum "),
  discount: Yup.number()
    .typeError("rakam giriniz vaye boş bırakmak için 0")
    .min(0, "Minumum "),

  works: Yup.array().of(
    Yup.object().shape({
      typeOfwork: Yup.string().max(40, "Daha Kısa ve Öz bir Başlık Dene"),
      price: Yup.object().shape({
        val: Yup.number()
          .typeError("rakam giriniz")
          .min(0, "Boş Bırakmak için (0)"),
        cur: Yup.string().required("Para Birimi Seçin"),
      }),
      unit: Yup.string().required("Gerekli"),
      dimensions: Yup.array().of(
        Yup.object().shape({
          length: Yup.number().typeError("rakam giriniz"),
          width: Yup.number().typeError("rakam giriniz"),
          quanty: Yup.number()
            .typeError("rakam giriniz")
            .min(1, "Minumum 1 adet")
            .required("Gerekli"),
        })
      ),
    })
  ),
})

export default VALIDATION_SCHEMA
