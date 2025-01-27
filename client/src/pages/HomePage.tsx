import { TodoForm, TodoList } from "@components/Todo"
import { useAppSelector } from "@/store"
import { selectUserName } from "@/store/loggedUserSlice"
import { useGetUserQuery } from "@/api/userApi"
import { clearAllCookies, cookieGet } from "@/utils/cookieHash"
import { Button, Stack } from "@mui/material"
import { useLogOutUserMutation } from "@/api/authApi"
import { useNavigate } from "react-router"

const Homepage = () => {
  const navigate = useNavigate()
  const userId = cookieGet("_id")
  const token = cookieGet("token")
  const { data } = useGetUserQuery(userId.toString())
  const userName = useAppSelector(selectUserName)
  const [logoutUser] = useLogOutUserMutation()

  const handleLogout = async () => {
    await logoutUser({ user: data!.data, token: token.token })
    navigate("/auth/login", { replace: true })
    clearAllCookies()
  }

  return (
    <>
      <header>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <h2>Welcome {userName}</h2>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </header>
      <main style={{ flexGrow: 1 }}>
        <TodoForm />
        <TodoList />
      </main>
    </>
  )
}

export default Homepage
