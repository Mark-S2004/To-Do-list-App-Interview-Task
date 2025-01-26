import { TodoForm, TodoList } from "@components/Todo"
import { useAppSelector } from "@/store"
import { selectUserName } from "@/store/loggedUserSlice"

const Homepage = () => {
  const userName = useAppSelector(selectUserName)
  return (
    <>
      <header>Welcome {userName}</header>
      <main>
        <TodoForm />
        <TodoList
          todoList={[
            {
              title: "Clean car",
              description: "my car is not clean",
              dueDate: new Date(2025, 2, 15),
            },
          ]}
        />
      </main>
    </>
  )
}

export default Homepage
