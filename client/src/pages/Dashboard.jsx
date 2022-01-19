import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ax from "../apis/ax"
import CardJadwal from "../components/CardJadwal"
import CardTugas from "../components/CardTugas"
import MobileMenu from "../components/MobileMenu"
import SiswaCard from "../components/SiswaCard"
import StaticsitcCard from "../components/StaticsitcCard"
import WallSiswa from "../components/WallSiswa"

const Dashboard = () => {
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

	return (
		<main className="w-screen min-h-screen bg-slate-50 flex flex-col">

			<MobileMenu />

		

			<div className="content_card flex flex-col p-4">

				<h1 className="text-gray-400 text-2xl font-light">Hai</h1>
				<h1 className="text-primary-dark text-2xl font-black">
					Bunga Selva Bananti
				</h1>
				<small className="text-gray-400 mt-1">SMK Grafika Yayasan Lektur</small>

				<SiswaCard />

				<StaticsitcCard />

				<CardTugas />

				<CardJadwal />
			</div>

			<WallSiswa />

		</main>
	)
}

export default Dashboard
