import fastify from "fastify"
import { banner_uploads } from "../libs/uploads"
import prisma from "../prisma/connection"
import { authCheck } from "../middleware/authcheck"
import env from "dotenv"
import moment from "moment"
env.config()

const tugas_routes = async (tugas = fastify(), Option) => {
	//      TUGAS CREATE
	tugas.post(
		"/tugas_create",
		{ preHandler: banner_uploads.single("file") },
		async (req, res) => {
			try {
				const file = await req.file
				const data = await req.body

				const result = await prisma.tugas.create({
					data: {
						judul: data.judul,
						matapelajaran_id: parseInt(data.matapelajaran_id),
						kelas_id: parseInt(data.kelas_id),
						status: data.status,
						notif: data.notif == 1 ? true : false,
						materi: data.materi,
						akhir_kumpul: moment(data.akhir_kumpul).toDate(),
						link: data.link,
						tugas_banner: {
							create: {
								filename: file.filename,
								location: `/uploads/banner/${file.filename}`,
								url: process.env.IMAGE_URL,
							},
						},
					},
				})

				if (!result) {
					res.status(500).send({
						success: false,
						msg: "Gagal tambah tugas",
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

	//          READ ALL TUGAS
	tugas.post("/tugas_read", { preHandler: authCheck }, async (req, res) => {
		try {
			const { page = 0, limit = 10 } = await req.query

			const { filter } = await req.body

			let skip = page * limit

			if (!filter) {
				const result = await prisma.tugas.findMany({
					take: parseInt(limit),
					skip: parseInt(skip),
					where: filter,
				})
				const count = await prisma.tugas.count()

				res.status(200).send({
					success: true,
					current_page: page,
					total_page: Math.ceil(count / parseInt(limit)),
					total_data: count,
					query: result,
				})

				return
			}

			const result = await prisma.tugas.findMany({
				take: parseInt(limit),
				skip: parseInt(skip),
				include: {
					matapelajaran: {
						select: {
							id: true,
							nama: true,
						},
					},
					tugas_banner: {
						select: {
							id: true,
							filename: true,
							location: true,
							url: true,
						},
					},
				},
				where: filter,
			})
			const count = await prisma.tugas.count()

			res.status(200).send({
				success: true,
				current_page: page,
				total_page: Math.ceil(count / parseInt(limit)),
				total_data: count,
				query: result,
			})
			return
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//      DELETE TUGAS
	tugas.delete(
		"/tugas_delete/:id",
		{ preHandler: authCheck },
		async (req, res) => {
			try {
				const { id } = await req.params
				const result = await prisma.tugas.delete({
					where: {
						id: parseInt(id),
					},
				})

				if (!result) {
					res.status(404).send({
						success: false,
						msg: "Data tidak ditemukan",
					})
					return
				}

				res.status(201).send({
					success: true,
					msg: "Berhasil delete data",
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

export default tugas_routes
