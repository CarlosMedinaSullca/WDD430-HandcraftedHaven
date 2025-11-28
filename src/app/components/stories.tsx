
'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useIsArtisan } from '@/app/components/authStore';
import Image from "next/image";
import {getStories} from "@/lib/story-actions";
import { Artisan, Story} from "@/app/types/interfacesModels";
import CreateStoryModal from './CreateStoryModal';
import { createStory } from '@/app/actions/storyActions';


// import { Story} from "@/app/types/interfacesModels";
interface storiesProps {
  artisan?: Artisan | null;
  stories: Story[];
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


export default function Stories({artisan, stories } : storiesProps) {
  // const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStories, setCurrentStories] = useState<Story[]>(stories);
  // const [stories, setStories] = useState<Story[]>(initialStories);
  const [isLoading, setIsLoading] = useState(false);

  // const isArtisanOwner = session?.user?.id === artisan?._id;

  const isArtisan = useIsArtisan();


  console.log('📖 Stories component - received props:', {
    artisan,
    storiesCount: stories.length,
    stories
  });
  const handleCreateStory = async (storyData: {
    text: string;
    picture1?: string;
    picture2?: string;
    video?: string;
  }) => {
    if (!artisan?._id) return;

    setIsLoading(true);
    
    try {
      const result = await createStory({
        ...storyData,
        artisan_id: artisan._id
      });

      if (result.success) {
        setIsModalOpen(false);
        
        // Optimistically update the UI
        const newStory: Story = {
          _id: result.storyId!,
          text: storyData.text,
          date: new Date().toISOString(),
          picture1: storyData.picture1 || '',
          picture2: storyData.picture2 || '',
          video: storyData.video || '',
          artisan_id: artisan._id
        };
        
        setCurrentStories(prev => [newStory, ...prev]);
      } else {
        alert(result.error || 'Failed to create story');
      }
    } catch (error) {
      console.error('Error creating story:', error);
      alert('Failed to create story');
    } finally {
      setIsLoading(false);
    }
  };

     
    return (
    <>
      <div className="border rounded-lg shadow-inner p-4 overflow-y-scroll no-scrollbar bg-white h-[40rem]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {/* {artisan ? `${artisan.first_name}'s Stories` : 'Stories'} ({currentStories.length}) */}
            Stories ({currentStories.length})
          </h2>
          
          {/* Add Story Button - Only show for artisan owner */}
          {/* {isArtisanOwner && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : '+ Add Story'}
            </button>
          )} */}

          { isArtisan && (
                      <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : '+ Add Story'}
          </button>
          )}
    
          {/* <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : '+ Add Story'}
          </button> */}
          

          {/* Always show Add Story button for testing */}
            {/* <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : '+ Add Story'}
            </button> */}

        </div>

        {/* <div className="bg-green-100 p-3 rounded mb-4">
          <p className="text-sm text-green-800">
            Props: {stories.length} stories | State: {currentStories.length} stories
          </p>
        </div> */}

        {/* Render stories if we have any, otherwise show empty state */}
        {currentStories.length > 0 ? (
          <ul className="grid gap-6">
            {currentStories.map((story) => (
              <li 
                key={story._id}
                className="border rounded-lg p-3 shadow hover:shadow-lg transition"
              >
                {story.text && (
                  <p className="text-gray-700 mb-2">{story.text}</p>
                )}
                
                {story.date && (
                  <p className="text-sm text-gray-500 mb-3">
                    {formatDate(story.date)}
                  </p>
                )}

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
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No stories available yet.</p>
            <p className="text-sm mt-2">Received {stories.length} stories from server</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create First Story
            </button>
          </div>
        )}       
        
      </div>

      {/* Create Story Modal */}
      <CreateStoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateStory}
        isLoading={isLoading}
      />

     
    </>


     );
}