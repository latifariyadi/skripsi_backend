import fastify from "fastify"
import env from "dotenv"
import jwt from "jsonwebtoken"
import path from "path"
import { authCheck } from "../middleware/authcheck"
import prisma from "../prisma/connection"
import { banner_uploads } from "../libs/uploads"
import fs from "fs"
env.config()

const banner_tugas_route = async (bt = fastify(), options) => {
	bt.put(
		"/banner_tugas_update/:id",
		{ preHandler: banner_uploads.single("banner") },
		async (req, res) => {
			try {
				const { id } = await req.params
				const file = await req.file
				const findData = await prisma.tugas_banner.findUnique({
					where: { id: parseInt(id) },
				})
				const resut = await prisma.tugas_banner.update({
					where: { id: parseInt(id) },
					data: {
						filename: file.filename,
						location: `/uploads/banner/${file.filename}`,
						url: process.env.IMAGE_URL,
					},
				})

				//remove old file
				const removeOldFile = await fs.unlinkSync(
					path.join(__dirname, `../static/uploads/banner/${findData.filename}`)
				)

				res.status(201).send({
					success: true,
					msg: "success update banner",
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

export default banner_tugas_route
