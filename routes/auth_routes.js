import fastify from "fastify"
import env from "dotenv"
import jwt from "jsonwebtoken"
import { authCheck } from "../middleware/authcheck"
env.config()

const auth_routes = async (ar = fastify(), options) => {
	ar.get("/auth", { preHandler: authCheck }, async (req, res) => {
		try {
			const { _app } = await req.cookies

			if (!_app) {
				res.status(401).send({
					success: false,
					msg: "silakan login dulu",
				})
				return
			}

			let verifToken = await jwt.verify(_app, process.env.ADMIN_SECRET_KEY)

			if (!verifToken) {
				res.status(401).send({
					success: false,
					msg: "silakan login dulu",
				})
				return
			}

			res.status(200).send({
				success: true,
				msg: "authorized",
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})
}

export default auth_routes
