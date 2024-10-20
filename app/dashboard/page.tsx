'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getNodeSDK from "@/app/_utils/nodeSdk";
import { Toaster ,toast} from 'react-hot-toast';

export default function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    let autoreset = true
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            console.error('Name or email is empty');
            return;
        }
    
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'name': name,
                'msg': email

            },
            body: JSON.stringify("")
        });
        console.log(response.status)
        if (response.status==401){
            toast.error("401, Unauthorised; please log in before using this action")
        }if (response.status==200) {
            toast.success("Successfuly sent message.")
            
        } else {
            toast.error("Sending message may have been unsuccessfull (code "+response.status+" "+response.statusText+").")
        }
        
    
        // Check response
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            return;
        }
    };

    //begin updating messages
    useEffect(() => {
        const myFunction = () => {
            if (autoreset){
                const iframe = document.getElementById('msgiframe') as HTMLIFrameElement;
                iframe.contentWindow?.location.reload();
            }
            // Your logic here
        };

        // Initial call
        myFunction();

        // Set the interval
        const intervalId = setInterval(myFunction, 2350);

        // Cleanup function
        return () => clearInterval(intervalId);
    }, []);


    return (
        <body>
            <Toaster 
                position="bottom-right" // Change this to bottom-right, top-left, etc. as needed
                reverseOrder={false} // Change order of toasts
            />
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
                required
                id='namein'
            />
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="message"
                required
                id='msgin'
                aria-multiline="true"
            />
            <button type="submit">Submit</button>
            <a href="/profile">profile</a>
            <p></p>
            <label>Auto update messages</label>
            <input type='checkbox' id='autoupdate' onChange={function(){autoreset = !autoreset}} defaultChecked/>
            <iframe src="/api/get_messages" id='msgiframe' title="messages" style={{width:'100%',height:'1200px'}}></iframe>
            
        </form>
        <p>hi</p>
            
        </body>
    );
}
