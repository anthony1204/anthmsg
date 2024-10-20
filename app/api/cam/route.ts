// app/api/submit/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import getNodeSDK from '@/app/_utils/nodeSdk';
import path from 'path';
import fs from 'fs'

export async function POST(req: Request) {
    // Start checking tokens
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('cbo_session_token');
    if (!sessionToken) {
        return NextResponse.json({ code: 401, message: 'Unauthorized, please login first' });
    }

    const sdk = getNodeSDK();
    let user;
    try {
        user = await sdk.sessions().validateToken(sessionToken.value);
    } catch {
        return NextResponse.json({ code: 401, message: 'Unauthorized, please login first' });
    }
    // End check for logging in
    const passin = req.headers.get("password")
    console.log(passin)
    if (passin=="a"){
         // Path to the messages.txt file
    const filePath = path.join(process.cwd(), 'storage', 'messages.txt');

    // New content to replace the existing content
    const newContent = "Start of messages.\n";

    // Write the new content, overwriting the file
    try {
        fs.writeFileSync(filePath, newContent, 'utf8');
    } catch (err) {
        console.error('Error writing to file:', err);
        return NextResponse.json({ message: 'Error writing to file' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Messages cleared successfully' }, { status: 200 });
    }else{
    return NextResponse.json({message:"password incorrect."},{status:401});
    }
}
