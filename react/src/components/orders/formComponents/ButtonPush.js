import React from "react"

const ButtonPush = ({ arrayHelpers, className, defaultValues }) => {
  return (
    <button
      type="button"
      onClick={() => {
        arrayHelpers.push(defaultValues)
      }}
      className={className}
    >
      ekle
    </button>
  )
}

export default ButtonPush
