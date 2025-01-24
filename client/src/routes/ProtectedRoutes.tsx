import { cookieGet } from "@/utils/cookieHash"
import { Navigate, Outlet, useLocation } from "react-router"

const ProtectedRoutes = () => {
  const token = cookieGet("token")
  const role = cookieGet("role")
  const { pathname } = useLocation()

  if (!token || !role) return <Navigate to="/auth/login" replace />
  if (!pathname.startsWith(`/${role}`))
    return <Navigate to={`/${role}`} replace />

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes
