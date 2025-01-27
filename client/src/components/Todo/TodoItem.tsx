import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/IconButton"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Stack } from "@mui/material"
import { TextField } from "@mui/material"

import { useState } from "react"
import { ITodoItem } from "@/types/todo.types"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/api/taskApi"
import { cookieGet } from "@/utils/cookieHash"

interface Iprops {
  item: ITodoItem
}

function TodoItem({ item }: Iprops) {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const userId = cookieGet("_id")
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedItem, setEditedItem] = useState({ ...item })

  const handleEdit = () => {
    setIsEditMode(true)
  }

  const handleSaveEdit = async () => {
    const { _id, ...taskData } = editedItem
    await updateTask({ userId, taskId: item._id!, taskData })
    setIsEditMode(false)
  }

  const handleDelete = async () => {
    await deleteTask({ userId: userId, taskId: item._id! })
  }

  const handleToggle = () => {
    console.log(item)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value })
  }

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Stack direction="row" spacing={2}>
          {isEditMode ? (
            <IconButton edge="end" aria-label="save" onClick={handleSaveEdit}>
              <CheckCircleIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
    >
      {isEditMode ? (
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <TextField
            name="title"
            value={editedItem.title}
            onChange={handleChange}
            variant="standard"
            fullWidth
          />
          <TextField
            name="description"
            value={editedItem.description}
            onChange={handleChange}
            variant="standard"
            fullWidth
          />
        </ListItemButton>
      ) : (
        <ListItemButton role={undefined} onClick={() => {}} dense>
          <ListItemIcon>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={item.title} secondary={item.description} />
        </ListItemButton>
      )}
    </ListItem>
  )
}
export default TodoItem
