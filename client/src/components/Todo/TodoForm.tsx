import { FormEvent } from "react"

import Box from "@mui/material/Box"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import { Button, TextField } from "@mui/material"

import Card from "@components/Card"

const TodoForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.currentTarget.reset()
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
