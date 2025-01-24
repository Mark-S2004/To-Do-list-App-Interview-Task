import { lazy } from "react"
import { Route, Routes } from "react-router"

const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"))
const ErrorPage = lazy(() => import("@pages/ErrorPage"))
const AppLayout = lazy(() => import("@/layouts/AppLayout"))
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"))

import LoginPage from "@pages/LoginPage"
const RegisterPage = lazy(() => import("@pages/RegisterPage"))
const HomePage = lazy(() => import("@pages/HomePage"))
const ProfilePage = lazy(() => import("@pages/ProfilePage"))

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default AllRoutes
