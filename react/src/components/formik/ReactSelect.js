import React from "react"
import Select from "react-select"
import { Field, ErrorMessage, useField } from "formik"
import TextError from "./TextError"

function ReactSelect(props) {
  const { label, name, options, placeholder, isMulti, ...rest } = props
  return (
    <div>
      <label htmlFor={name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <Field id={name} name={name} {...rest}>
        {(props) => {
          const { field, form, meta } = props
          return (
            <>
              <Select
                options={options}
                value={
                  field.value ?
                  options.filter((o) => o.value === field.value._id)[0]:
                  { label: "", value: "" }
                }
                onChange={(v) => form.setFieldValue(field.name, v)}
                className="react-select-container text-zinc-800 text-sm"
                classNamePrefix="react-select"
                backspaceRemovesValue={true}
                isMulti={isMulti}
                placeholder={placeholder}
                isClearable
              />
            </>
          )
        }}
      </Field>

      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default ReactSelect
