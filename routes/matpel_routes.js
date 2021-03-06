import festify from "fastify"
import prisma from "../prisma/connection"

const matpel_routes = async (matpel = festify(), options) => {
	//      CREATE MATPEL
	matpel.post("/matpel_create", async (req, res) => {
		try {
			const data = await req.body

			const result = await prisma.matapelajaran.create({
				data: data,
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

	//      READ ALL MATPEL
	matpel.get("/matpel_read", async (req, res) => {
		try {
			const { page = 0, limit = 10 } = await req.query

			let skip = page * limit

			const result = await prisma.matapelajaran.findMany({
				skip: parseInt(skip),
				take: parseInt(limit),
				include: {
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
	})

	//      MATPEL UPDATE
	matpel.put("/matpel_update/:id", async (req, res) => {
		try {
			const { id } = req.params
			const data = await req.body
			const result = await prisma.matapelajaran.update({
				where: {
					id: parseInt(id),
				},
				data: data,
			})

			if (!result) {
				res.status(500).send({
					success: false,
					msg: "Gagal update data",
				})
				return
			}

			res.status(201).send({
				success: true,
				msg: "Berhasil udpate data",
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//      MATPEL DELETE
	matpel.delete("/matpel_delete/:id", async (req, res) => {
		try {
			const { id } = await req.params
			const result = await prisma.matapelajaran.delete({
				where: {
					id: parseInt(id),
				},
			})
			res.status(201).send({
				success: true,
				msg: "Berhasil delete matpel",
			})
		} catch (error) {
			res.status(500).send({
				success: false,
				error: error.message,
			})
		}
	})

	//      MATPEL FIND ONE
	matpel.post("/matpel_find", async (req, res) => {
		try {
			const { filter } = await req.body
			const result = await prisma.matapelajaran.findUnique({
				where: filter,
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

	//matpel search
	matpel.post("/matpel_search", async (req, res) => {
		try {
			const { filter } = await req.body
			if (filter.filter == "nama") {
				var result = await prisma.matapelajaran.findMany({
					where: {
						[filter.filter]: {
							contains: filter.keyword,
						},
					},
					include: {
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

				return
			}

			var result = await prisma.matapelajaran.findMany({
				where: {
					guru: {
						some: {
							nama_lengkap: {
								contains: filter.keyword,
							},
						},
					},
				},
				include: {
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
	})
}

export default matpel_routes
