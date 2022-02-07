import axios from "axios"

const ax = axios.create({
	baseURL: "/api",
	responseType: "json",
	withCredentials: true,
})

export default ax
