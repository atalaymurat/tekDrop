import React, { useEffect, useState } from "react"
import axios from "axios"
import CompanyForm from "../../components/companies/CompanyForm"
import CompanyList from "../../components/companies/CompanyList"
import NavMenu from "../../components/general/NavMenu"

const Index = () => {
  const [companies, setCompanies] = useState(null)
  const [company, setCompany] = useState(null)

  useEffect(() => {
    const getCompanies = async () => {
      const { data } = await axios.get(`/companies`)
      setCompanies(data)
    }
    getCompanies()
  }, [])


  const handleClick = (id) => {
    const reSetCompany = async (id) => {
      const { data } = await axios.get(`/companies/${id}`)
      setCompany(data)
    }
    reSetCompany(id)
  }

  if (!companies) return <div>Loading...</div>

  return (
    <React.Fragment>
      <div className="max-w-6xl mx-auto py-2 my-2">
      <NavMenu />
      <div className="max-w-6xl mx-auto flex">
        <CompanyForm
          selectedCompany={company}
          setSelectedCompany={setCompany}
          setCompanies={setCompanies}
          companies={companies}
        />
        <CompanyList setCompanies={setCompanies} companies={companies} handleClick={handleClick} />
        <pre>{/*JSON.stringify(companies, null, 2)*/}</pre>
      </div>
      </div>
    </React.Fragment>
  )
}

export default Index
