import React, { useState } from "react"
import {
	AiOutlineUser,
	AiOutlineMessage,
	AiOutlineMail,
	AiOutlineRead,
	AiOutlineMenu,
	AiOutlineLogout,
} from "react-icons/ai"
import { siswa_logout } from "../apis/siswa_api"

const MobileMenu = () => {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<menu
			className={`bg-primary-dark text-white flex flex-col w-16 rounded-bl-xl h-[500px] fixed top-0 right-0 items-center  ${
				showMenu ? "translate-y-0" : "-translate-y-[450px]"
			} duration-200 shadow-md`}
		>
			{showMenu && (
				<>
					<div
						className="menu-items h-16 w-full flex justify-center items-center"
						onClick={() => {
							setShowMenu(!showMenu)
						}}
					>
						<AiOutlineUser />
					</div>
					<div
						className="menu-items h-16 w-full flex justify-center items-center"
						onClick={() => {
							setShowMenu(!showMenu)
						}}
					>
						<AiOutlineMessage />
					</div>
					<div
						className="menu-items h-16 w-full flex justify-center items-center"
						onClick={() => {
							setShowMenu(!showMenu)
						}}
					>
						<AiOutlineMail />
					</div>
					<div
						className="menu-items h-16 w-full flex justify-center items-center"
						onClick={() => {
							setShowMenu(!showMenu)
						}}
					>
						<AiOutlineRead />
					</div>
					<div
						className="menu-items h-16 w-full flex justify-center items-center"
						onClick={() => {
							// setShowMenu(!showMenu)
							siswa_logout()
						}}
					>
						<AiOutlineLogout />
					</div>
				</>
			)}
			<div
				className="menu-items h-16 w-full flex justify-center items-center mt-auto"
				onClick={() => {
					setShowMenu(!showMenu)
				}}
			>
				<AiOutlineMenu />
			</div>
		</menu>
	)
}

export default MobileMenu
