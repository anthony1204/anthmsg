// app/messages/page.tsx
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import getNodeSDK from '@/app/_utils/nodeSdk';
import { redirect } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

const MessagesPage = async () => {
    // Check authorization
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('cbo_session_token');
    if (!sessionToken) {
        return (<body>
            <h1 style={{color:"red",textDecorationColor:"red",WebkitTextFillColor:"red"}}>Forbidden! login first</h1>
            <p>turn off auto refresh messages then</p>
                <a href='/api/auth'>login</a>
            </body>
        );
    }

    const sdk = getNodeSDK();
    let user;
    try {
        user = await sdk.sessions().validateToken(sessionToken.value);
    } catch {
        return (<body>
            <h1 style={{color:"red",textDecorationColor:"red",WebkitTextFillColor:"red"}}>Forbidden! login first</h1>
            <p>turn off auto refresh messages then</p>
                <a href='/profile'>login</a>
            </body>
        );
    }

    // Path to the messages file
    const filePath = path.join(process.cwd(), 'storage', 'messages.txt');

    // Read the messages from the file
    let messages = '';
    try {
        messages = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error('Error reading file:', err);
        messages = 'Error loading messages.';
    }

    return (
        <div>
            <Toaster position='bottom-right'></Toaster>
            <h1>Messages</h1>
            <pre>{messages}</pre> {/* Display messages */}
        </div>
    );
};

export default MessagesPage;
