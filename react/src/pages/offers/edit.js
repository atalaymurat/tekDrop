import React, { useEffect, useState } from "react"
import OfferForm from "../../components/OfferForm"
import { useParams } from "react-router-dom"
import axios from "axios"

function Edit() {
  const [offer, setOffer] = useState(null)
  let { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/offers/${id}`)
      setOffer(data)
    }
    getData()
  }, [id])

  return (
    <div>
      <div className="font-bold text-4xl text-center my-2">Edit#Show</div>
      <OfferForm  offer={offer}/>
    </div>
  )
}

export default Edit