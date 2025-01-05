import React from 'react'

function DownloadImage() {
  return (
    <>
        <div className='h-[20%] flex items-center justify-center  gap-4 '>
            <h1 className='text-white font-semibold mt-3'>This image is message carrier!</h1>
        </div>
        <div className='h-[70%] rounded-2xl border-[0.5px] flex items-center justify-center'>
            <img src='/api/getImage' className='max-h-[100%] max-w-[100%] z-[1]'></img>
        </div>
        <div className='h-[30%] flex flex-col gap-3'>
            
            <a className='p-3 w-full rounded-2xl bg-blue-400 text-center font-semibold' href='/api/getImage' download="/api/getImage">Download Image</a>
        </div>
    </>
  )
}

export default DownloadImage