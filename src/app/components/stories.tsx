
import Image from "next/image";
import {getStories} from "@/lib/story-actions";
import { Artisan} from "@/app/types/interfacesModels";

// import { Story} from "@/app/types/interfacesModels";
interface storiesProps {
  artisan?: Artisan | null;
}

// interface StoriesProps {
//   artisan?: { _id: string } | null; // Only need _id for filtering
//   stories: Story[];
//   isArtisanOwner?: boolean;
// }

function formatDate(date: string | { $date: string }): string {
  const dateString = typeof date === 'string' ? date : date?.$date;
  if (!dateString) return '';
  
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to extract video ID from Vimeo URL
function getVimeoId(videoUrl: string): string | null {
  const match = videoUrl.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}


export default async function Stories({artisan } : storiesProps) {

  const artisan_id = artisan?._id;
  const stories = await getStories();
  
  const storiesByArtisan = stories.filter(story => story.artisan_id === artisan_id);
  
    return (
          <div className="border rounded-lg shadow-inner p-4 overflow-y-auto no-scrollbar bg-white h-[40rem]">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">My Stories</h2>
            <ul className="grid gap-6">
              {storiesByArtisan.map((story) => (
                <li
                  key={story._id}
                  className="border rounded-lg p-3 shadow hover:shadow-lg hover:scale-[1.02] transition"
                >
                  {/* Story Text - Only show if it exists */}
                  {story.text && (
                    <p className="text-gray-700 mb-2">{story.text}</p>
                  )}
              
                  {/* Date - Only show if it exists */}
                  {story.date && (
                    <p className="text-sm text-gray-500 mb-3">
                      {formatDate(story.date)}
                    </p>
                  )}

                  {/* Pictures - Only show if they exist */}
                  <div className="space-y-3">
                    {story.picture1 && (
                      <Image
                        src={story.picture1}
                        width={400}
                        height={300}
                        className="rounded-lg w-full h-48 object-cover"
                        alt="Story image 1"
                      />
                    )}
                
                    {story.picture2 && (
                      <Image
                        src={story.picture2}
                        width={400}
                        height={300}
                        className="rounded-lg w-full h-48 object-cover"
                        alt="Story image 2"
                      />
                    )}
                  </div>

                  {/* Video - Only show if it exists */}
                  {story.video && (
                    <div className="mt-3">
                      <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                        <iframe
                          src={`https://player.vimeo.com/video/${getVimeoId(story.video)}`}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </li>
                ))}
              
            </ul>
          </div>
        );
}