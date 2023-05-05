import * as React from "react"
import { ForgotPasswordPage as TablerForgotPasswordPage } from "tabler-react"
const baseimages = process.env.PUBLIC_URL + process.env.REACT_APP_BASE_IMAGES
export default function ForgotPasswordPage() {
    return <TablerForgotPasswordPage imageURL={baseimages + "brand/tabler.svg"} />
}