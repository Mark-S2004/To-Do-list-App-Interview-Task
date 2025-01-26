import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"

import { ITodoItem } from "@/types/todo.types"
import TodoItem from "./TodoItem"

interface Iprops {
  todoList: ITodoItem[]
}

function TodoList({ todoList }: Iprops) {
  return (
    <Container maxWidth="md">
      {!todoList.length ? (
        <Typography variant="h6" color="error">
          No Tasks today Wohoo !
        </Typography>
      ) : (
        <List>
          {todoList.map((item, index) => (
            <TodoItem key={index} item={item} />
          ))}
        </List>
      )}
    </Container>
  )
}

export default TodoList
