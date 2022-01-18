import React from "react"

const SiswaCard = ({
	banner = "https://images.pexels.com/photos/8657665/pexels-photo-8657665.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	avatar = "https://images.pexels.com/photos/2613330/pexels-photo-2613330.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
}) => {
	return (
		<div className="siswa_card w-full h-[300px] flex flex-col rounded-xl bg-white shadow-lg p-2 my-4">
			<div
				className={`cover flex w-full h-[54%] rounded-md bg-no-repeat object-cover  items-center p-2`}
				style={{
					backgroundImage: `url(${banner})`,
				}}
			>
				<div className="avatar flex-1">
					<img
						src={avatar}
						alt=""
						className="w-24 h-24 rounded-xl border-[6px] border-white box-border mt-[40%] object-cover"
					/>
				</div>

				<div className="kelas h-full flex items-end">
					<h1 className="text-white">kelas 1</h1>
				</div>
			</div>

			<div className="content_area flex p-4 mt-6 flex-col">
				<p className="text-gray-400 text-lg font-semibold">
					Bunga Selva Banati
				</p>
				<p className="text-lg text-gray-400 font-light">
					10123070127307091823808
				</p>
				<small className="text-[.6rem] text-gray-400">
					wali kelas : Ibu Rosita Angraini
				</small>
			</div>
		</div>
	)
}

export default SiswaCard
