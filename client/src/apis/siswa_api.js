import { useNavigate } from "react-router-dom"
import ax from "./ax"

export const siswa_login = async (data) => {
	try {
		const result = await ax("/siswa_login", {
			method: "POST",
			data: data,
			headers: {
				"Content-Type": "application/json",
				"Access-control-allow-origin": "*",
			},
		})

		return result
	} catch (error) {
		return error
	}
}

export const siswa_send_cookie = async () => {
	const result = await ax("/siswa_send_cookie", {
		method: "POST",
	})

	return result
}

export const siswa_logout = () => {
	ax("/siswa_logout", {
		method: "POST",
		withCredentials: true,
	}).then((result) => {
		window.location.href = "/"
		sessionStorage.clear()
	})
}
