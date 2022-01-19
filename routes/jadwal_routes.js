import festify from "fastify"
import prisma from "../prisma/connection"

const jadwal_routes = async (jadwal = festify(), Option) =>{

    //      CREATE JADWAL
    jadwal.post("/jadwal_create", async(req, res)=>{
        try {
            const data = await req.body
            const result = await prisma.jadwal.create({
                data : {
                    ...data
                }
            })

            res.status(201).send({
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

    //       READ ALL JADWAL
    jadwal.get("/jadwal_read", async(req, res)=>{
        try {
            const data = await req.body
            const { page = 0, limit = 10} = await req.query

            let skip = page * limit

            const result = await prisma.jadwal.findMany({
                skip : parseInt(skip),
                limit : parseInt(limit)
            })

            const count = await prisma.jadwal.count()

            res.status(200).send({
                success : true,
                query : result,
                current_page : page,
                total_page : Math.ceil(count / parseInt(limit)),
                total_data : count
            })
        } catch (error) {
            res.status(500).send({
                success : false,
                error : error.message
            })
        }
    })

    //      JADWAL UPDATE
    jadwal.put("/jadwal_update/:id", async(req, res)=>{
        try {
            const { id } = await req.params
            const data = await req.body
            const result = await prisma.jadwal.update({
                where : {
                    id : parseInt(id)
                },
                data : data
            })

            if(!result) {
                res.status(500).send({
                    success : false,
                    msg : "Kesalahan saat update data jadwal"
                })
                return
            }

            res.status(201).send({
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

    //      JADWAL DELETE
    jadwal.delete("/jadwal_delete/:id", async(req, res)=>{
        try {
            const {id} = await req.params
            const result = await prisma.jadwal.delete({
                where : {
                    id : parseInt(id)
                }
            })

            res.status(200).send({
                success : true,
                msg : "Berhasil delete jadwal"
            })
        } catch (error) {
            res.status(500).send({
                success : false,
                error : error.message
            })
        }
    })

    //      JADWAL FIND
    jadwal.post("/jadwal_find", async(req, res)=>{
        try {
            const {filter} = await req.body
            const result = await prisma.jadwal.findUnique({
                where : filter
            })

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

}


export default jadwal_routes