import React, { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import LoadingPage from "../pages/LoadingPage"
import LoginPage from "../pages/LoginPage"
import ProtectedPage from "../pages/ProtectedPage"

const Route_handler = () => {
	const [loading, setLoading] = useState(true)
	const [isLogin, setIsLogin] = useState(false)
	const navigate = useNavigate()
	useEffect(() => {
		;(async () => {
			let token = await sessionStorage.getItem("token")
			if (token) {
				setIsLogin(true)
				setLoading(false)
			} else {
				setLoading(false)
				navigate("/")
			}
		})()
	}, [])

	if (loading) {
		return <LoadingPage />
	}

	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	)
}

export default Route_handler
