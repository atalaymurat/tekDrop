import React, { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"
import { Link } from "react-router-dom"

function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getData = async () => {
    try {
      setLoading(true)
      const dt = await axios.get("/offers")
      setData(dt.data)
      setError(null)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setData(null)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="min-h-screen w-full bg-gray-500  bg-forest bg-cover py-4">
      <div className="my-2 border p-4 bg-slate-900">
        <h1 className="text-5xl text-center font-extrabold text-white">
          <span className="text-xs mx-4 font-light">[home]</span>
          Drop Ahşap
        </h1>
      </div>
      <div className="px-4">
        <Link to="/offer">
          <button className="btn-amber">Sipariş Liste</button>
        </Link>
        <Link to="/liste">
          <button className="btn-amber">Fiyat Liste</button>
        </Link>
      </div>
      <div className="border border-amber-400 h-[300px] mx-auto p-4">
        <div className="flex flex-col h-full">
          {loading && <div>Loading...</div>}
          {error && <div>{JSON.stringify(error)}</div>}
          <div className="text-9xl opacity-90 font-black m-auto text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-yellow-400 via-gray-900 to-black">
            DROPtech
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
