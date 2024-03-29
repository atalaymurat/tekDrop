
import React, { useState, useEffect } from "react"
import ProductForm from "../../components/products/ProductForm"

const New = () => {

    return (
      <React.Fragment>
        <div className="max-w-5xl mx-auto flex flex-col justify-center">
          <p className="mx-auto">[product#new]</p>
          <ProductForm />

        </div>
      </React.Fragment>
    )
}

export default New
