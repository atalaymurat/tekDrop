import React from "react"

const SaveButtons = ({ handleDelete, offer }) => {
  return (
    <>
      <button type="submit" className="btn-submit mt-4 mb-8">
        Kaydet
      </button>
      {offer && (
        <button
          type="button"
          onClick={handleDelete}
          className="btn-cancel mt-4 mb-8"
        >
          Sil
        </button>
      )}
    </>
  )
}

export default SaveButtons
