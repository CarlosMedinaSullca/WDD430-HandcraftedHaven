
import Stories from "@/app/components/stories"
import ListOfProducts from "@/app/components/listOfProductsProfile";
import ProfileElements from "@/app/components/profileElements";


interface Profile {
  _id: string;
  created_at: string;
  background_pic: string;
  profile_picture: string;
  artisan_id: string;
}

interface Artisan {
  _id: string;
  first_name: string;
  last_name: string;
  biography: string;
  email: string;
}

async function getProfile(id: string): Promise<Profile | null> {
  try {
    // Use absolute URL for fetch
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXTAUTH_URL || 'https://wdd-430-handcrafted-haven-kappa.vercel.app/'
      : 'http://localhost:3000';
    
    console.log('🔍 Fetching from:', `${baseUrl}/api/profile/${id}`);
    
    const res = await fetch(`${baseUrl}/api/profile/${id}`, {
      // Important: Add cache options
      cache: 'no-store',
      next: { revalidate: 0 } // Disable cache to always get fresh data
    });

    console.log('🔍 Response status:', res.status);
    
    if (!res.ok) {
      console.log('❌ Fetch failed:', res.status, res.statusText);
      return null;
    }

    const profile = await res.json();
    console.log('✅ Profile data received:', profile);
    return profile;
  } catch (error) {
    console.error('🚨 Error fetching profile:', error);
    return null;
  }
}

async function getArtisan(id: string): Promise<Artisan | null> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXTAUTH_URL || 'https://wdd-430-handcrafted-haven-kappa.vercel.app/'
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/artisans/${id}`, {
      cache: 'no-store'
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}



export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const profile = await getProfile(id);
  

  if (!profile) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Profile not found</h1>
        <p className="mt-4">The profile with ID <code>{id}</code> was not found.</p>
        <p className="mt-2 text-sm text-gray-600">Check the browser console for more details.</p>
      </div>
    );
  }

    // Fetch artisan data using the artisan_id from the profile
  const artisan = await getArtisan(profile.artisan_id);

  return (
    <>
      <ProfileElements profile= {profile} artisan={artisan}/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-gray-50">
        <Stories artisan={artisan}/>
        <ListOfProducts artisan={artisan}/>
        {/* <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Profile Data:</h3>
          <p><strong>Profile ID:</strong> {profile._id}</p>
          <p><strong>Artisan ID:</strong> {profile.artisan_id}</p>
          <p><strong>Background Image:</strong> {profile.background_pic ? 'Yes' : 'No'}</p>
          <p><strong>Profile Picture:</strong> {profile.profile_picture ? 'Yes' : 'No'}</p>
          {artisan && (
            <>
              <p><strong>Artisan Name:</strong> {artisan.first_name} {artisan.last_name}</p>
              <p><strong>Biography:</strong> {artisan.biography}</p>
            </>
          )}
        </div> */}
      </div>
    </>
  );
}