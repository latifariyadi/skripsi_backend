import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ax from "../apis/ax"

const ProtectedPage = ({ children }) => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		ax("/pageconfig_dashboard", {
			method: "POST",
		})
			.then((result) => {
				if (result.status == 200) {
					setLoading(false)
				}
			})
			.catch((err) => {
				navigate("/")
			})
	}, [])

	if (loading) {
		return (
			<main className="w-screen min-h-screen bg-slate-100 flex flex-col p-8">
				<h1>loading</h1>
			</main>
		)
	}

	return <>{children}</>
}

export default ProtectedPage
