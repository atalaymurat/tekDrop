import React, { useState, useEffect } from "react"
import PaintForm from "../../components/paints/PaintForm"

const New = () => {

    return (
      <React.Fragment>
        <div className="max-w-5xl mx-auto flex flex-col justify-center">
          <p className="mx-auto">[paint#new]</p>
          <PaintForm />

        </div>
      </React.Fragment>
    )
}

export default New
