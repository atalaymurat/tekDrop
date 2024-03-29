import React from "react"

const RemoveWorkButton = ({ remove, i  }) => {
  return (
    <>
      <button
        type="button"
        className="btn-cancel"
        onClick={() => {
          if (window.confirm("Silme Islemini Onayliyormusun")) remove(i)
        }}
      >
        X
      </button>
    </>
  )
}

export default RemoveWorkButton
