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
            <CorbadoAuth onLoggedIn={onLoggedIn} />
        </div>
        </body>
    )
}