import React from "react"
import { siswa_login, siswa_send_cookie } from "../apis/siswa_api"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo_sma.png"
import { Modal } from "antd"
import ax from "../apis/ax"

const LoginPage = () => {
	const navigate = useNavigate()
	const handleLogin = (e) => {
		e.preventDefault()
		ax("/siswa_login", {
			method: "POST",
			data: {
				email: e.target.email.value,
				password: e.target.password.value,
			},
		})
			.then((result) => {
				if (result) {
					// alert("login berhasil")
					sessionStorage.setItem("token", result.data.token)
					navigate("/dashboard")
				}
			})
			.catch((err) => {
				Modal.warning({
					title: err.response.data.msg,
				})
			})
	}

	return (
		<main className="w-screen min-h-screen bg-slate-100 flex flex-col p-8">
			<div className="flex flex-col gap-2 uppercase">
				<img src={logo} alt="" className="w-[80px]" />
				<h1 className="text-5xl font-black text-primary-dark">Sistem</h1>
				<h1 className="text-5xl font-black text-secondary-dark">Informasi</h1>
				<h1 className="text-5xl font-black text-success-dark">Akademik</h1>
				<h3 className=" text-gray-500 text-xl font-light">SMAN 12 OKU TIMUR</h3>
			</div>

			<div className="login_area flex flex-col mt-10" onSubmit={handleLogin}>
				<form action="" className="w-full flex flex-col gap-3">
					<div className="form_group flex flex-col gap-2">
						<label htmlFor="email" className="text-gray-400 capitalize">
							email
						</label>
						<input
							type="email"
							className="h-12 pl-4 text-gray-500 rounded-xl focus:ring-none focus:border-none active:border-none"
							id="email"
							name="email"
						/>
					</div>

					<div className="form_group flex flex-col gap-2">
						<label htmlFor="password" className="text-gray-400 capitalize">
							password
						</label>
						<input
							type="password"
							className="h-12 pl-4 text-gray-500 rounded-xl focus:ring-none focus:border-none active:border-none"
							id="password"
							name="password"
						/>
					</div>

					<button
						type="submit"
						className="h-12 bg-primary-dark text-white rounded-xl hover:bg-primary-medium"
					>
						login
					</button>
					<small className="text-gray-500 ml-auto mx-auto mt-4 cursor-pointer">
						belum punya akun ? register disini
					</small>
				</form>
			</div>
			<small className="mt-auto ml-auto mr-auto text-primary-dark">
				Created by Latif Aryadi
			</small>
		</main>
	)
}

export default LoginPage
