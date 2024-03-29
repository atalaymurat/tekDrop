import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import PaintForm from "../../components/paints/PaintForm"

function Edit() {
  const [paint, setPaint] = useState(null)
  let { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/paints/edit/${id}`)
      console.log("PAINT", data)
      setPaint(data)
    }
    getData()
  }, [id])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="font-bold text-4xl text-center my-2">Edit#Paint</div>
      <PaintForm paint={paint} />

      <pre>{JSON.stringify(paint, null, 4)}</pre>
    </div>
  )
}

export default Edit
