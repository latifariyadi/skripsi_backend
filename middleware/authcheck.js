import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()

export const authCheck = async (req, res, next) => {
	let ck = await req.cookies["_app"]
	if (!ck) {
		res.status(401).send({
			success: false,
			msg: "login dulu",
		})
		return
	}

	const verif = await jwt.verify(ck, process.env.ADMIN_SECRET_KEY)

	if (!verif) {
		res.status(401).send({
			success: false,
			msg: "login dulu",
		})
		return
	}

	next()
}

export const authSiswa = async (req, res, next) => {
	let ck = await req.cookies["_siswa"]
	if (!ck) {
		res.status(401).send({
			success: false,
			msg: "login dulu",
		})
		return
	}

	let verif = await jwt.verify(ck, process.env.SISWA_SECRET_KEY)

	if (!verif) {
		res.status(401).send({
			success: false,
			msg: "login siswa dulu",
		})
		return
	}

	next()
}
