import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ax from "../apis/ax"
import CardJadwal from "../components/CardJadwal"
import CardTugas from "../components/CardTugas"
import MobileMenu from "../components/MobileMenu"
import SiswaCard from "../components/SiswaCard"
import StaticsitcCard from "../components/StaticsitcCard"
import WallSiswa from "../components/WallSiswa"
import { decodeToken } from "react-jwt"
import LoadingPage from "./LoadingPage"

const Dashboard = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	const [siswaData, setSiswaData] = useState()

	useEffect(() => {
		ax("/pageconfig_dashboard", {
			method: "POST",
		})
			.then((result) => {
				if (result.status == 200) {
					setSiswaData(decodeToken(sessionStorage.getItem("token")))
					setLoading(false)
				}
			})
			.catch((err) => {
				navigate("/")
			})
	}, [])

	useEffect(() => {
		console.info(siswaData)
	}, [siswaData])

	if (loading) {
		return (
			<LoadingPage />
		)
	}

	return (
		<main className="w-screen min-h-screen bg-slate-50 flex flex-col">
			<MobileMenu />

			<div className="content_card flex flex-col p-4">
				<h1 className="text-gray-400 text-2xl font-light">Hai</h1>
				<h1 className="text-primary-dark text-2xl font-black">
					{siswaData?.nama_lengkap}
				</h1>
				<small className="text-gray-400 mt-1">SMK Grafika Yayasan Lektur</small>

				<SiswaCard nama_lengkap={siswaData.nama_lengkap} nis={siswaData.nis} />

				<StaticsitcCard />

				<CardTugas />

				<CardJadwal />
			</div>

			<WallSiswa />
		</main>
	)
}

export default Dashboard
