import Link from 'next/link'
import {Inter} from '@next/font/google'
import { useUser } from '@supabase/auth-helpers-react'
const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin', 'cyrillic']
})
import { useEffect} from 'react'
export default function Layout({children}) {
    const user = useUser()
    useEffect(()=>{
        console.log(user)
    },[user])
    return (
        <div className={`${inter.variable} font-sans w-full max-w-5xl  mx-auto overflow-hidden lg:px-0 px-4`}>
            <header className=" py-4 copy">
                <nav className=" flex justify-between items-center">
                    <Link href="/" replace>
                        <svg className="w-10 h-10 fill-neutral-800 stroke-neutral-900" viewBox="0 0 24 24">
                            <path
                                d="M6 21q-.825 0-1.412-.587Q4 19.825 4 19v-9q0-.475.213-.9q.212-.425.587-.7l6-4.5q.275-.2.575-.3q.3-.1.625-.1t.625.1q.3.1.575.3l6 4.5q.375.275.588.7q.212.425.212.9v9q0 .825-.587 1.413Q18.825 21 18 21h-4v-7h-4v7Z"></path>
                        </svg>
                    </Link>
                    <ul className="space-x-4 lg:space-x-6 flex items-center w-fit ml-auto">
                        <li>
                            <Link href="changelog" className="font-semibold text-xl" replace>Changelog</Link>
                        </li>
                        <li>
                            <Link href="/login" className="font-semibold text-xl bg-black text-white px-4 py-2 rounded-xl active:scale-95 block transition" replace>Войти</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className=" mt-4  ">
                {children}
            </main>
        </div>
    );
}