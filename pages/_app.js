import '../styles/globals.css'
import Layout from '../components/Layout';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {useState} from 'react'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
export default function App(AppProps) {
    const { Component, pageProps } = AppProps;
    const router = useRouter()
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())
    return (
            <>
                <Head>
                    <title>Page title</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                </Head>
                <SessionContextProvider
                    supabaseClient={supabaseClient}
                    initialSession={pageProps.initialSession}
                    >
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SessionContextProvider>
            </>

    )
}

