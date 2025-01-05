import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { RiMenu3Line } from "react-icons/ri";


function App() {
  const [file, setFile] = useState()
  const [url, setUrl] = useState()
  const [instruction, setInstruction] = useState("Upload image, and write a secret message, your message will be encrypted in between pixels of image")
  const [showMenu, setShowMenu] = useState(true)

  return (
    <div className='w-[100vw] min-h-[100vh] bg-slate-700 flex items-center justify-center [@media(max-width:600px)]:items-start '>
      {/*
      <img className='h-[60vh] absolute rotate-90 [@media(max-width:600px)]:hidden' src='https://i.pinimg.com/564x/45/8a/fa/458afabca690802561bd0a68e8be3bf5.jpg'>
      </img>
      */}
      
      <div className='min-h-[80vh] flex flex-row bg-black rounded-2xl  z-[10] opacity-90 [@media(max-width:600px)]:w-[90%] flex-wrap [@media(max-width:600px)]:items-center [@media(max-width:600px)]:justify-center [@media(max-width:600px)]:mt-10 [@media(max-width:600px)]:mb-10 [@media(max-width:600px)]:gap-5' >
        <div className='w-[40vw] h-[80vh] flex flex-col gap-3 pl-10 pr-10 [@media(max-width:600px)]:w-full'>
          <Outlet/>   
        </div>

      {showMenu &&
        <div className='w-[30vw] mt-10 mr-10 [@media(max-width:600px)]:w-[100%] [@media(max-width:600px)]:items-center [@media(max-width:600px)]:justify-center [@media(max-width:600px)]:mt-10 [@media(max-width:600px)]:mr-0 [@media(max-width:600px)]:flex [@media(max-width:600px)]:flex-col '>
        <div className='h-[20%] flex flex-col [@media(max-width:600px)]:w-[90%] [@media(max-width:600px)]:items-center [@media(max-width:600px)]:justify-center'>
          <NavLink 
            className={({isActive}) => `p-3 w-full rounded-2xl mb-2  ${isActive && "bg-green-700 text-black focus:ring-2 focus:ring-green-800 transition ease-in-out duration-150"} ${!isActive && "bg-white"}`}
            to="/"
            onClick={() => setInstruction("Upload image, and write a secret message, your message will be encrypted in between pixels of image.")}>Hide message inside image</NavLink>
          <NavLink 
            className={({isActive}) => `p-3 w-full rounded-2xl mb-2  ${isActive && "bg-green-700 text-black focus:ring-2 focus:ring-green-800 transition ease-in-out duration-150"} ${!isActive && "bg-white"}`}
            onClick={() => setInstruction("Upload the image to know a secret hidden inside it.")}
            to="/decode">Decode message hidden inside image</NavLink>
        </div>
        <div className='h-[80%] flex items-center justify-center [@media(max-width:600px)]:hidden'>
          <h1 className='font-semibold text-lg text-white'>
            {instruction}
          </h1>
        </div>
        
        
        </div>
      }
        
        
      </div>
      

      
        
    </div>
  )
}

export default App
