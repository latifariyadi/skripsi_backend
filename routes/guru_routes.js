import fastify from "fastify"
import { hashPassword } from "../libs/hash_services"
import { authCheck } from "../middleware/authcheck"
import prisma from "../prisma/connection"

let faker_data_guru = [
	{
		nama_lengkap: "selastio fadli",
		email: "fadliselaz@gmail.com",
		password: "1qazxsw2",
		telp: "08121298987812",
		alamat_lengkap: "depok",
	},
	{
		nama_lengkap: "evalia rompas",
		email: "fadliselaz@gmail.com",
		password: "1qazxsw2",
		telp: "089887657668",
		alamat_lengkap: "jakarta",
	},
]

const guru_route = async (gr = fastify(), options) => {
	//guru create
	gr.post("/guru_create", async (req, res) => {
		try {
			const data = await req.body
			const result = await prisma.guru.create({
				data: {
					...data,
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
			const { page = 0, limit = 10 } = await req.query
			let skip = page * limit

			const result = await prisma.guru.findMany({
				skip : parseInt(skip),
				limit : parseInt(limit)
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
	gr.put("/guru_update/:id", async(req, res)=>{
		try {
			const {id} = await req.params
			const data = await req.body
			const result = await prisma.guru.update({
				where : {
					id : parseInt(id)
				},
				data : data
			})
			
			if(!result) {
				res.status(500).send({
					success : false,
					msg : "Gagal update data guru"
				})
				return
			}

			res.status(200).send({
				success : true,
				query : result
			})
		} catch (error) {
			res.status(500).send({
				success : false,
				error : error.message
			})
		}
	})

	//		GURU DELETE
	gr.delete("/guru_delete/:id", async(req, res)=>{
		try {
			const {id} = await req.params
			const result = await prisma.kelas.delete({
				where : {
					id : parseInt(id)
				}
			})
			res.status(201).send({
				success : true,
				msg :"Berhasil delete data guru"
			})
		} catch (error) {
			res.status(500).send({
				success : false,
				error : error.message
			})
		}
	})
}

export default guru_route
