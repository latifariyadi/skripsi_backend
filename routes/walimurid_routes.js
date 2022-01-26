import festify from "fastify"
import prisma from "../prisma/connection"


const walimurid_routes = async (walimurid = festify(), Option) =>{


    //        CREATE WALI MURID 
    walimurid.post("/walimurid_create", async(req, res)=>{
        try {
            const data = await req.body
            const result = await prisma.walimurid.create({
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

    //      READ ALL WALI MURID
    walimurid.get("/walimurid_read", async(req, res)=>{
        try {
            const data = await req.body
            const {page = 0, limit = 10} = await req.query

            let skip = page * limit

            const result = await prisma.walimurid.findMany({
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


    //      UPDATE WALI MURID
    walimurid.put("/walimurid_update/:id", async(req, res)=>{
        try {
            const {id} = await req.params
            const data = await req.body
            const result = await prisma.walimurid.update({
                where : {
                    id : parseInt(id)
                },
                data : data
            })

            if(!result) {
                res.status(500).send({
                    success : false,
                    msg : "Gagal update data wali murid"
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


    //      DELETE WALI MURID
    walimurid.delete("/walimurid_delete/:id", async(req, res)=>{
        try {
            const {id} = await req.params
            const result = await prisma.walimurid.delete({
                where : {
                    id : parseInt(id)
                }
            })
            res.status(200).send({
                success : true,
                msg : "Berhasil delete wali murid"
            })
        } catch (error) {
            res.status(500).send({
                success : false,
                error : error.message
            })
        }
    })
}


export default walimurid_routes