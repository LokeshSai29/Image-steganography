import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from "./Spinner"
import { LuUpload } from "react-icons/lu";

function SubmitImage() {
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
            <h1 className='text-white font-semibold mt-3'>Upload Image to Hide Message</h1>
            
            
        </div>
        <div className='h-[70%] rounded-2xl border-[0.5px] shadow-sm shadow-slate-500 flex items-center justify-center relative'>   

            {preAvailable && 
            <img 
                className="max-h-[100%] max-w-[100%] z-[1]" 
                src={url}
                onDoubleClick={() => {setPreAvailable(false)}}></img>
            
            }
            
            
            
            {!preAvailable &&
            <input 
                type='file' 
                id='choose'
                className={`absolute file:rounded-full file:p-3 file:text-pink-600 file:font-bold file:bg-white  file:text-xs z-[0]`}
                hidden
                onChange={(e) => {
                    setFile(e.target.files[0])
                    const url = URL.createObjectURL(e.target.files[0])
                    setError("")
                    setUrl(url)
                    setPreAvailable(true)}}>
            </input>
            
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
        <div className='h-[30%] flex flex-col gap-3 '>
            <input 
                type='text' 
                placeholder='Write a message You want to hide' 
                className='w-full p-3 rounded-2xl font-medium'
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value)
                }}></input>

            <button 
                className='p-3 w-full rounded-2xl bg-purple-900 text-slate-200 flex justify-center'
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

                    if(message === ""){
                        setError("Please enter the Message")
                        setLoading(false)
                        
                        return
                    }

                    if(containsInvalidCharacters(message)){
                        setError("Your message can only contain English Alphabet.")
                        setLoading(false)  
                        return
                    }

                    if(file){
                        const formData = new FormData();
                        formData.append("file" , file);
                        formData.append("mes" , message);

                        fetch("/api/upload" , {
                            method: "POST",
                            body: formData

                        }).then((data) => {

                            if(data.status < 300 && data.status >= 200){
                                navigate("/download")
                            }else{
                                setError("Something went wrong, try again")
                                setLoading(false)
                            }
                            
                        }).catch((err) => {
                            setError(err)
                            setLoading(false)
                        })     
                    }

                    
                }}>{!loading && "Hide Message"} {loading && <Spinner/>}</button>
        </div>
    </>
  )
}

export default SubmitImage