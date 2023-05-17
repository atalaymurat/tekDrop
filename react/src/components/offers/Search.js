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
        label: d.customer,
        value: d.customer,
      }))

      let uniqueList = _.uniqBy(filtered, "label").filter((f, i) => i < 5)
      console.log("BEFORE SORT ", uniqueList)

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
    console.log("KEY", e.key)
    console.log("TARGET", e.target)
    formikProps.setFieldValue("search", e.target.textContent)
    if (e.key === "Enter") {
      formikProps.submitForm()
      setSterm(e.target.textContent)
      setSuggestList([])
    }
  }

  return (
    <div className="my-2 py-4 px-8 border border-green-700">
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
                label="Ara..."
                autoFocus
              />
              <div className="my-1">
                {suggestList.map((s, i) => (
                  <div
                    className="py-1 focus:outline-none focus:font-bold"
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
