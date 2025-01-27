import { cookieGet } from "@/utils/cookieHash"
import { Navigate, Outlet } from "react-router"

const ProtectedRoutes = () => {
  const token = cookieGet("token")

  if (!token) return <Navigate to="/auth/login" replace />

  return (
    <>
      <Outlet />
    </>
  )
}

export default ProtectedRoutes
