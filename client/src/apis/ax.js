import axios from "axios"

const ax = axios.create({
	baseURL: "https://skripsi_latif_api.jvalleyserver.net/api",
	responseType: "json",
	// withCredentials: true,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": true,
	},
})

export default ax
