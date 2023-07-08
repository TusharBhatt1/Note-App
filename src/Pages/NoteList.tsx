import { useMemo, useState} from "react"
import {  Link } from "react-router-dom"
import ReactSelect from "react-select"
import {  Tag } from "../App"
import Myself from "../Images/my.webp"
import Footer from "../Components/Footer"
// import { Button, Col, Modal, Row, Stack , Form } from "react-bootstrap"


type NoteListProps={
    availableTags :Tag[]
    notes:SimplifiedNote[]
    onDeleteTag: (id: string)=>void
    onUpdateTag: (id: string , label:string ) => void
}

type SimplifiedNote={
    tags: Tag[]
    title :string
    id:string
}

// type EditTagsModalProps={
//    show: boolean
//    availableTags:Tag[]
//    handleClose : ()=>void
//    onDeleteTag: (id: string)=>void
//    onUpdateTag: (id: string , label:string ) => void
// }


export default function NoteList({availableTags, notes, onUpdateTag, onDeleteTag}:NoteListProps) {

    const [selectedTags, setSelectedTags] =useState<Tag[]>([])
    const [title,setTitle] =useState("")
    // const [editTagsModalIsOpen , setEditTagsModalIsOpen]= useState(false)

    const filteredNotes= useMemo(()=>{
        return notes.filter(note=>{
            return (title==="" || note.title.toLowerCase().includes(title.toLowerCase()))
            && (selectedTags.length===0 || selectedTags.every(tag=> note.tags.some(noteTag =>noteTag.id === tag.id)))
        })
    },[title, selectedTags, notes])




  return (
   <div>
    <div className="flex justify-between p-2 mx-1 sm:mx-4 items-center">
        <p className="text-xl font-semibold">Notes</p>
        <div className="flex justify-center items-center">
        <Link to ="/new">
         <button className="rounded tracking-wider mr-4 bg-blue-500 text-white font-bold p-1 sm:p-2">Create</button>
        </Link>
        <a href="https://www.linkedin.com/in/tushar-bhatt-59b64623b" rel="noreferrer" target="_blank">
        <img src={Myself} className="h-12 w-12 rounded-full cursor-pointer" alt="Tushar Bhatt"/>
        </a>
        {/* <button onClick={()=>setEditTagsModalIsOpen(true)} className="border-2 border-black p-1 ">Edit Tags</button> */}
        </div>
    </div>

    <div>
        <div className="flex flex-col text-center gap-4 text-sm items-center p-4 justify-around">
            <div className="flex flex-col ">
            <span>Search by Title</span>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className="border-2 border-slate p-2 w-52 text-xs "/>
            </div>
            <div className="flex flex-col">
            <span>Search by Tags</span>
            
            <ReactSelect  className="w-52 text-xs"  value={selectedTags.map(tag=>{
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
    </div>

    <div className="justify-center  flex-wrap flex mt-7 p-4 gap-7">
        { filteredNotes.length===0 ? <p className="text-slate-500	">No Note , Create One</p>
        :
        filteredNotes.map(note=>(
                <div key={note.id}>
                 <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                </div>
            ))
        }
    </div>
    <Footer/>
    {/* <EditTagsModal onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag} show={editTagsModalIsOpen} handleClose={()=>setEditTagsModalIsOpen(false)}
    availableTags={availableTags}/> */}
   </div>
  )

}

function NoteCard ({id , title , tags}: SimplifiedNote)
{


    
    return(
        <Link to={`/${id}`}>
            <div className=" text-center flex flex-col gap-4 justify-between border-gray border-2 h-52 w-52 p-4 hover:shadow-xl hover:bg-red-100 ">
                <div>
               <span className="font-bold text-lg"> {title}</span>
               <div className="flex flex-wrap relative max-h-40 gap-2  ">
                {tags.length>0 && tags.map(tag=><p className=" m-auto p-2 max-w-10 mt-4 bg-blue-500 text-white text-xs ">{tag.label}</p>)}
                </div>
                </div>
                <p className="text-xs text-red-300">Click to Edit/Delete</p>
                </div>
                
        </Link>
    )
}

// function EditTagsModal({availableTags , handleClose, show , onUpdateTag , onDeleteTag}: EditTagsModalProps)
// {
//     return ( 
//     <Modal show={show} onHide={handleClose} >
//         <Modal.Header closeButton>
//             <Modal.Title>Edit Tags</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <Form>
//                <Stack gap={2}>
//                 {availableTags.map(tag=>(
//                     <Row key={tag.id}>
//                     <Col>
//                     <Form.Control type="text" value={tag.label} onChange={e=>onUpdateTag(tag.id, e.target.value)} />
//                     </Col>

//                     <Col xs="auto">
//                      <Button variant="outline-danger" onClick={()=>onDeleteTag(tag.id)}>&times;</Button>
//                     </Col>
//                     </Row>
//                    ))
//                 }
//                </Stack>
//             </Form>
//         </Modal.Body>
//     </Modal>
//     )
// }