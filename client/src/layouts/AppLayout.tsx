import { Suspense } from "react"
import { Outlet } from "react-router"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import ColorModeSelect from "@/components/shared-theme/ColorModeSelect"
import { ToastContainer } from "react-toastify"
import AppTheme from "@components/shared-theme/AppTheme"

const AppContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}))

const AppLayout = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AppContainer direction="column" justifyContent="space-between">
          <ColorModeSelect
            sx={{ position: "fixed", top: "1rem", right: "1rem" }}
          />
          <ToastContainer />
          <div>Interview Task</div>
          <Outlet />
          <div>Developed by Mark Saleh</div>
        </AppContainer>
      </AppTheme>
    </Suspense>
  )
}

export default AppLayout
