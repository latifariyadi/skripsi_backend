import axios from "axios"

const ax = axios.create({
	baseURL: "http://0.0.0.0:6000/api",
	responseType: "json",
	withCredentials: true,
})

export default ax
