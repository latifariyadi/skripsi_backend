import fastify from "fastify"
import prisma from "../prisma/connection"
import env from "dotenv"
import { authCheck, authSiswa } from "../middleware/authcheck"
import jvalleySleep from "jvalley-sleep"
env.config()

const absensi_routes = async (abs = fastify(), options) => {
	abs.post(
		"/absensi_create",
		{
			preHandler: authCheck,
		},
		async (req, res) => {
			try {
				const data = await req.body
				const result = await prisma.absensi.create({
					data: {
						guru_id: parseInt(data.guru_id),
						matapelajaran_id: parseInt(data.matapelajaran_id),
						siswa_id: parseInt(data.siswa_id),
						jadwal_id: parseInt(data.jadwal_id),
					},
				})
				res.status(201).send({
					success: true,
					msg: "Absensi berhasil di tambahkan",
				})
			} catch (error) {
				res.status(500).send({
					success: false,
					error: error.message,
				})
			}
		}
	),
		abs.get("/absensi_read", async (req, res) => {
			try {
				const { page = 0, limit = 10 } = await req.query
				const skip = page * limit
				const result = await prisma.absensi.findMany({
					skip: parseInt(skip),
					take: parseInt(limit),
					include: {
						siswa: {
							select: {
								id: true,
								nama_lengkap: true,
							},
						},
						matapelajaran: {
							select: {
								id: true,
								nama: true,
							},
						},
						guru: {
							select: {
								id: true,
								nama_lengkap: true,
							},
						},
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
		}),
		abs.post(
			"/absensi_find",
			{
				preHandler: authCheck,
			},
			async (req, res) => {
				try {
					const { filter, keyword } = await req.body
					const result = await prisma.absensi.findMany({
						where: {
							[filter]: keyword,
						},
						include: {
							siswa: {
								select: {
									id: true,
									nama_lengkap: true,
								},
							},
							matapelajaran: {
								select: {
									id: true,
									nama: true,
								},
							},
							guru: {
								select: {
									id: true,
									nama_lengkap: true,
								},
							},
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
			}
		),
		abs.delete(
			"/absensi_delete/:id",
			{
				preHandler: authCheck,
			},
			async (req, res) => {
				try {
					const { id } = await req.params
					const result = await prisma.absensi.delete({
						where: {
							id: parseInt(id),
						},
					})
					res.status(201).send({
						success: true,
						msg: "berhasil delete data",
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

export default absensi_routes
