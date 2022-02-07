import axios from "axios"

const ax = axios.create({
	baseURL: "http://5.181.217.215:6000/api",
	responseType: "json",
	withCredentials: true,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "POST, GET , DELETE , PUT , OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	},
})

export default ax
