// app/api/submit/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import getNodeSDK from '@/app/_utils/nodeSdk';

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

    const name = req.headers.get("name");
    const msg = req.headers.get("msg");

    // Updated path to the file in the public directory
    const filePath = path.join(process.cwd(), 'storage', 'messages.txt');

    // Create the new message
    const message = `${new Date().getHours()}:${new Date().getMinutes()}- ${name}: ${msg}\n`;

    // Read current file contents
    let currentContent = '';
    try {
        currentContent = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error('Error reading file:', err);
    }

    // Prepend the new message and write back to the file
    const updatedContent = message + currentContent; // Prepend the new message
    fs.writeFile(filePath, updatedContent, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return NextResponse.json({ code: 500, message: 'Internal server error' });
        }
    });

    return NextResponse.json({ code: 200, message: 'Message received successfully' });
}
