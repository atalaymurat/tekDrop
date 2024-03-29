import React, { useState } from "react"
import { glossText  } from "../../../lib/helpers"

const ItemsList = ({
  values,
  arrayHelpers,
  editIndex,
  setEditIndex,
  products,
}) => {
  const handleEdit = (index) => {
    setEditIndex(index)
  }

  const renderProduct = (products, id) => {
    const findProduct = products.find((p) => p._id === id)
    return findProduct
  }

  return (
    <div>
      {values.items.length > 0 &&
        values.items.map(
          (item, index) =>
            index !== values.items.length - 0 && (
              <div className="grid grid-cols-3 gap-1 border-b py-1" key={index}>
                <div className="flex flex-col w-full my-auto">
                  <div className="flex item text-xs font-light">
                    <div>Ürün</div>
                    <div className="ml-auto flex flex-col">
                      <div>{renderProduct(products, item.product)?.code}</div>
                      <div className="font-medium">{item.model}</div>
                    </div>
                  </div>
                  <div className="font-medium text-lg">
                    {renderProduct(products, item.product)?.name}
                  </div>
                  <div className="text-xs font-light">{item.desc}</div>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="mx-auto flex flex-col">
                    {item.length && (
                      <div className="text-xs font-light">Boy</div>
                    )}
                    <div className="text-xl font-bold">{item.length}</div>
                  </div>
                  <div className="mx-auto flex flex-col">
                    {item.width && <div className="text-xs font-light">En</div>}
                    <div className="text-xl font-bold">{item.width}</div>
                  </div>
                  <div className="mx-auto flex flex-col">
                    {item.quanty && (
                      <div className="text-xs font-light">Adet</div>
                    )}
                    <div className="text-xl font-bold">{item.quanty}</div>
                  </div>
                </div>
                <div className="grid grid-cols-4 my-auto">
                  <div className="flex flex-col text-sm">
                    <div className="font-semibold text-green-700">
                      {item.color}
                    </div>
                    <div className="font-medium">{item.side}</div>
                  </div>
                  <div className="flex flex-col text-sm">
                    <div>
                      {glossText(item.gloss)}
                    </div>
                    <div>{item.unit}</div>
                  </div>
                  <div className="flex flex-col text-sm my-auto">
                    <div className="text-xs">
                      {item.turnable === "true" ? "Dönebilir" : ""}
                    </div>
                    <div className="text-xs font-semibold">
                      {item.thickness}
                    </div>
                  </div>

                  <div className="mx-auto flex flex-col text-sm">
                    <button
                      className="border p-1 mb-1 text-center w-full bg-zinc-300"
                      type="button"
                      onClick={() => handleEdit(index)}
                    >
                      edit
                    </button>
                    <button
                      className="border p-1 w-full bg-red-600 text-white"
                      type="button"
                      onClick={() => {
                        if (window.confirm("Silme Islemini Onayliyormusun"))
                          arrayHelpers.remove(index)
                      }}
                    >
                      del
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  )
}

export default ItemsList
