import React from "react"
import { Link } from "react-router-dom"
import Csv from "../Csv"
import EditButton from "../buttons/EditButton"
import ShowButton from "../buttons/ShowButton"
import PackageButton from "../buttons/PackageButton"

const IndexIcons = ({ of, state }) => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-4 gap-1 justify-center items-center border-b w-max">
        <Link to={`/offer/${of._id}`} className="m-auto focus:outline-none" tabIndex={-1} state={state}>
          < ShowButton />
        </Link>
        <Link to={`/offer/edit/${of._id}`} className="mx-auto focus:outline-none" tabIndex={-1} >
          <EditButton />
        </Link>
        <Link to={`/package/${of._id}`} className="mx-auto focus:outline-none" tabIndex={-1}>
          <PackageButton />
        </Link>
        <Csv id={of._id} code={of.offerCode} customer={of.customer} />
      </div>
    </React.Fragment>
  )
}

export default IndexIcons
