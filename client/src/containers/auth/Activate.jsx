import Layout from "../../hocs/Layout";
import { useParams } from "react-router-dom";

import React from 'react'

const Activate = () => {
const params = useParams()

const uid = params.uid
const token = params.token

console.log(uid)
console.log(token)

  return (
    <Layout>Activate</Layout>
  )
}

export default Activate