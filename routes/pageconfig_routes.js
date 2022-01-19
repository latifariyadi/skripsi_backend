import fastify from "fastify"
import { authSiswa } from "../middleware/authcheck"

const pageconfig_route = async (pc = fastify(), optioons) => {
	pc.post(
		"/pageconfig_dashboard",
		{ preHandler: authSiswa },
		async (req, res) => {
			try {
				res.status(200).send({
					success: true,
					msg: "selamat datang",
					siswa: req.siswa,
				})
			} catch (error) {
				res.status(500).send({
					success: false,
					error: error.message,
				})
			}
		}
	)
}

export default pageconfig_route
