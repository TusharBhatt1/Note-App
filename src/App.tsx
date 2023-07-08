/* eslint-disable @typescript-eslint/no-redeclare */
import {useMemo} from "react"
import { BrowserRouter , Routes, Route ,Navigate } from "react-router-dom"
import NewNote from "./Pages/NewNote"
import { useLocalStorage } from "./Pages/LocalStorage/LocalStorage"
import {v4 as uuidV4} from "uuid"
import NoteList from "./Pages/NoteList"
import {NoteLayout} from "./Pages/NoteLayout"
import { Note } from "./Pages/Note"
import EditNote from "./Components/EditNote"
import LoadingPage from "./Pages/LoadingPage"


export type NoteData={
  title:string
  markdown:string
  tags:Tag[]

}

export type Note={
 
  id:string
  
} & NoteData


export type Tag={
id:string
label:string
}

export type RawNote ={
  id:string
}& RawNoteData

export type RawNoteData={
  title:string
  markdown:string
  tagIds: string[]

}

export default function App() {


const [notes, setNotes] =useLocalStorage<RawNote[]>("NOTES",[])
const [tags, setTags] =useLocalStorage<Tag[]>("TAGS",[])

const notesWithTags = useMemo(()=>{
  return notes.map(note=>{
    return {...note, tags: tags.filter(tag=> note.tagIds.includes(tag.id))}
  })
},[notes,tags])

function onCreateNode({tags, ...data}: NoteData)
{
 setNotes(prevNotes=> { 
  return [...prevNotes , {...data, id: uuidV4(), tagIds: tags.map(tag=>tag.id)}]}) 
}

function addTag(tag:Tag)
{
  setTags(prev=> [...prev, tag])
}


function onUpdateNode(id:string ,{tags , ...data}: NoteData)
{
  setNotes(prevNotes=> { 
    return prevNotes.map(note=> {

      if(note.id===id) return {...data , id: uuidV4(), tagIds: tags.map(tag=>tag.id)}

      else return note
    })
    
  } 
  )
  
}

function onDeleteNote(id:string)
{
  setNotes(prevNotes=>{
    return prevNotes.filter(note=>note.id!==id)
  })
}

function updateTag(id: string , label: string)
{
  setTags(prevTags=>{
    return prevTags.map(tag=>{
      if(tag.id === id)
      {
    return {...tag, label}
      }
      else {
        return tag
      }
    })
  })
}
function deleteTag(id: string)
{
  setNotes(prevTags =>{
    return prevTags.filter(tag=>tag.id !== id)
  })
}


  return (
    <div className="my-4">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoadingPage/>}/>
      <Route path="/home" element={<NoteList availableTags={tags} notes={notesWithTags}  onUpdateTag={updateTag} onDeleteTag={deleteTag} />}/>
      <Route path="/new" element={<NewNote onSubmit={onCreateNode} onAddTag={addTag} availableTags={tags} />}/>

      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
      <Route index element={<Note onDelete={onDeleteNote} />}/>
      <Route path="edit" element={<EditNote onSubmit={onUpdateNode} onAddTag={addTag} availableTags={tags}/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}
