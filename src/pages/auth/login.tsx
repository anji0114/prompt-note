import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useRef } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import styles from '@/styles/Auth.module.scss'

const Login: NextPage = () => {
  const supabase = useSupabaseClient()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/')
  }, [user])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    })

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.contents}>
            <h2 className={styles.heading}>ログイン</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formList}>
                <dl className={styles.formItem}>
                  <dd className={styles.formTitle}>メールアドレス</dd>
                  <dd className={styles.formArea}>
                    <input
                      type="text"
                      placeholder="mail@example.com"
                      required
                      ref={emailRef}
                    />
                  </dd>
                </dl>
                <dl className={styles.formItem}>
                  <dd className={styles.formTitle}>パスワード</dd>
                  <dd className={styles.formArea}>
                    <input type="password" required ref={passwordRef} />
                  </dd>
                </dl>
              </div>
              <div className={styles.submitWrap}>
                <button className={`${styles.button} ${styles.isSubmit}`}>
                  ログイン
                </button>
              </div>
            </form>
            <div className={`${styles.linkWrap} ${styles.isForgot}`}>
              <Link href="/auth/login">パスワードを忘れた方はこちら</Link>
            </div>
            <div className={styles.buttonWrap}>
              <Link
                href="/auth/signup"
                className={`${styles.button}
              `}
              >
                ユーザー登録はこちらから
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login