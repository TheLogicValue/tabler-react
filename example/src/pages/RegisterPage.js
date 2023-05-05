import * as React from "react"
import { RegisterPage as TablerRegisterPage } from "tabler-react"
const baseimages = process.env.REACT_APP_BASE_IMAGES
export default function RegisterPage() {
    return <TablerRegisterPage imageURL={baseimages + "brand/tabler.svg"} />
}