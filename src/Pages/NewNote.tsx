import { NoteForm } from "../Components/NoteForm"
import { NoteData,Tag } from "../App"

type NewNoteProps={
  onSubmit : (data: NoteData)=>void

  onAddTag: (tag: Tag)=>void
  availableTags: Tag[]
}

export default function NewNote({onSubmit, onAddTag, availableTags}:NewNoteProps) {
  return (
    <div>
        <p className="text-xl font-bold ml-4">New Note</p> 
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </div>
  )
}
