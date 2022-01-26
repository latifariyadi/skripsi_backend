import festify from "fastify"
import prisma from "../prisma/connection"

const kelas_routes = async (kelas = festify(), Option) => {
	// CREATE KELAS
	kelas.post("/kelas_create", async (req, res) => {
		try {
			const data = await req.body
			const result = await prisma.kelas.create({
				data: {
					kelas: data.kelas,
					walikelas_id: parseInt(data.walikelas_id),
					sub_kelas: data.sub_kelas,
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

	//          READ ALL KELAS
	kelas.get("/kelas_read", async (req, res) => {
		try {
			const { page = 0, limit = 10 } = await req.query

			let skip = page * limit

			const result = await prisma.kelas.findMany({
				skip: parseInt(skip),
				take: parseInt(limit),
				orderBy: {
					sub_kelas: "asc",
				},
				select: {
					id: true,
					kelas: true,
					sub_kelas: true,
					walikelas: {
						select: {
							id: true,
							nama_lengkap: true,
						},
					},
					_count: true,
				},
			})

			const totalSiswa = await prisma.siswa.count()

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

	//          KELAS UPDATE
	kelas.put("/kelas_update/:id", async (req, res) => {
		try {
			const { id } = await req.params
			const data = await req.body
			const result = await prisma.kelas.update({
				where: {
					id: parseInt(id),
				},
				data: data,
			})

			if (!result) {
				res.status(500).send({
					success: false,
					msg: "gagal update data kelas",
				})
				return
			}

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

	//      KELAS DELETE
	kelas.delete("/kelas_delete/:id", async (req, res) => {
		try {
			const { id } = await req.params
			const result = await prisma.kelas.delete({
				where: {
					id: parseInt(id),
				},
			})
			res.status(201).send({
				success: true,
				msg: "Berhasil delete kelas",
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//      KELAS FIND ONE
	kelas.post("/kelas_find", async (req, res) => {
		try {
			const { filter } = await req.body
			const result = await prisma.kelas.findUnique({
				where: filter,
				include: {
					walikelas: {
						select: {
							id: true,
							nama_lengkap: true,
							matapelajaran: {
								select: {
									nama: true,
								},
							},
						},
					},
					siswa: {
						select: {
							id: true,
							nama_lengkap: true,
							nis: true,
							email: true,
						},
						orderBy: {
							nama_lengkap: "asc",
						},
					},
					tugas: true,
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
}

export default kelas_routes
