import React from "react"
import { DEFAULT_WORK } from "./defaultValues"

const WorkButtonGroup = ({ values, i, remove, push }) => {
  return (
    <>
      <div className="grid grid-cols-2">
        <button
          type="button"
          className="btn-submit"
          onClick={() => push({ ...DEFAULT_WORK, position: i + 2 })}
        >
          Yeni Is Tipi Ekle
        </button>
        {values.works.length > 1 && (
          <button
            type="button"
            className="btn-cancel"
            onClick={() => {
              if (window.confirm("Silme Islemini Onayliyormusun")) remove(i)
            }}
          >
            X
          </button>
        )}
      </div>
    </>
  )
}

export default WorkButtonGroup
