import { initDb, getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
      return new Response("Invalid ID format", { status: 400 });
    }

    await initDb();
    const db = getDb();
    const profile = await db.collection('profile').findOne({ 
      _id: new ObjectId(id) 
    });

    if (!profile) {
      return new Response("Profile not found", { status: 404 });
    }
    console.log(Response.json(profile));

    return Response.json(profile);
  } catch (error) {
    console.error("DB operation failed: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}