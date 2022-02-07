import axios from "axios"

const ax = axios.create({
	baseURL: "http://5.181.217.215:6000/api",
	responseType: "json",
	withCredentials: true,
})

export default ax
