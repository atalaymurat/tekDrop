import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import IndexIcons from "../../components/IndexIcons"
import Search from "../../components/offers/Search"
import { differenceInDays } from "date-fns"

function Index() {
  const [offers, setOffers] = useState([])
  const [sterm, setSterm] = useState("")
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    console.log("INDEX USE EFFECT state", state)
    console.log("INDEX USE EFFECT sterm", sterm)
    const getDataFromState = async () => {
      if (state) {
        setSterm(state)
        const { data } = await axios.post("/search", { search: state })
        setOffers(data)
        navigate("/offer")
        console.log("INDEX USE EFFECT NAVIGATE RESET", state)
        return
      }
    }
    const getData = async () => {
      // navigate() --- location.state sıfırlamak için gerekiyor
      const { data } = await axios.get("/offers")
      setOffers(data)
    }

    if (state) {
      getDataFromState()
      return
    }

    getData()
  }, [])

  return (
    <div className="w-100 max-w-4xl mx-auto flex flex-col text-sm">
      <div className="font-bold text-4xl text-center my-2 grid grid-cols-1">
        Siparisler Index
      </div>
      <div>
        <Link to="/offer/new" tabIndex={-1} className="focus:outline-none">
          <button className="btn-green">
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
        <Link to="/" tabIndex={-1} className="focus:outline-none">
          <button className="btn-submit">
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </div>
      <Search setOffers={setOffers} setSterm={setSterm} sterm={sterm} />
      {sterm && (
        <div>
          Showing results for...{" "}
          <span className="text-sm text-green-700">{sterm}</span>
        </div>
      )}
      <div className="my-4">
        {offers.length > 0 &&
          offers.slice(0, 50).map((of, i) => (
            <div
              key={`of-${i}`}
              className={`grid grid-cols-12 font-medium uppercase 
              ${of.status && of.status === "imalat" ? "text-green-700" : null}
              ${of.status && of.status === "bitti" ? "text-stone-600" : null}
              ${of.status && of.status === "siparis" ? "text-blue-500" : null}
              ${
                of.status && of.status === "beklemede" ? "text-amber-500" : null
              }
              `}
            >
              <div className="px-2 py-2 border-b">{i + 1}</div>
              <div className="px-2 py-2 border-b col-span-2">
                {format(new Date(of.createdAt), "dd/MM/yyyy")}
                <br />
                {of.offerCode}
              </div>
              <div className="px-2 py-2 border-b col-span-5">
                <div>{of.customer}</div>
                <div className="text-xs font-light">
                  {of.startDate &&
                    differenceInDays(
                      of.finishDate ? new Date(of.finishDate) : new Date(),
                      new Date(of.startDate)
                    ) + " " + "gün"}
                </div>
              </div>
              <IndexIcons of={of} state={sterm} />
            </div>
          ))}
        {offers.length < 1 && (
          <div className="flex items-center justify-center h-full max-w-4xl mx-auto my-auto">
            Kayıt Bulunamdı....
          </div>
        )}
      </div>
      <pre className="bg-slate-200">
        {/* JSON.stringify(offers, null, " ") */}
      </pre>
    </div>
  )
}

export default Index
