"use client"

import { CorbadoAuth } from "@corbado/react"
import { useRouter } from "next/navigation"

export default function Auth() {

    const router = useRouter()
    const onLoggedIn = () => {
        router.push("/api/loginsuccess")
    }

    return (
        <body background-color="#000000">
        <div>
            <CorbadoAuth onLoggedIn={onLoggedIn} />
        </div>
        </body>
    )
}