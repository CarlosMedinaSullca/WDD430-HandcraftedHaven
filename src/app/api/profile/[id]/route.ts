import { initDb, getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return new Response("Invalid ID format", { status: 400 });
    }

    await initDb();
    const db = getDb();
    
    let profile = null;
    
    // First try to find by _id
    profile = await db.collection('profile').findOne({ 
      _id: new ObjectId(id) 
    });
    
    // If not found by _id, try by artisan_id
    if (!profile) {
      profile = await db.collection('profile').findOne({ 
        artisan_id: new ObjectId(id) 
      });
    }

    if (!profile) {
      return new Response("Profile not found", { status: 404 });
    }

    // Serialize the data properly
    const serializedProfile = {
      ...profile,
      _id: profile._id.toString(),
      artisan_id: profile.artisan_id.toString(),
      created_at: profile.created_at?.$date || profile.created_at,
      updated_at: profile.updated_at?.$date || profile.updated_at
    };

    return Response.json(serializedProfile);
  } catch (error) {
    console.error("DB operation failed: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}