import {cookies} from "next/headers";
import getNodeSDK from "@/app/_utils/nodeSdk";
import {redirect} from "next/navigation";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export async function server(){
      //start checking tokens
      const cookieStore = cookies();
      const sessionToken = cookieStore.get("cbo_session_token");
      if (!sessionToken) {
          return false
      }
  
      const sdk = getNodeSDK();
      let user;
      try {
          user = await sdk.sessions().validateToken(sessionToken.value);
      } catch {
          return false
      }
      return true
      //end check for logging in
}

//const export async client(){
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         const checkAuth = async () => {
//             const sessionToken = document.cookie
//                 .split('; ')
//                 .find(row => row.startsWith('cbo_session_token='))
//                 ?.split('=')[1];

//             if (!sessionToken) {
//                 router.push("/"); // Redirect if no session token
//                 return false;
//             }

//             const sdk = getNodeSDK();
//             try {
//                 await sdk.sessions().validateToken(sessionToken);
//                 console.log("Token is valid."); // Token validation success
//             } catch (error) {
//                 console.error("Token validation failed:", error);
//                 return false; // Redirect if token validation fails
//             } finally {
//                 setLoading(false); // Stop loading after check
//             }
//         };

//         checkAuth();
//     }, [router]);
// }