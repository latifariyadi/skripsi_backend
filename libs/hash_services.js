import bcrypt from "bcryptjs"
import env from "dotenv"
env.config()

const salt = bcrypt.genSaltSync(process.env.ADMIN_SECRET)

export const hashPassword = (pass) => {
	return bcrypt.hashSync(pass, salt)
}

export const comparePassword = (pass, dbpass) => {
	return bcrypt.compareSync(pass, dbpass)
}
