import axios from "axios"

const ax = axios.create({
	baseURL: "https://skripsi_latif_api.jvalleyserver.net/api",
	responseType: "json",
	withCredentials: true,
})

export default ax
