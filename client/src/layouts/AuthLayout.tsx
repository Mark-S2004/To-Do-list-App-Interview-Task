import React from "react"
import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <>
      Welcome, Guest!
      <Outlet />
    </>
  )
}

export default AuthLayout
