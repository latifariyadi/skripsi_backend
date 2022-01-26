import fastify from "fastify"
import { comparePassword, hashPassword } from "../libs/hash_services"
import { authCheck } from "../middleware/authcheck"
import prisma from "../prisma/connection"

const guru_route = async (gr = fastify(), options) => {
	//guru create
	gr.post("/guru_create", async (req, res) => {
		try {
			const data = await req.body
			const result = await prisma.guru.create({
				data: {
					...data,
					matapelajaran_id: parseInt(data.matapelajaran_id),
					password: hashPassword(data.password),
				},
			})

			res.status(201).send({
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

	//guru read
	gr.get("/guru_read", async (req, res) => {
		try {
			const result = await prisma.guru.findMany({
				orderBy: { id: "desc" },
				select: {
					id: true,
					nama_lengkap: true,
					telp: true,
					alamat_lengkap: true,
					email: true,
					matapelajaran: true,
					kelas: {
						select: {
							kelas: true,
							sub_kelas: true,
						},
					},
					createdAt: true,
					updatedAt: true,
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

	//		UPDATE GURU
	gr.put("/guru_update/:id", async (req, res) => {
		try {
			const { id } = await req.params
			const data = await req.body

			if (data.change_password) {
				let checkOldPassword = await prisma.guru.findUnique({
					where: {
						id: parseInt(id),
					},
				})

				if (!data.change_password.new_password) {
					res.status(401).send({
						success: false,
						msg: "Silakan isi password barunya",
					})
					return
				}

				let verifPassword = await comparePassword(
					data.change_password.old_password,
					checkOldPassword.password
				)

				if (!verifPassword) {
					res.status(401).send({
						success: false,
						msg: "password lama salah",
					})
					return
				}

				const result = await prisma.guru.update({
					where: {
						id: parseInt(id),
					},
					data: {
						...data.data,
						password: hashPassword(data.change_password.new_password),
					},
				})

				if (!result) {
					res.status(500).send({
						success: false,
						msg: "Gagal update data guru",
					})
					return
				}

				res.status(200).send({
					success: true,
					query: result,
				})
			} else {
				const result = await prisma.guru.update({
					where: {
						id: parseInt(id),
					},
					data: data.data,
				})

				if (!result) {
					res.status(500).send({
						success: false,
						msg: "Gagal update data guru",
					})
					return
				}

				res.status(200).send({
					success: true,
					query: result,
				})
			}
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//		GURU DELETE
	gr.delete("/guru_delete/:id", async (req, res) => {
		try {
			const { id } = await req.params
			const result = await prisma.guru.delete({
				where: {
					id: parseInt(id),
				},
			})

			if (!result) {
				res.status(404).send({
					success: false,
					msg: "gagal delete guru",
				})
				return
			}

			res.status(201).send({
				success: true,
				msg: "Berhasil delete data guru",
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//GURU FIND
	gr.post("/guru_find", async (req, res) => {
		try {
			const { filter } = await req.body
			if (!filter) {
				res.status(404).send({
					success: false,
					msg: "silakan isi filter",
				})
				return
			}

			const result = await prisma.guru.findMany({
				where: filter,
				include: {
					matapelajaran: {
						select: {
							id: true,
							nama: true,
						},
					},
				},
				orderBy: {
					id: "desc",
				},
			})

			if (!result.length) {
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
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})
}

export default guru_route
