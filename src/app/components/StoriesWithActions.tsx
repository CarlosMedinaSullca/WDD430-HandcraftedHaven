'use client';

import { useState, useEffect } from "react";
import {useSession} from 'next-auth/react';
import Stories from './stories';
import CreateStoryModal from  './CreateStoryModal';
import { Story, Artisan} from "@/app/types/interfacesModels";


interface StoriesWithActionsProps {
    artisan?: Artisan | null;
    initialStories: Story[];
}

// export default function StoriesWithActions({artisan, initialStories}: StoriesWithActionsProps) {
//     const { data: session } = useSession();
//     const [isModalOpen, setIsModalOpen] =useState(false);
//     // const [stories, setStories] = useState<Story[]>(initialStories);

//     // Check if current user is the artisan who owns this profile
//     const isArtisanOwner = session?.user?.id === artisan?._id;

//     useEffect(() => {
//     console.log('StoriesWithActions rendered');
// });

//     const handleStoryCreated = async () => {
//         window.location.reload();

//         // console.log('Refreshing stories after creation...');
//         // // Refresh stories data
//         // try{
//         //     const artisan_id = artisan?._id;
//         //     const baseUrl = process.env.NODE_ENV === 'production' 
//         //     ? 'https://wdd-430-handcrafted-haven-kappa.vercel.app'
//         //     : 'http://localhost:3000';

//         //     const url = artisan_id
//         //     ? `${baseUrl}/api/stories?artisan_id=${artisan_id}`
//         //     : `${baseUrl}/api/stories`;

//         //     const res = await fetch(url, {
//         //           cache: 'no-store',
//         //     });

//         //     if (res.ok) {
//         //         const newStories = await res.json();
//         //         setStories(newStories);
//         //         console.log('Stories refreshed successfully');
//         //     }
//         // } catch (error) {
//         //     console.error('Error refreshing stories:', error);
//         // }
//     };

//     return (
//         <>
//         <div className="relative">
//             {/* Add sotry Button - Only show for artisan owner */}
//             {isArtisanOwner && (
//                 <button 
//                 onClick={() => setIsModalOpen(true)}
//                 className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm z-10"
//                 >
//                     + Add Story
//                 </button>
//             )}

//             {/* Server component for display */}
//             <Stories
//             artisan={artisan} 
//             stories={story}
//             isArtisanOwner= {isArtisanOwner}
//             />
//         </div>

//         {/* Create story modal */}
//         <CreateStoryModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onStoryCreated={handleStoryCreated}
//         artisanId={artisan?._id || ''}
//         />
//         </>
//     )

// }