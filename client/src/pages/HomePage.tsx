import { TodoForm, TodoList } from "@components/Todo"

const Homepage = () => {
  return (
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
  )
}

export default Homepage
