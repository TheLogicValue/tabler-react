import * as React from "react"
import { Formik } from "formik"
import { LoginPage as TablerLoginPage } from "tabler-react"
const baseimages = process.env.REACT_APP_BASE_IMAGES

export default function LoginPage() {
  const initialValues = { email: "", password: "", }
  const validateFields = values => {
    const errors = {}
    if (!values.email)
      errors.email = "Required"
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      if (!values.password) errors.password = errors.email = "Invalid email address"
    return errors
  }

  const onSubmit = (values) => { alert("Done!") }

  return (
    <Formik initialValues={initialValues} validate={validateFields} onSubmit={onSubmit}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <TablerLoginPage
          onSubmit={handleSubmit}
          onChange={handleChange}
          onBlur={handleBlur}
          values={values}
          errors={errors}
          touched={touched}
          imageURL={baseimages + "brand/tabler.svg"}
        />
      )}
    />
  )
}