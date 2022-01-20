import multer from "fastify-multer"
import path from "path"

//		AVATAR UPLOADS
const avatar_storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../static/uploads/avatars"))
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "_avatar." + file.mimetype.split("/")[1])
	},
})

//	BANNER UPLOADS
const banner_storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../static/uploads/banner"))
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "_banner." + file.mimetype.split("/")[1])
	},
})

export const avatar_uploads = multer({
	storage: avatar_storage,
	limits: {
		fileSize: 10000000,
	},
})
export const banner_uploads = multer({
	storage: banner_storage,
	limits: {
		fileSize: 10000000,
	},
})
