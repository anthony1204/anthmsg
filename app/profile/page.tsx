'use server'
import {cookies} from "next/headers";
import getNodeSDK from "@/app/_utils/nodeSdk";
import {redirect} from "next/navigation";
import LogoutButton from "@/app/_utils/LogoutButton";
import PasskeyList from "@/app/_utils/PasskeyList";
import { Toaster,toast } from "react-hot-toast";
import ResetMessages from "../_utils/ResetMessages";

// the user data will be retrieved server side
export default async function Profile() {
    //start checking tokens
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("cbo_session_token");
    if (!sessionToken) {
        return redirect("/");
    }

    const sdk = getNodeSDK();
    let user;
    try {
        user = await sdk.sessions().validateToken(sessionToken.value);
    } catch {
        return redirect("/");
    }
    //end check for logging in
    
    return (
        <div>
            <Toaster position="bottom-right"></Toaster>
            <h1>User:</h1>
            <p>
                User-ID: {user.userId}<br/>
                Full name: {user.fullName}
            </p>
            <div>
                <a href="/dashboard">dashboard</a>
                <ResetMessages/>
                
            </div>
            <LogoutButton/>
            <PasskeyList/>
        </div>
    )
}