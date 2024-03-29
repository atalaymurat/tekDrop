import React from "react"
import { Link } from "react-router-dom"
import Search from "../companies/Search"

const CompanyList = ({ companies, handleClick, setCompanies }) => {
  return (
    <React.Fragment>
      <div className="w-full max-w-xl flex flex-col mx-2 my-2 px-1 py-2">
        <Search setCompanies={setCompanies} />
        {companies.length === 0 && (
          <div className="text-center text-gray-500">Kayıtlı bir Firma Bulunamadı...</div>
        )}
        {companies.map((co) => (
          <div
            key={co._id}
            className="border border-gray-200 px-2 py-1 my-[1px] cursor-pointer text-sm"
          >
            <div className="flex flex-row">
              <div className="font-medium mr-2"></div>
              <div className="truncate">{co?.title}</div>
              <div className="ml-2 font-medium capitalize text-gray-700">
                {co?.addresses[0]?.city}
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => handleClick(co?._id)}
                  className="btn-small"
                >
                  edit
                </button>
                <Link to={`/company/${co?._id}`}>
                  <button className="btn-small">Show</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default CompanyList
