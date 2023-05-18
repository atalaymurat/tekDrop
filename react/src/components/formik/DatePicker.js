import React from "react"
import DateView from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Field, ErrorMessage } from "formik"
import TextError from "./TextError"

const DatePicker = (props) => {
  const { label, name, ...rest } = props
  const dateForm = (d) => {
    let dd = Date.parse(d)
    return dd
  }

  return (
    <div className="border flex flex-col items-center justify-center">
      <label htmlFor={name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <div>
        <Field name={name} className="focus:outline-none">
          {({ form, field }) => {
            const { setFieldValue } = form
            const { value } = field
            return (
              <DateView
                id={name}
                dateFormat="dd-MM-yyyy"
                {...field}
                {...rest}
                selected={dateForm(value)}
                onChange={(val) => setFieldValue(name, val)}
              />
            )
          }}
        </Field>
        <ErrorMessage name={name} component={{ TextError }} />
      </div>
    </div>
  )
}

export default DatePicker
