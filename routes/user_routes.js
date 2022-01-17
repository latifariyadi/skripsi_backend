import fastify from "fastify"
import { avatar_uploads } from "../libs/uploads"
import { authCheck } from "../middleware/authcheck"

let data = [
	{
		id: 1,
		username: "fadliselaz",
	},
	{
		id: 2,
		username: "fadliselaz",
	},
	{
		id: 3,
		username: "fadliselaz",
	},
]

const user_route = async (ss = fastify(), options) => {
	ss.get(
		"/users_read",
		{
			preHandler: authCheck,
		},
		(req, res) => {
			res.send(data)
		}
	)

	ss.post("/user_login", (req, res) => {
		res.setCookie("_app", "1qazw23edcvfr4", {
			httpOnly: true,
			expires: Date.now() + 10000,
		})
		res.send({
			success: true,
			msg: "login berhasil",
		})
	})

	ss.get("/user_logout", (req, res) => {
		res.clearCookie("_app")
		res.send({ msg: "cookie clear" })
	})

	ss.post(
		"/upload",
		{ preHandler: [avatar_uploads.single("avatar"), authCheck] },
		async (req, res) => {
			try {
				const file = await req.file
				console.log(file)
				res.send({
					success: true,
				})
			} catch (error) {
				res.status(500).send({
					success: false,
					msg: error.message,
				})
			}
		}
	)
}

export default user_route
