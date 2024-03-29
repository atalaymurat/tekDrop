import React, { useState } from "react"
import FormikControl from "../../components/formik/FormikControl"
import { Formik, Form } from "formik"
import axios from "axios"
const _ = require("lodash")

const Search = ({ setOffers, setSterm }) => {
  const [suggestList, setSuggestList] = useState([])

  const suggestions = async (searchText) => {
    if (searchText) {
      const { data } = await axios.post("/search", { search: searchText })

      const filtered = data.map((d) => ({
        label: d.company.title,
        value: d.company.title,
      }))

      let uniqueList = _.uniqBy(filtered, "label").filter((f, i) => i < 5)

      setSuggestList(uniqueList)
      return
    }
    setSuggestList([])
  }
  const handleChange = async (e) => {
    const { data } = await axios.post("/search", { search: e.target.value })
    setOffers(data)
    suggestions(e.target.value)
    setSterm(e.target.value)
  }
  const handleTabSelect = (formikProps, e) => {
    formikProps.setFieldValue("search", e.target.textContent)
    if (e.key === "Enter") {
      formikProps.submitForm()
      setSterm(e.target.textContent)
      setSuggestList([])
    }
  }

  return (
    <div className="my-2 py-4 px-2 border-2 border-purple-500 rounded-lg shadow-sm bg-pink-500">
      <Formik
        initialValues={{ search: "" }}
        onSubmit={async (values, { resetForm }) => {
          const { data } = await axios.post("/search", values)
          setOffers(data)
          setSuggestList([])
          setSterm(values.search)
          // resetForm()
        }}
      >
        {(formikProps) => {
          return (
            <Form autoComplete="off" onChange={handleChange}>
              <FormikControl
                control="input"
                type="text"
                name="search"
                label="Arama"
                autoFocus
                
              />
              <div className="my-1">
                {suggestList.map((s, i) => (
                  <div
                    className="py-1 focus:outline-none focus:font-bold text-white"
                    onKeyUp={(e) => handleTabSelect(formikProps, e)}
                    tabIndex="0"
                    key={i}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default Search
