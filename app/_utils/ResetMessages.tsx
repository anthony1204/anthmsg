"use client"

import { useCorbado } from "@corbado/react"
import { useRouter } from "next/navigation"
import {toast, Toaster} from "react-hot-toast"

export default function ResetMessages() {
    const { logout } = useCorbado()
    const router = useRouter()

    const onLogout = async () => {
            const code = "a" //disabled due to issues deploying
            const response = await fetch('/api/cam', {
                method: 'POST',
                headers: {'password':code+""}
            });
            const data = await response.statusText
            toast.loading(data+"")
        };
    return (
        <div>
            <button onClick={onLogout}>Reset Messages</button>
            <input id='code' placeholder="reset code" type="text"></input>
            <Toaster position="bottom-right"></Toaster>
        </div>
    )
}