import React from "react"
import { Field, ErrorMessage, useField } from "formik"
import TextError from "./TextError"

function Input(props) {
  const { label, name, ...rest } = props
  const [field, meta] = useField(props)
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <input
        className={`px-1 py-[4px] border text-gray-500 border-gray-300 rounded transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 ${
          meta.touched && meta.error ? "border-red-600 border-2" : null
        }`}
        id={name}
        {...field}
        {...props}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Input
