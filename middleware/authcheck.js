import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()

export const authCheck = (req, res, next) => {
	let ck = req.cookies["_app"]
	if (!ck) {
		res.status(401).send({
			success: false,
			msg: "login dulu",
		})
		return
	}

	const verif = jwt.verify(ck, process.env.ADMIN_SECRET_KEY)

	if (!verif) {
		res.status(401).send({
			success: false,
			msg: "login dulu",
		})
		return
	}

	next()
}

export const authSiswa = (req, res, next) => {
	let ck = req.cookies["_siswa"]
	if (!ck) {
		res.status(401).send({
			success: false,
			msg: "login dulu",
		})
		return
	}

	let verif = jwt.verify(ck, process.env.SISWA_SECRET_KEY)

	if (!verif) {
		res.status(401).send({
			success: false,
			msg: "login siswa dulu",
		})
		return
	}

	req.siswa = jwt.decode(ck)

	next()
}
