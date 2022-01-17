import ax from "./ax"

export const siswa_login = async (data) => {
	try {
		const result = await ax("/siswa_login", {
			method: "POST",
			data: data,
		})

		return result
	} catch (error) {
		return error
	}
}
