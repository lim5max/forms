//import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
    return (
        <>
            <Image
                src="/preview.svg"
                alt="Priview of index page"
                className="w-full h-auto"
                width={100}
                height={100}
            />
            <h1 className="text-2xl font-semibold mt-4">#CODDY FORMS</h1>
        </>
    )
}
//    <p>Привет 👋, думая вы проходили опросы с помощью сервисаЮ </p>
