import React from "react"
import FormikControl from "../../formik/FormikControl"

const ProductionConditions = ({statusType}) => {
  return (
    <div>
      <div className="bg-yellow-400 px-4 py-8 mt-2 rounded-lg border w-full grid drid-cols-3 gap-1">
        <h1 className="col-span-3 text-center font-semibold">
          İmalat Bilgileri
        </h1>
        <FormikControl
          control="select"
          options={statusType}
          name={"status"}
          label="Status"
        />
        <FormikControl
          control="date"
          name={"startDate"}
          label="imalat başlangıç"
        />
        <FormikControl
          control="date"
          name={"finishDate"}
          label="imalat bitiş"
        />
      </div>
    </div>
  )
}

export default ProductionConditions
