import React from "react"
import { Routes, Route } from "react-router-dom"
import LoginPage from "../pages/LoginPage"

const Route_handler = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
		</Routes>
	)
}

export default Route_handler
