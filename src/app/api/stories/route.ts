import {initDb, getDb} from '@/lib/db';

export async function GET() {
    try {
        await initDb();
        const db = getDb();
        const stories = await db.collection('story').find({}).toArray();
        return Response.json(stories);
    } catch (error) {
        console.error("DB operation failed: ", error);
        return new Response("Internal Server Error", {status: 500});
    }
}