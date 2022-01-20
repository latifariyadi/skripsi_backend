import festify from "fastify"
import prisma from "../prisma/connection"


const pengumuman_routes = async (pengumuman = festify(), Option) =>{

    //      PRNGUMUMAN CREATE
    pengumuman.post("/pengumuman_create", async(req, res)=>{
        try {
            const data = await req.body
            const result = await prisma.pengumuman.create({
                data : {
                    ...data
                }
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


    //      READ ALL PENGUMUMAN
    pengumuman.get("/pengumuman_read", async(req, res)=>{
        try {
            const data = await req.body
            const  {page = 0, limit = 10} = await req.query

            let skip = page * limit
            const result = await prisma.pengumuman.findMany({
                skip : parseInt(skip),
                limit : parseInt(limit)
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


export default pengumuman_routes