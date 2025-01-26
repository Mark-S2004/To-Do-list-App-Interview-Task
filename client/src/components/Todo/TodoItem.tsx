import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/IconButton"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

import { ITodoItem } from "@/types/todo.types"
import { Stack } from "@mui/material"

interface Iprops {
  item: ITodoItem
}

function TodoItem({ item }: Iprops) {
  const handleEdit = (item: ITodoItem) => {
    console.log(item)
  }

  const handleDelete = (item: ITodoItem) => {
    console.log(item)
  }

  const handleToggle = () => {
    console.log(item)
  }

  return (
    <ListItem
      key={item.id}
      disablePadding
      secondaryAction={
        <Stack direction="row" spacing={2}>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => handleEdit(item)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDelete(item)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
    >
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>
    </ListItem>
  )
}
export default TodoItem
