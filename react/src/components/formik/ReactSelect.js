import React from "react"
import Select from "react-select"
import { Field, ErrorMessage } from "formik"
import TextError from "./TextError"

function ReactSelect(props) {
  const { label, name, options, placeholder, isMulti, onChange,  ...rest } = props
  return (
    <div>
      <label htmlFor={name}>
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <Field id={name} name={name} {...rest}>
        {(props) => {
          const { field, form } = props
          return (
            <>
              <Select
                id={name}
                className="text-sm"
                value={
                  field.value
                    ? options.filter((o) => o.value === field.value)
                    : { value: "", label: "Seçiniz" }
                }
                 // onChange={(v) =>
                 // v
                 //   ? form.setFieldValue(field.name, v.value)
                 //   : form.setFieldValue(field.name, "")
                // }
                onChange={(selectedOption) => {
                  form.setFieldValue(field.name, selectedOption ? selectedOption.value : "");
                  // Call the custom onChange handler if provided
                  if (onChange && selectedOption !== null ) {
                    onChange(selectedOption);
                  }
                }}
                options={options}
                backspaceRemovesValue={true}
                isClearable
                isSearchable
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: 'hotpink',
                    primary: 'black',
                  },
                })}
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
