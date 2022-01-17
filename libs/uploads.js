import multer from "fastify-multer"
import path from "path"

const avatar_storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../static/uploads/avatars"))
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "_avatar." + file.mimetype.split("/")[1])
	},
})

export const avatar_uploads = multer({
	storage: avatar_storage,
	limits: {
		fileSize: 10000000,
	},
})
