import fastify from "fastify"
import { comparePassword, hashPassword } from "../libs/hash_services"
import { avatar_uploads } from "../libs/uploads"
import prisma from "../prisma/connection"
import jwt from "jsonwebtoken"
import env from "dotenv"
import { authCheck } from "../middleware/authcheck"
import path from "path"
import fs from "fs"
import moment from "moment"
env.config()

const admin_routes = async (ad = fastify(), options) => {
	//admin read
	ad.get("/admins_read", { preHandler: authCheck }, async (req, res) => {
		try {
			const { page = 0, limit = 10 } = await req.query
			let skip = page * limit
			const result = await prisma.admin.findMany({
				take: parseInt(limit),
				skip: parseInt(skip),
				select: {
					id: true,
					email: true,
					role: true,
					createdAt: true,
					updatedAt: true,
					avatar: {
						select: {
							filename: true,
							location: true,
							url: true,
						},
					},
				},
			})

			const count = await prisma.admin.count()

			res.status(200).send({
				success: true,
				current_page: page,
				total_page: Math.ceil(count / parseInt(limit)),
				total_data: count,
				query: result,
			})
		} catch (error) {
			res.status(500).send(error.message)
		}
	})

	//admin create
	ad.post(
		"/admin_create",
		{
			preHandler: avatar_uploads.single("avatar"),
		},
		async (req, res) => {
			try {
				const file = await req.file
				const data = await req.body

				const result = await prisma.admin.create({
					data: {
						email: data.email,
						password: hashPassword(data.password),
						role: data.role,
						avatar: {
							create: {
								filename: file.filename,
								location: `/uploads/avatars/${file.filename}`,
								url: process.env.HOST_URL,
							},
						},
					},
					select: {
						email: true,
						id: true,
						createdAt: true,
					},
				})

				if (!result) {
					res.send({
						success: false,
						msg: "gagal tambah user",
					})
					return
				}

				res.status(201).send({
					success: true,
					query: result,
					file: file,
				})
			} catch (error) {
				res.status(500).send({
					success: false,
					error: error.message,
				})
			}
		}
	)

	//admin login
	ad.post("/admin_login", async (req, res) => {
		try {
			const data = await req.body
			const result = await prisma.admin.findUnique({
				where: {
					email: data.email,
				},
			})

			if (!result) {
				res.status(404).send({
					success: false,
					msg: "email tidak ditemukan",
				})
				return
			}

			const verif = await comparePassword(data.password, result.password)

			if (!verif) {
				res.status(401).send({
					success: false,
					msg: "password salah",
				})
				return
			}

			let token = await jwt.sign(
				{
					app_name: "fastify",
					email: data.email,
					id: result.id,
					role: result.role,
				},
				process.env.ADMIN_SECRET_KEY
			)

			res.setCookie("_app", token, {
				// 1 hours
				expires: Date.now() + 60 * 360 * 1000,
				httpOnly: true,
			})

			res.status(200).send({
				msg: "login berhasil",
				token: token,
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				msg: error.message,
			})
		}
	})

	//admin delete
	ad.delete(
		"/admin_delete/:id",
		{ preHandler: authCheck },
		async (req, res) => {
			try {
				const { id } = await req.params
				const findAdmin = await prisma.admin.findUnique({
					where: { id: parseInt(id) },
					include: {
						avatar: true,
					},
				})
				const result = await prisma.admin.delete({
					where: {
						id: parseInt(id),
					},
				})

				if (!result) {
					res.status(404).send({
						success: false,
						msg: "data tidak ditemukan",
					})
					return
				}

				//remove old file
				const removeOldFile = await fs.unlinkSync(
					path.join(
						__dirname,
						`../static/uploads/avatars/${findAdmin.avatar.filename}`
					)
				)

				res.status(201).send({
					success: true,
					msg: "delete berhasil",
				})
			} catch (error) {
				res.status(500).send({
					success: false,
					msg: error.message,
				})
			}
		}
	)

	//admin logout
	ad.post("/admin_logout", async (req, res) => {
		try {
			//reset cookie
			res.cookie("_app", null, { expires: Date.now() })
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

	//admin update
	ad.put("/admin_update/:id", async (req, res) => {
		try {
			const { id } = await req.params
			const data = await req.body
			const findAdmin = await prisma.admin.findUnique({
				where: {
					id: parseInt(id),
				},
			})

			if (data.newPassword) {
				const compareOldNew = await comparePassword(
					data.oldPassword,
					findAdmin.password
				)
				if (!compareOldNew) {
					res.status(401).send({
						success: false,
						msg: "password salah",
					})
					return
				}

				let updateAmdmin = await prisma.admin.update({
					where: {
						id: parseInt(id),
					},
					data: {
						email: data.email,
						password: hashPassword(data.newPassword),
						role: data.role,
					},
				})

				res.status(201).send({
					success: true,
					msg: "Berhasil update data",
				})

				return
			}

			let updateAdmin = await prisma.admin.update({
				where: {
					id: parseInt(id),
				},
				data: {
					email: data.email,
					role: data.role,
				},
			})

			res.status(201).send({
				success: true,
				msg: "Berhasil update data",
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//admin find
	ad.post("/admin_find/:id", async (req, res) => {
		try {
			const { id } = await req.params
			const result = await prisma.admin.findUnique({
				where: { id: parseInt(id) },
				select: {
					id: true,
					role: true,
					email: true,
				},
			})
			if (!result) {
				res.status(404).send({
					success: false,
					msg: "data tidak ditemukan",
				})

				return
			}

			res.status(200).send({
				success: true,
				query: result,
			})
		} catch (error) {}
	})
}

export default admin_routes
