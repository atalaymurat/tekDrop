import React, { useState, useEffect } from "react"
import { PDFViewer } from "@react-pdf/renderer"
import PDFShow from "../../components/offers/PDFShow"
import { useParams, useLocation} from "react-router-dom"
import axios from "axios"

const PDF = () => {
  const [offer, setOffer] = useState(null)
  const { id } = useParams()
  const { state } = useLocation()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/offers/${id}`)
      setOffer(data)
    }
    getData()
  }, [id])

  if (offer) {
    return (
        <PDFViewer className="w-full min-h-screen">
          <PDFShow offer={offer} />
        </PDFViewer>
    )
  }
}

export default PDF
