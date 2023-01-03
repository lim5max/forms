import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";

import { SessionProvider } from "next-auth/react";
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Page title</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<SessionProvider session={session}>
				{router.pathname.startsWith("/poll") ? (
					<Component {...pageProps} />
				) : (
					<Layout>
						<Component {...pageProps} />
					</Layout>
				)}
			</SessionProvider>
		</>
	);
}
