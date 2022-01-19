import React from 'react'


/**
 * 
 * @param {*}  
 * index urutan index
 * @returns 
 * JSX Component
 * @author
 * fadliselaz
 */
const JadwalList = ({
    index = 1,
    pelajaran = "matematika",
    guru = "Ibu Rosita Angraini",
    jam = "08.00 - 09.00"
})=>{

    /**
     * 
     * @param {*} args 
     * jika index urutan 1, 4 ,7, 10
     * @param {*} level 
     * light, medium dark
     * @returns 
     * background 
     */
    const generatedColor = (args, level) =>{
        let indexOne = [1,4,7,10]
        let indexTwo = [2,5,8,11]
        let indexThree = [3,6,9,12]

       if(indexOne.includes(args)){
           return "bg-success-" + level
       }else if(indexTwo.includes(args)){
           return "bg-secondary-" + level
       }else if(indexThree.includes(args)){
        return "bg-primary-" + level
       }else{
        return "bg-success-" + level
       }
    }



    return (
        <div className={`list_jadwal w-full h-16 flex ${generatedColor(index, "medium")} rounded-lg`}>
            <div className="kiri w-[70%] flex flex-col p-2 pl-4">
                <h1 className='text-gray-500 text-md font-bold'>{index}. {" "} {pelajaran}</h1>
                <p className='text-gray-400 text-[.8rem]'>{guru}</p>
            </div>
            <div className={`kanan h-full ${generatedColor(index, "dark")} flex justify-center items-center ml-auto w-[40%] rounded-r-lg`}>
                <p className='text-white font-bold text-[.8rem]'>{jam}</p>
            </div>
        </div>
    )
}


/**
 * 
 * @returns 
 * JSX Component
 * @author
 * fadliselaz
 */
const CardJadwal = () => {
    return (
        <div className="siswa_card w-full h-auto flex flex-col rounded-xl bg-white shadow-lg p-4 my-2">
            <h1 className='text-2xl text-secondary-dark font-bold'>Jadwal Kamu</h1>
            <p className='text-gray-400 text-sm'>Semester 1 Tahun ajaran 2021 - 2022</p>
            
            <div className="container_jadwal mt-4 w-full flex flex-col gap-2">
                <JadwalList />
                <JadwalList index={2}/>
            </div>

        </div>
    )
}

export default CardJadwal
