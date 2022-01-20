import fastify from "fastify"
import { banner_uploads } from "../libs/uploads"
import prisma from "../prisma/connection"
import { authCheck } from "../middleware/authcheck"
import env from "dotenv"
env.config()


const tugas_routes = async (tugas = fastify(), Option)=>{
    
    //      TUGAS CREATE
    tugas.post("/tugas_create", {preHandler: banner_uploads.single("file"),
}, async (req, res)=>{
    try {
        const file = await req.file
        const data = await req.body

        const result = await prisma.tugas.create({
            data : {
                ...data,
                tugas_banner : {
                    create : {
                        filtename : file.filtename,
                        location : `/uploads/banner/${file.filtename}`,
                        url : process.env.HOST_URL
                    }
                }
            }
        })

        if(!result) {
            res.status(500).send({
                success : false,
                msg : "Gagal tambah tugas"
            })
            return
        }

        res.status(200).send({
            success :true,
            query : result,
            file : file
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            error : error.message
        })
      }
    })

    //          READ ALL TUGAS
    tugas.get("/tugas_read", {preHandler : authCheck} ,async(req, res)=>{
        try {
            const {page = 0, limit = 0} = await req.query
            
            let skip = page * limit
            const result = await prisma.tugas.findMany({
                take : limit,
                skip : skip
            })

            const count = await prisma.tugas.count()

            res.status(200).send({
                success : true,
                current_page : page,
                total_page : Math.ceil(count / parseInt(limit)),
                total_data : count,
                query : result
            })
        } catch (error) {
            res.status(500).send({
                success : false,
                error : error.message
            })
        }
    })

    //      DELETE TUGAS
    tugas.delete("/tugas_delete/:id",{preHandler : authCheck} ,async(req, res)=>{
        try {
            const {id} = await req.params
            const result = await prisma.tugas.delete({
                where : {
                    id : parseInt(id)
                }
            })       

            if(!result) {
                res.status(404).send({
                    success : false,
                    msg : "Data tidak ditemukan"
                })
                return
            }

            res.status(200).send({
                success : true,
                msg : "Berhasil delete data"
            })
        } catch (error) {
            res.status(500).send({
                success : false,
                msg  : error.message
            })
        }
    })

}


export default tugas_routes