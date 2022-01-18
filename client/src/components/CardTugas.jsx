import React from 'react'


const ContentCardTugas = ({
    pelajaran = "Ini adalah judul Tugas",
    deskripsi = "ini deskripsi tugas yang akan dibatasi sebanyak 100 char",
    image = "https://images.pexels.com/photos/1019470/abacus-mathematics-addition-subtraction-1019470.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    guru = "Bpk Selastio Fadli Rahman",
    date = "13 July 2022"
})=>{
    return (
        <div className="container_card_tugas w-full flex mt-4">

            <div className="head flex w-full gap-4">
                <img src={image} alt="" className='w-[80px] h-[80px] object-cover rounded-lg' />

                <div className="content_text flex flex-col w-full h-full flex-1">
                    <h1 className='text-md font-bold text-gray-500'>{pelajaran} </h1>
                    <p className='text-[.8rem] text-gray-400 break-words'>{deskripsi}</p>

                    <div className="guru mt-4 ">
                        <h3 className='text-[.8rem] text-gray-500'>{guru}</h3>
                        <p className='text-[.8rem] text-gray-400'>{date}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

const CardTugas = () => {
    return (
        <div className="siswa_card w-full h-auto flex flex-col rounded-xl bg-white shadow-lg p-4 my-2">
            <h1 className='text-2xl text-primary-dark font-bold'>Tugas Kamu</h1>

            <nav className="tugasMenu flex w-full justify-start gap-4 border-b-[.5px] border-b-gray-300 mt-2 h-8 select-none cursor-pointer">

                <div className="menu_item text-gray-400 hover:font-bold">
                    Semua
                </div>

                <div className="menu_item text-gray-400 hover:font-bold">
                    Terbaru
                </div>

                <div className="menu_item text-gray-400 hover:font-bold">
                    Terupdate
                </div>
            </nav>

            <ContentCardTugas />
            
        </div>
    )
}

export default CardTugas
