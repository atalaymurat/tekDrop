import React from "react"
import FormikControl from "../../formik/FormikControl"
import { FieldArray } from "formik"

const Dimensions = ({ works, name }) => {
  return (
    <div>
      <FieldArray name={name}>
        {({ insert, remove, push }) => (
          <div>
            {works.dimensions.length > 0 &&
              works.dimensions.map((dim, i) => (
                <div className="grid grid-cols-2 gap-2 py-2" key={"dim-" + i}>
                  <div className="grid grid-cols-2 gap-2">
                    <FormikControl
                      control="input"
                      type="text"
                      name={`${name}.${i}.width`}
                      label="En"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      name={`${name}.${i}.length`}
                      label="Boy"
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <FormikControl
                      control="input"
                      type="text"
                      name={`${name}.${i}.quanty`}
                      label="Adet"
                    />
                    <div className="col-span-2">
                      <FormikControl
                        control="input"
                        type="text"
                        name={`${name}.${i}.desc`}
                        label="Aciklama"
                      />
                    </div>
                    <div className="flex flex-shrink justify-end border text-xs p-0">
                      <FormikControl
                        control="checkbox"
                        name={`${name}.${i}.control`}
                        label="OK"
                      />
                    </div>

                    <div className="flex flex-row justify-center items-center">
                      {works.dimensions.length - i !== 1 ? (
                        <button
                          type="button"
                          tabIndex="-1"
                          onClick={() => {
                            if (window.confirm("Silme Islemini Onayliyormusun"))
                              remove(i)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="red"
                            className="w-8 h-8 ring-0"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      ) : (
                        <div className="grid grid-cols-2 items-center justify-center">
                          <button type="button" onClick={() => push()}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="green"
                              className="w-8 h-8 focus:ring-0"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          {works.dimensions.length > 1 && (
                            <button
                              type="button"
                              tabIndex="-1"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Silme Islemini Onayliyormusun"
                                  )
                                )
                                  remove(i)
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="red"
                                className="w-8 h-8 ring-0"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </FieldArray>
    </div>
  )
}

export default Dimensions
