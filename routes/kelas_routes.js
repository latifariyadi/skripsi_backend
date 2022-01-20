import festify from "fastify"
import prisma from "../prisma/connection"


const kelas_routes = async (kelas = festify(), Option) =>{

    //          CREATE KELAS
    kelas.post('/kelas_create', async (req, res) => {
        try {
            const data = await req.body
            const result = await prisma.kelas.create({
                data : {
                    ...data,
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



    //          READ ALL KELAS
    kelas.get("/kelas_read", async(req, res)=>{
        try {
            const { page = 0, limit = 10 } = await req.query

            let skip = page * limit

            const result = await prisma.kelas.findMany({
                skip : parseInt(skip),
                take : parseInt(limit)
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

    //          KELAS UPDATE
    kelas.put("/kelas_update/:id", async(req, res)=>{
        try {
            const  { id } = await req.params
            const data = await req.body
            const result = await prisma.kelas.update({
                where : {
                    id :  parseInt(id)
                },
                data : data
            })

            if(!result) {
                res.status(500).send({
                    success : false,
                    msg : "gagal update data kelas"
                })
                return
            }

            res.status(201).send({
                success :true,
                query : result
            })
        } catch (error) {
            res.status(500).send({
                success : false,
                error : error.message
            })
        }
    })

    //      KELAS DELETE
    kelas.delete("/kelas_delete/:id", async(req, res)=>{
        try {
            const { id } = await req.params
            const result = await prisma.kelas.delete({
                where : {
                    id : parseInt(id)
                }
            })
            res.status(201).send({
                success : true,
                msg : "Berhasil delete kelas"
            })
        } catch (error) {
            res.status(500).send({
                success : false,
                error : error.message
            })
        }
    })

    //      KELAS FIND ONE
    kelas.post("/kelas_find", async(req, res)=>{
        try {
            const {filter} = await req.body
            const result = await prisma.kelas.findUnique({
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


export default kelas_routes