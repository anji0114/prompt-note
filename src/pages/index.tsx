import Head from 'next/head'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'

const Home = () => {
  const user = useUser()
  const supbase = useSupabaseClient()

  return (
    <>
      <Head>
        <title>Prompt Note</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container">
        {user ? (
          <Link href="/dashboard">ダッシュボード</Link>
        ) : (
          <Link href="/auth/login">ログイン</Link>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Home