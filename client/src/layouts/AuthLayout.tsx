import React from "react"
import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <>
      <h2>Welcome, Guest!</h2>
      <Outlet />
    </>
  )
}

export default AuthLayout
