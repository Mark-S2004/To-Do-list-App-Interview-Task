import { Suspense } from "react"
import { Outlet } from "react-router"
import CircularProgress from "@mui/material/CircularProgress"

const AppLayout = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <div>Interview Task</div>
      <Outlet />
      <div>Developed by Mark Saleh</div>
    </Suspense>
  )
}

export default AppLayout
