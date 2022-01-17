import axios from "axios"

const ax = axios.create({
	// withCredentials: true,
	baseURL: "http://localhost:5000/api",
	responseType: "json",
})

export default ax
