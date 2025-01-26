import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import TodoItem from "./TodoItem"

import { selectTodoList } from "@/store/loggedUserSlice"
import { useAppSelector } from "@/store"

function TodoList() {
  const todoList = useAppSelector(selectTodoList)
  return (
    <Container maxWidth={false}>
      {!todoList?.length ? (
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
