import Fastify from "fastify"
import env from "dotenv"
import user_route from "./routes/user_routes"
import fastifyCookie from "fastify-cookie"
import path from "path"
import admin_routes from "./routes/admin_routes"
import multer from "fastify-multer"
import siswa_route from "./routes/siswa_routes"
import guru_route from "./routes/guru_routes"
import matpel_routes from "./routes/matpel_routes"
import kelas_routes from "./routes/kelas_routes"
import jadwal_routes from "./routes/jadwal_routes"
import walimurid_routes from "./routes/walimurid_routes"
import tugas_routes from "./routes/tugas_routes"
import notifikasi_routes from "./routes/notifikasi_routes"
import pengumuman_routes from "./routes/pengumuman_routes"
import pageconfig_route from "./routes/pageconfig_routes"
env.config()

const app = Fastify({
	logger: true,
})

app.register(multer.contentParser)
app.register(fastifyCookie)
// app.register(require("fastify-express"))
app.register(require("fastify-static"), {
	root: path.join(__dirname, "static/"),
})
app.register(require("fastify-cors"), {
	origin: "http://localhost:3000",
	credential: true,
})

//routes
app.register(user_route, {
	prefix: "/api",
})
app.register(admin_routes, {
	prefix: "/api",
})
app.register(siswa_route, {
	prefix: "/api",
})
app.register(guru_route, {
	prefix: "/api",
})
app.register(matpel_routes ,{
	prefix: "/api",
})
app.register(kelas_routes ,{
	prefix: "/api",
})
app.register(jadwal_routes ,{
	prefix: "/api",
})
app.register(walimurid_routes ,{
	prefix: "/api",
})
app.register(tugas_routes ,{
	prefix: "/api",
})
app.register(notifikasi_routes ,{
	prefix: "/api",
})
app.register(pengumuman_routes ,{
	prefix: "/api",
})

app.register(pageconfig_route, {
	prefix: "/api",
})

//listener
app.listen(process.env.PORT, () => {
	console.log(`Listen port 5000}`)
})
