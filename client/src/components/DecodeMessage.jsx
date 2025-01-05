import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { LuUpload } from "react-icons/lu";

function DecodeMessage() {
    const [message, setMessage] = useState("")
    const [file, setFile] = useState()
    const [url, setUrl] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const [preAvailable, setPreAvailable] = useState(false)
    const navigate = useNavigate()

    function containsInvalidCharacters(str) {

        // Regex to match englishalphabet
        const validPattern = /^[a-zA-Z\s.,!?\-]*$/;
        
        // Test the string against the pattern
        return !validPattern.test(str);
    }

  return (
    <>
        <div className='h-[10%] flex items-center justify-center  gap-2 '>
            <h1 className='text-white font-semibold mt-3'>Upload Image to decode a message hidden inside it.</h1>
        </div>
        <div className='h-[70%] rounded-2xl border-[0.5px] flex items-center justify-center relative '>   

            {preAvailable && 
            <img 
                className="max-h-[100%] max-w-[100%] z-[1]" 
                src={url}
                onDoubleClick={() => {setPreAvailable(false)}}></img>}

            
            
            {!preAvailable &&
            <input 
                type='file' 
                id="choose"
                hidden
                onChange={(e) => {
                    setFile(e.target.files[0])
                    const url = URL.createObjectURL(e.target.files[0])
                    setUrl(url)
                    setPreAvailable(true)
                    setError("")
                    setMessage("")
                }}></input>
            }

            {!preAvailable && 
            <label htmlFor="choose" className='text-white'>
                <div className='h-[20vh] w-[20vh] bg-green-700 rounded-full flex items-center justify-center text-[10vh] opacity-70 hover:cursor-pointer'>
                    <LuUpload />
                </div>
            </label>
            }

            <p className=' text-red-700 mt-20 font-bold z-[1] absolute top-[50%] text-lg'>
                {error}
            </p>

            
        </div>
        <div className='h-[30%] flex flex-col gap-3'>
            <input 
                type='text' 
                placeholder='Your message will be displayed here' 
                className='w-full p-3 rounded-2xl font-medium'
                value={message}
                readOnly
                ></input>

            <button 
                className='p-3 w-full rounded-2xl bg-purple-900 text-slate-200 flex items-center justify-center'
                onClick={() => {

                    if(loading){
                        return
                    }

                    setLoading(true)

                    if(!file){
                        setError("Please upload the Image")
                        setLoading(false)
                        return
                    }

                    if(file){
                        const formData = new FormData();
                        formData.append("file" , file);

                        fetch("/api/decode" , {
                            method: "POST",
                            body: formData
                        }).then((data) =>  {
                            
                            if(data.status >= 200 && data.status < 300){

                                return data.json()

                            }else{
                                setError("Something Went Wrong")
                                setLoading(false)
                                setPreAvailable(false)
                                return ""
                            }

                        }).then((res) => {
                            
                            if(containsInvalidCharacters(res.hidden) || res.hidden === ""){
                                setError("No Message was hidden in this Image")
                                setPreAvailable(false)
                                setLoading(false)
                                return
                            }
                            setMessage(res.hidden)
                            setLoading(false)
                        })
                           
                    }

                    
                }}>{loading && <Spinner/>}{!loading && "Decode Message"}</button>
        </div>
    </>
  )
}

export default DecodeMessage