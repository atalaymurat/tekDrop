import React from "react"
import FormikControl from "../../formik/FormikControl"

const SalesConditions = () => {
  return (
    <div>
      <div className="bg-red-200 px-4 py-8 mt-2 rounded-lg w-full flex flex-col">
        <FormikControl
          control="input"
          type="text"
          name="salesConditions"
          label="Teslim Yeri"
        />
        <FormikControl
          control="textarea"
          type="text"
          name="paymentTerms"
          label="Ödeme Şekli"
        />
        <FormikControl
          control="input"
          type="text"
          name="deliveryDate"
          label="Teslim Süresi"
        />
        <FormikControl
          control="input"
          type="text"
          name="packaging"
          label="Paketleme"
        />
        <FormikControl
          control="input"
          type="text"
          name="warranty"
          label="Garanti Şartları"
        />
        <FormikControl
          control="textarea"
          type="text"
          name="infos"
          label="Bilgi"
        />
        <div className="mt-2 flex h-10">
          <FormikControl
            control="checkbox"
            name={"showTerms"}
            label="Sözleşme Şartlarını Göster"
          />
          <FormikControl
            control="checkbox"
            name={"noTotals"}
            label="Toplamları Gösterme"
          />
        </div>
      </div>
    </div>
  )
}

export default SalesConditions
