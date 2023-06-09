import { FC, useState } from 'react'
import Link from 'next/link'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { ListBulletIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import { OutputData } from '@editorjs/editorjs'

type Props = {
  id: string
  title: string
  content: OutputData
  created_at: string
}

export const TemplateItem: FC<Props> = ({ id, title, content, created_at }) => {
  const user = useUser()
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleDeleteTemplate = async (id: string) => {
    const { error } = await supabase.from('templates').delete().eq('id', id)
    if (error) {
      alert(error.message)
      return
    }

    router.reload()
  }

  const handleCreateNoteFromTemplate = async () => {
    const { data, error } = await supabase
      .from('notes')
      .insert({
        title: title,
        content: content,
        user_id: user!.id,
      })
      .select()
      .single()

    if (error) {
      alert(error.message)
      return
    }

    router.push(`/note/${data.id}`)
  }

  return (
    <li className="dashboard-item01 flex gap-5 justify-between items-start py-5 px-7 bg-white border border-[#d0d7de]">
      <div className="w-full">
        <p className="pl-[2px] text-[#555] text-[12px]">
          {format(new Date(created_at), 'yyyy/MM/dd')}
        </p>
        <p className="mt-2.5">
          <Link
            href={`/template/${id}`}
            className="text-[#4e6bb4] font-medium underline-offset-2  hover:underline"
          >
            {title}
          </Link>
        </p>
      </div>
      <div className="w-[40px] relative">
        <button
          className={`w-full inline-block text-center h-[30px] pb-1 border border-[#d0d7de] rounded-md hover:bg-[#f7fafd] ${
            menuOpen ? 'bg-[#f7fafd]' : 'bg-white'
          }`}
          onClick={() => setMenuOpen((prevState) => !prevState)}
        >
          <ListBulletIcon className=" inline-block w-5" />
        </button>
        <ul className={`menu-ist ${menuOpen ? 'is--open' : 'is--close'}`}>
          <li className="w-full text-center">
            <button
              className="inline-block text-[#4e6bb4] w-full p-2.5 text-[12px] font-medium hover:bg-[#f1f4f7]"
              onClick={() => {
                handleCreateNoteFromTemplate()
              }}
            >
              ノートを作成する
            </button>
          </li>
          <li className="w-full text-center  border-t border-[#ebeef2]">
            <Link
              href={`/template/${id}`}
              className="inline-block w-full p-2.5 text-[12px] font-medium hover:bg-[#f7f7f7]"
            >
              編集する
            </Link>
          </li>
          <li className="w-full text-center border-t border-[#ebeef2]">
            <button
              className="inline-block w-full p-2.5 text-[12px] font-medium text-[#de6868] hover:bg-[#fff4f4]"
              onClick={() => handleDeleteTemplate(id)}
            >
              削除する
            </button>
          </li>
        </ul>
      </div>
    </li>
  )
}
