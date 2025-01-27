import { FormEvent } from "react"
import { toast } from "react-toastify"

import Box from "@mui/material/Box"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import { Button, TextField } from "@mui/material"
import Card from "@components/Card"

import { useCreateTaskMutation } from "@/api/taskApi"
import { cookieGet } from "@/utils/cookieHash"

const TodoForm = () => {
  const [createTask] = useCreateTaskMutation()
  const userId = cookieGet("_id").toString()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = data.get("title") as string
    if (!title) {
      return
    }
    const description = data.get("description") as string

    try {
      await createTask({
        userId: userId,
        taskData: { title, description, dueDate: new Date() },
      }).unwrap()
    } catch (error) {
      toast.error(`An error occurred.\n${error.data.message} [${error.status}]`)
    }
    event.target.reset()
  }

  return (
    <Card variant="outlined">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <TextField
            id="title"
            type="text"
            name="title"
            placeholder="Task title"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <TextField
            name="description"
            placeholder="Task Description"
            type="text"
            id="description"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Add Task
        </Button>
      </Box>
    </Card>
  )
}
export default TodoForm
