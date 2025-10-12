interface Story {
    _id: string;
    text: string;
    date: string;
    picture1: string;
    picture2: string;
    video: string;
    artisan_id: string;
}

export async function getStories(): Promise<Story[]> {
    try {
        const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXTAUTH_URL || 'https://wdd-430-handcrafted-haven-kappa.vercel.app/'
      : 'http://localhost:3000';

      const res = await fetch(`${baseUrl}/api/stories`, {
        method: 'GET',
        cache: 'no-store' // Ensure fresh data each time
      });

      if (!res.ok) {
        console.log(`Failed to fetch story: ${res.status}`);
        return [];
      }

      return await res.json();
    } catch (error) {
        console.error('Error fetching stories:', error);
        return [];
    }
}