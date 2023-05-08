import React, { useEffect, useState } from "react"
import axios from "axios"
import { useCSVDownloader } from "react-papaparse"

String.prototype.trToEn = function () {
  return this.replace("Ğ", "g")
    .replaceAll("Ü", "u")
    .replaceAll("Ş", "s")
    .replaceAll("I", "i")
    .replaceAll("İ", "i")
    .replaceAll("Ö", "o")
    .replaceAll("Ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
}

function Csv(props) {
  const { id, code, customer } = props
  const [csvData, setCsvData] = useState([])
  const { CSVDownloader, Type } = useCSVDownloader()
  const fileName = `${code}-${customer}`.replace(/\s+/g, "")

  const getData = async () => {
    const { data } = await axios.get(`/offers/${id}/csv`)
    setCsvData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  if (csvData) {
    return (
      <React.Fragment>
        {csvData.length ? (
          <CSVDownloader
            type={Type.Button}
            className="btn-green"
            filename={
              fileName.trToEn().toLocaleUpperCase("en-EN") || "machineDataNest"
            }
            bom={true}
            config={{
              delimiter: ";",
              header: false,
            }}
            data={csvData}
          >
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
                d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </CSVDownloader>
        ) : null}
      </React.Fragment>
    )
  }
}

export default Csv
