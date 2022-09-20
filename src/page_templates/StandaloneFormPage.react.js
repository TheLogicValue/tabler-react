// @flow
import * as React from "react"
export default function StandaloneFormPage({children, imageURL, page = ""}) {
  return (
    <div className={"page " + page}>
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="text-center mb-6">
                <img src={imageURL} className="h-6" alt="logo" />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}