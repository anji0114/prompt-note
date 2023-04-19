import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useStore } from '@/store'
import { EditorHeader } from '../Editor/Header'

export const NoteDetail: FC = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const note = useStore((state) => state.editNote)
  const setNote = useStore((state) => state.setEditNote)
  const resetNote = useStore((state) => state.resetEditNote)

  const handleNoteUpdate = async () => {
    const { error } = await supabase
      .from('notes')
      .update({
        title: note.title,
        content: note.content,
      })
      .eq('id', note.id)

    if (error) {
      alert(error.message)
      return
    }

    await router.push('/dashboard')
    resetNote()
  }

  return (
    <>
      <EditorHeader handleUpdate={handleNoteUpdate} prevLink="/dashboard" />
      <div className="max-w-[800px] mx-auto mt-16">
        <h1>
          <TextareaAutosize
            value={note.title}
            minRows={1}
            placeholder="タイトル"
            className=" w-full text-3xl pb-5 outline-none resize-none border-b border-[#d0d7de]"
            onChange={(e) => {
              setNote({ ...note, title: e.target.value })
            }}
          />
        </h1>
        <div className="mt-7">
          <TextareaAutosize
            value={note.content}
            onChange={(e) => {
              setNote({ ...note, content: e.target.value })
            }}
            minRows={6}
            placeholder="入力する"
            className=" w-full py-2.5 px-1 outline-none leading-8 resize-none"
          />
        </div>
      </div>
    </>
  )
}
