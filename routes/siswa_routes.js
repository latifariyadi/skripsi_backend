import fastify from "fastify"
import { comparePassword, hashPassword } from "../libs/hash_services"
import prisma from "../prisma/connection"
import jwt from "jsonwebtoken"
import env from "dotenv"
import { authCheck, authSiswa } from "../middleware/authcheck"
env.config()

const siswa_route = async (sis = fastify(), options) => {
	//create siswa
	sis.post("/siswa_create", async (req, res) => {
		try {
			const data = await req.body

			//check siswa
			const check = await prisma.siswa.findUnique({
				where: { email: data.email },
			})

			if (check) {
				res.status(401).send({
					msg: "siswa sudah terdaftar",
				})
				return
			}

			const result = await prisma.siswa.create({
				data: {
					...data,
					password: hashPassword(data.password),
				},
			})

			res.status(201).send({
				msg: "berhasil membuat siswa",
				query: {
					...result,
					password: "secret",
				},
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//read siswa
	sis.get("/siswa_read", { preHandler: authSiswa }, async (req, res) => {
		try {
			const { page = 0, limit = 10 } = await req.query
			let skip = page * limit

			const result = await prisma.siswa.findMany({
				skip: parseInt(skip),
				take: parseInt(limit),
				select: {
					id: true,
					email: true,
					telp: true,
					alamat_lengkap: true,
					nis: true,
					kelas: true,
					walimurid: true,
				},
			})

			res.status(200).send({
				success: true,
				query: result,
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//login siswa
	sis.post("/siswa_login", async (req, res) => {
		try {
			const data = await req.body
			const checkSiswa = await prisma.siswa.findUnique({
				where: {
					email: data.email,
				},
			})

			if (!checkSiswa) {
				res.status(404).send({
					success: false,
					msg: "email siswa tidak ditemukan",
				})
				return
			}

			const comparePass = await comparePassword(
				data.password,
				checkSiswa.password
			)

			if (!comparePass) {
				res.status(404).send({
					success: false,
					msg: "password siswa salah",
				})
				return
			}

			//generated siswa token
			const token = await jwt.sign(
				{
					...checkSiswa,
					password: "secret",
				},
				process.env.SISWA_SECRET_KEY
			)

			res.cookie("_siswa", token, { httpOnly: true })
			res.status(200).send({
				success: true,
				token: token,
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//delete siswa => previleges admin
	sis.delete(
		"/siswa_delete/:id",
		{ preHandler: authCheck },
		async (req, res) => {
			try {
				const { id } = await req.params
				const result = await prisma.siswa.delete({
					where: {
						id: parseInt(id),
					},
				})
				res.status(201).send({
					success: true,
					msg: "berhasil delete data siswa",
				})
			} catch (error) {
				res.status(500).send({
					success: false,
					error: error.message,
				})
			}
		}
	)

	//update siswa
	sis.put("/siswa_update/:id", { preHandler: authSiswa }, async (req, res) => {
		try {
			const { id } = await req.params
			const data = await req.body
			const result = await prisma.siswa.update({
				where: {
					id: parseInt(id),
				},
				data: data,
			})

			if (!result) {
				res.status(500).send({
					success: false,
					msg: "terjadi kesalahan",
				})
				return
			}

			res.status(201).send({
				success: true,
				msg: "berhasil update data siswa",
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//siswa logout
	sis.post("/siswa_logout", async (req, res) => {
		try {
			res.clearCookie("_siswa")
			res.status(200).send({
				success: true,
				msg: "berhasil logout",
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})
}

export default siswa_route
