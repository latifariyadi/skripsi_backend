import festify from "fastify"
import prisma from "../prisma/connection"


const notifikasi_routes = async (notifikasi = festify(), Option) => {

    //      CREATE NOTIFIKASI
    notifikasi.post("/notifikasi_create", async(req, res)=>{
        try {
            const data = await req.body
            const result = await prisma.notifikasi.create({
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


    //      READ ALL NOTIFIKASI
    notifikasi.get("/notifikasi_read", async(req, res)=>{
        try {
            const data = await req.body
            const {page = 0, limit =10} = await req.query

            let skip = page * limit

            const result = await prisma.notifikasi.findMany({
                skip : parseInt(skip),
                limit : parseInt(limit)
            })
            res.status(200).send({
                success : true,
                query : result
            })
        } catch (error) {
            res.status(500).send({
                success :false,
                error : error.message
            })
        }
    })

    //      UPDATE NOTIFIKASI
    notifikasi.put("/notifikasi_update/:id", async(req, res)=>{
        try {
            const {id} = await req.params
            const data = await req.body
            const result = await prisma.notifikasi.update({
                where : {
                    id : parseInt(id)
                },
                data : data
            })


            if(!result){
                res.status(500).send({
                    success : false,
                    msg : "Gagal update notifikasi"
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

    //      DELETE NOTIFIKASI
    notifikasi.delete("/notifikasi_delete/:id", async(req, res)=>{
        try {
            const {id} = await req.params
            const result = await prisma.notifikasi.delete({
                where : {
                    id : parseInt(id)
                }
            })
            
            res.status(200).send({
                success :true,
                msg : "Berhasil delete notifikasi"
            })
        } catch (error) {
            res.status(500).send({
                success : false,
                error : error.message
            })
        }
    })

}


export default notifikasi_routes