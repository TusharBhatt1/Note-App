import {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import react from "../Images/logo.svg"



export default function LoadingPage() {
const navigate = useNavigate()

useEffect(()=>{
    setTimeout(()=>{
    navigate("/home")
    },2000)
},[])

  return (
  
    <div className='flex h-80 flex-col text-lg text-center font-semibold items-center justify-end text-white'>
   <img src={react} className="h-32 w-32 animate-spin " alt="react"/>
   
    </div>
    
  
  )
}
