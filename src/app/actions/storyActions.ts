'use server';

import { initDb, getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

export async function createStory(formData: {
  text: string;
  picture1?: string;
  picture2?: string;
  video?: string;
  artisan_id: string;
}) {
  try {
    const { text, picture1, picture2, video, artisan_id } = formData;

    // Validation
    if (!text.trim() || !artisan_id) {
      return { success: false, error: 'Text and artisan ID are required' };
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
    
    // Revalidate the profile page to show fresh data
    revalidatePath('/profile/[id]', 'page');
    
    return { 
      success: true, 
      storyId: result.insertedId.toString(),
      message: 'Story created successfully' 
    };

  } catch (error) {
    console.error('Error creating story:', error);
    return { success: false, error: 'Failed to create story' };
  }
}