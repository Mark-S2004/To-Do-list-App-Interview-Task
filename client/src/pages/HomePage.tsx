import { TodoForm, TodoList } from "@components/Todo"
import { useAppSelector } from "@/store"
import { selectUserName } from "@/store/loggedUserSlice"
import { useGetUserQuery } from "@/api/userApi"
import { cookieGet } from "@/utils/cookieHash"

const Homepage = () => {
  const userId = cookieGet("_id")
  useGetUserQuery(userId.toString())
  const userName = useAppSelector(selectUserName)

  return (
    <>
      <header>Welcome {userName}</header>
      <main>
        <TodoForm />
        <TodoList />
      </main>
    </>
  )
}

export default Homepage
