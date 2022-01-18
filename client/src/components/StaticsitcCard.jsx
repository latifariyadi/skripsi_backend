import React from 'react'

const StaticsitcCard = () => {
    return (
        <div className="siswa_card w-full h-auto flex flex-col rounded-xl bg-white shadow-lg p-4 my-2">
            <h1 className='text-2xl text-secondary-dark font-bold'>Statistik Kamu</h1>
            <p className='text-gray-400 text-sm'>Semester 1 Tahun ajaran 2021 - 2022</p>

            <div className="w-full flex flex-wrap justify-between mt-4 gap-4">

                <div className="top flex-1 flex gap-4 select-none">
                    <div className="card_item h-20 flex flex-col justify-center items-center flex-1 bg-primary-dark rounded-xl">
                        <h1 className='text-2xl font-bold text-white'>9</h1>
                        <p className='text-white text-sm'>Kehadiran</p>
                    </div>

                    <div className="card_item h-20 flex flex-col justify-center items-center flex-1 bg-secondary-dark rounded-xl">
                        <h1 className='text-2xl font-bold text-white'>9</h1>
                        <p className='text-white text-sm'>Kehadiran</p>
                    </div>

                    <div className="card_item h-20 flex flex-col justify-center items-center flex-1 bg-success-dark rounded-xl">
                        <h1 className='text-2xl font-bold text-white'>9</h1>
                        <p className='text-white text-sm'>Kehadiran</p>
                    </div>
                    
                </div>

                <div className="bottom flex-1 flex gap-4 select-none">

                    <div className="card_item h-20 flex flex-col justify-center items-center flex-1 bg-primary-dark rounded-xl">
                        <h1 className='text-2xl font-bold text-white'>9</h1>
                        <p className='text-white text-sm'>Kehadiran</p>
                    </div>

                    <div className="card_item h-20 flex flex-col justify-center items-center flex-1 bg-secondary-dark rounded-xl">
                        <h1 className='text-2xl font-bold text-white'>9</h1>
                        <p className='text-white text-sm'>Kehadiran</p>
                    </div>

                    <div className="card_item h-20 flex flex-col justify-center items-center flex-1 bg-success-dark rounded-xl">
                        <h1 className='text-2xl font-bold text-white'>9</h1>
                        <p className='text-white text-sm'>Kehadiran</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default StaticsitcCard
