import axios from "axios"
import React, { useEffect, useState } from "react"
import { localeDate } from "../../lib/helpers"
import { Link } from "react-router-dom"

function Index() {
  const [offers, setOffers] = useState([])
  const getData = async () => {
    const { data } = await axios.get("/offers")
    setOffers(data.reverse())
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="w-100 max-w-4xl mx-auto flex flex-col">
      <div className="font-bold text-4xl text-center my-2 grid grid-cols-1">
        Siparisler Index
      </div>
      <div>
        <Link to="/offer/new">
          <button className="btn-submit">Yeni Is Emri</button>
        </Link>
        <Link to="/">
          <button className="btn-submit">Giris</button>
        </Link>
      </div>
      <div className="my-4">
        {offers &&
          offers.map((of, i) => (
            <div key={`of-${i}`} className="bg-slate-100 grid grid-cols-12">
              <div className="px-2 py-2 border">{i + 1}</div>
              <div className="px-2 py-2 border col-span-2">
                {localeDate(of.createdAt)}
              </div>
              <div className="px-2 py-2 border col-span-5">{of.customer}</div>
              <div className="flex py-2 border justify-center col-span-4">
                <Link to={`/offer/${of._id}`} className="mx-auto">
                  <button className="btn-submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                  </button>
                </Link>
                <Link to={`/offer/edit/${of._id}`} className="mx-auto">
                  <button className="btn-purple">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </Link>
                <Link to={`/package/${of._id}`} className="mx-auto">
                  <button className="btn-purple">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                      />
                    </svg>:w3
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <pre className="bg-slate-200">{JSON.stringify(offers, null, " ")}</pre>
    </div>
  )
}

export default Index
