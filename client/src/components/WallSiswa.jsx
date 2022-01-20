import React from 'react'
import { Carousel } from 'antd'

const WallSiswa = () => {
    return (
        <div className="siswa_card w-full h-auto flex flex-col bg-primary-medium shadow-lg p-4 my-2 rounded-t-3xl">

            <div className="content_text px-4">
            <h1 className='text-2xl text-white font-bold'>Wall Siswa</h1>
            </div>

            <div className="content_wall_siswa  p-2 rounded-t-xl mt-4">
                <Carousel className='w-full h-full bg-white shadow-md rounded-lg'>

                    <div className=" flex w-full flex-col justify-center items-center h-[400px]">
                        <div className="car_content flex p-2 gap-4">
                            <div className="cc_left">
                                <img src="https://images.pexels.com/photos/10513680/pexels-photo-10513680.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className='w-[40px] h-[40px] object-cover rounded-full' />
                            </div>
                            <div className="cc_right flex flex-col">
                                <h1 className='text-lg text-gray-500 m-0 p-0'>Arsya Arlingga</h1>
                                <small className='text-sm text-gray-500'>Kelas 3a</small>
                            </div>
                        </div>

                        <img src="https://images.pexels.com/photos/10513680/pexels-photo-10513680.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className='w-full h-[200px] object-cover' />

                        <div className="content_caro p-4">
                            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, <span className='text-gray-300 select-none cursor-pointer'>selengkapnya</span>
                            </p>
                        </div>

                        <div className="like_area pt-4 px-4 flex gap-4 mt-auto">
                            <p>1800 likes</p>
                            <p>100 Comments</p>
                        </div>

                    </div>

                    <div className=" flex w-full flex-col justify-center items-center h-[400px]">
                        <div className="car_content flex p-2 gap-4">
                            <div className="cc_left">
                                <img src="https://images.pexels.com/photos/10513680/pexels-photo-10513680.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className='w-[40px] h-[40px] object-cover rounded-full' />
                            </div>
                            <div className="cc_right flex flex-col">
                                <h1 className='text-lg text-gray-500 m-0 p-0'>Arsya Arlingga</h1>
                                <small className='text-sm text-gray-500'>Kelas 3a</small>
                            </div>
                        </div>

                        <img src="https://images.pexels.com/photos/10513680/pexels-photo-10513680.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className='w-full h-[200px] object-cover' />

                        <div className="content_caro p-4">
                            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, <span className='text-gray-300 select-none cursor-pointer'>selengkapnya</span>
                            </p>
                        </div>

                        <div className="like_area pt-4 px-4 flex gap-4 mt-auto">
                            <p>1800 likes</p>
                            <p>100 Comments</p>
                        </div>

                    </div>

           

                </Carousel>
            </div>

        </div>
    )
}

export default WallSiswa
