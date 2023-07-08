import { NoteForm } from "./NoteForm"
import { NoteData,Tag } from "../App"
import { useNote } from "../Pages/NoteLayout"

type EditNoteProps={
  onSubmit : (id: string , data: NoteData)=>void

  onAddTag: (tag: Tag)=>void
  availableTags: Tag[]
}

export default function EditNote({onSubmit, onAddTag, availableTags}:EditNoteProps) 
{const note = useNote()
  return (
    <div>
        <p className="text-xl">Edit Note</p> 
        <NoteForm title= {note.title} markdown={note.markdown} tags={note.tags} onSubmit={data=> onSubmit(note.id, data)} onAddTag={onAddTag} availableTags={availableTags} />
    </div>
  )
}
