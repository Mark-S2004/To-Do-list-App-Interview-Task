import React from "react"
import { Link, useNavigate } from "react-router"
import { motion } from "motion/react"
import { Button } from "@mui/material"

const ErrorPage: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.5 },
    },
  }

  const navigate = useNavigate()
  const goBack = () => navigate(-1) // Navigate back in history

  return (
    <div className="flex items-center justify-center h-screen text-2xl bg-gray-100">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-2 text-gray-800">Page not found</p>
        <p className="mt-4 text-gray-600">
          The page you are looking for does not exist or another error occurred.
        </p>
        <p className="mt-2 text-gray-600">
          You might want to head back to the homepage.
        </p>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          className="mt-6 mr-3 text-white font-semibold"
        >
          go to home page <span className="text-2xl">🏡</span>
        </Button>
        <Button
          onClick={goBack}
          variant="contained"
          color="primary"
          className="mt-6 text-white font-semibold"
        >
          Go to the previous page<span className="text-2xl">⏮️</span>
        </Button>
      </motion.div>
    </div>
  )
}

export default ErrorPage
