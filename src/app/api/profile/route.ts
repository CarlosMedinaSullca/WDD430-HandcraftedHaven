import { initDb, getDb } from '@/lib/db';




export async function GET() {
    try {
        await initDb();
        // The DB is already guaranteed to be initialized by the line above
        const db = getDb(); 
        const profiles = await db.collection('profile').find({}).toArray();
        return Response.json(profiles);
    } catch (error) {
        console.error("DB operation failed:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
}