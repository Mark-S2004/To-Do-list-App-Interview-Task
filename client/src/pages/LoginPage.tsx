import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { toast } from "react-toastify"
import Card from "@components/Card"

import { useLoginUserMutation } from "@/api/authApi"
import { useNavigate } from "react-router"
import { FormEvent, useEffect } from "react"
import { cookieStore } from "@/utils/cookieHash"

export default function LoginPage() {
  const navigate = useNavigate()
  const [loginData, { data: responseData, isSuccess }] = useLoginUserMutation()

  const [emailError, setEmailError] = React.useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("")
  const [passwordError, setPasswordError] = React.useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("")

  const emailPattern = /\S+@\S+\.\S+/

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (emailError || passwordError) {
      return
    }
    const data = new FormData(event.currentTarget)
    const email = data.get("email") as string
    const password = data.get("password") as string
    try {
      await loginData({ email, password }).unwrap()
    } catch (error) {
      toast.error(`An error occurred.\n${error.data.message} [${error.status}]`)
    }
  }

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement

    let isValid = true

    if (!email!.value || !emailPattern.test(email!.value)) {
      setEmailError(true)
      setEmailErrorMessage("Please enter a valid email address.")
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage("")
    }

    if (!password!.value || password!.value.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage("Password must be at least 6 characters long.")
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage("")
    }

    return isValid
  }

  useEffect(() => {
    if (responseData && isSuccess) {
      const { token, data } = responseData
      cookieStore("_id", data._id)
      cookieStore("token", token)
      navigate("/", { replace: true })
    }
  }, [responseData, isSuccess, navigate])

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
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
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Sign in
        </Button>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Card>
  )
}
