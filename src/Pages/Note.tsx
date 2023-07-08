import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";


type NoteProps ={
    onDelete:(id:string)=>void
}

export function Note({onDelete}: NoteProps)
{
    const note = useNote()
    const navigate = useNavigate()

    return (
    <div className="flex flex-col gap-4 p-2">
        <div className="flex justify-between mx-4">
         <p className="font-bold text-sm sm:text-xl">{note.title}</p>
         <div className="text-sm">
         <Link to={`/${note.id}/edit`}>
         <button className="p-1 mr-2 w-10 sm:w-20 bg-blue-500 text-white">Edit</button>
         </Link>
         <button 
             onClick={()=>{onDelete(note.id) 
             navigate("/home")} }
             className="p-1 mr-2 w-14  sm:w-20  text-red-400 border-2 border-red-200">Delete</button>
         <Link to="/home">
         <button className="p-1 border-2 w-10 sm:w-20 border-gray text-gray">Back</button>
         </Link>
        
         </div>
        </div>
    <span className="border-b-2 border-black p-2 ">{note.tags.map(tag=>(
        <span className="bg-blue-500 p-1 text-white p-2 mr-4 text-xs ">{tag.label}</span>
    ))}</span>
    <p>{note.markdown}</p>
    </div>)
}