import { NextRequest } from 'next/server';
import {initDb, getDb} from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {text, picture1, picture2, video, artisan_id} = body;

        // Basic validation
        if (!text || !artisan_id) {
            return new Response('Text and artisan ID are required', {status: 400});
        }

        await initDb();
        const db = getDb();

        const newStory = {
            text: text.trim(),
            picture1: picture1?.trim() || '',
            picture2: picture2?.trim() || '',
            video: video?.trim() || '',
            artisan_id: new ObjectId(artisan_id),
            date: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        };
        const result = await db.collection('story').insertOne(newStory);

        return Response.json({
            success: true,
            storyId: result.insertedId,
            message: 'Story created successfully'
        });
    } catch (error) {
        console.error('Error creating story:', error);
        return new Response('Internal Server Error', {status: 500});
    }
}


// export async function GET() {
//     try {
//         await initDb();
//         const db = getDb();
//         const stories = await db.collection('story').find({}).toArray();
//         return Response.json(stories);
//     } catch (error) {
//         console.error("DB operation failed: ", error);
//         return new Response("Internal Server Error", {status: 500});
//     }
// }


// export async function GET(request: NextRequest) {
//     try {
//         await initDb();
//         const db = getDb();
        
//         // Get query parameters
//         const { searchParams } = new URL(request.url);
//         const artisanId = searchParams.get('artisan_id');
        
//         let query = {};
//         if (artisanId) {
//             query = { artisan_id: new ObjectId(artisanId) };
//         }
        
//         const stories = await db.collection('story').find(query).toArray();
        
//         // Serialize the data properly
//         const serializedStories = stories.map(story => ({
//             ...story,
//             _id: story._id.toString(),
//             artisan_id: story.artisan_id.toString(),
//             date: story.date?.$date || story.date || new Date().toISOString()
//         }));
        
//         return Response.json(serializedStories);
//     } catch (error) {
//         console.error("DB operation failed: ", error);
//         return new Response("Internal Server Error", {status: 500});
//     }
// }

export async function GET(request: NextRequest) {
    try {
        await initDb();
        const db = getDb();
        
        const { searchParams } = new URL(request.url);
        const artisanId = searchParams.get('artisan_id');
        
        console.log('🔴 API - Requested artisan_id:', artisanId);
        
        let query = {};
        if (artisanId) {
            // Try both string and ObjectId queries
            query = {
                $or: [
                    { artisan_id: new ObjectId(artisanId) },  // If stored as ObjectId
                    { artisan_id: artisanId }                 // If stored as string
                ]
            };
        }
        
        console.log('🔴 API - Query:', JSON.stringify(query));
        
        const stories = await db.collection('story').find(query).toArray();
        
        console.log('🔴 API - Found stories:', stories.length);
        
        // Serialize the data
        const serializedStories = stories.map(story => ({
            ...story,
            _id: story._id.toString(),
            artisan_id: story.artisan_id.toString(),
            date: story.date?.$date || story.date || new Date().toISOString()
        }));
        
        return Response.json(serializedStories);
    } catch (error) {
        console.error("DB operation failed: ", error);
        return new Response("Internal Server Error", {status: 500});
    }
}