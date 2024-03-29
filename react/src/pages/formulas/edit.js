import React, { useEffect, useState } from "react"
import FormulaForm from "../../components/formulas/FormulasForm"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Edit() {
  const [formula, setFormula] = useState(null)
  let { id } = useParams()
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (window.confirm("Silme Islemini Onayliyormusun")) {
      await axios.delete(`/formulas/${id}`)
      navigate("/formulas")
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/formulas/edit/${id}`)
      setFormula(data)
    }
    getData()
  }, [id])

  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <div className="font-bold text-4xl text-center my-2">Edit#{id}</div>
      <FormulaForm formula={formula} />

      <button
        type="button"
        onClick={handleDelete}
        className="btn-cancel mt-4 mb-4"
      >
        Kaydı Sil
      </button>
    </div>
  )
}

export default Edit
