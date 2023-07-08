import CreatableReactSelect from "react-select/creatable"
import {Link, useNavigate} from "react-router-dom"
import { useState, FormEvent, useRef } from "react"
import { NoteData, Tag } from "../App"
import {v4 as uuidV4} from "uuid"


type NoteFormProps={
  onSubmit :(data:NoteData)=>void
  onAddTag: (tag: Tag)=>void
  availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({onSubmit, onAddTag, availableTags, 
  title="" ,markdown="" ,tags=[]}:NoteFormProps) {

const navigate =useNavigate()
const titleRef = useRef<HTMLInputElement>(null)
const markDownRef= useRef<HTMLTextAreaElement>(null)
const [selectedTags, setSelectedTags] =useState<Tag[]>(tags)
const handleSubmit=(e:FormEvent)=>{
  e.preventDefault()

  onSubmit({
    title:titleRef.current!.value,
    markdown :markDownRef.current!.value,
    tags:selectedTags
  })
 
  navigate("..")
}

return(
<form onSubmit={handleSubmit} className=" mt-4 flex flex-col justify-center text-center">
  <div className="flex flex-col justify-center items-center">
    <div>
    <p>Title</p>
    <input ref={titleRef} defaultValue={title} required className=" w-52 p-1 border-2 border-slate"></input>
    </div>
    <div>
    <p>Tags</p>
    <CreatableReactSelect className="w-52 text-xs" onCreateOption={label=>{
      const newTag={id:uuidV4(), label}

      onAddTag(newTag)
      setSelectedTags(prev=> [...prev, newTag])
    }} value={selectedTags.map(tag=>{
      return{label:tag.label, value:tag.id}
    })} 
    onChange={tags=>{
      setSelectedTags(tags.map(tag=>{
        return {label:tag.label , id: tag.value}
      }))
    }}

    options={availableTags.map(tag=>{
      return {label: tag.label, value:tag.id}
    })} 
    isMulti/>
    </div>
  </div>

  
    <p className="text-center mt-4">Body</p>
    <div className="flex flex-col gap-4 m-auto w-52 sm:w-96  items-center ">
    <textarea defaultValue={markdown}  ref={markDownRef} required  className="p-2 h-40 w-52 m-auto   sm:w-96  h-52 border-2 bg-blue-100 border-slate "/>
    <div className="w-40">
    <button type="submit" className=" bg-blue-500 text-white  p-2 rounded-lg mr-2">S a v e</button>
    <Link to="/home" className="">
    <button className="border-2 border-black rounded-lg p-1 ">Cancel</button>
    </Link>
    </div>
  </div>
</form>
    )

}