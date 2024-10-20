"use client"

import { CorbadoAuth } from "@corbado/react"
import { useRouter } from "next/navigation"

export default function Auth() {

    const router = useRouter()
    const onLoggedIn = () => {
        router.push("/dashboard")
    }

    return (
        <body background-color="#40822e">
        <div>
            <h1>Login success!</h1>
            <a href="/api/get_messages">continue</a>
        </div>
        </body>
    )
}