'use client';

import { useState } from 'react';
import {useSession} from 'next-auth/react';

interface CreateStoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStoryCreated: () => void;
    artisanId: string;
}

export default function CreateStoryModal({
    isOpen, 
    onClose,
    onStoryCreated,
    artisanId
}: CreateStoryModalProps) {
    const { data: session} = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        text: '',
        picture1: '',
        picture2: '',
        video:''

    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session || !artisanId) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('api/stories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    ...formData,
                    artisan_id: artisanId,
                }),
            });

            if (response.ok) {
                //Reset form and close modal
                setFormData({ text: '', picture1: '', picture2: '', video: ''});
                onStoryCreated();
                onClose()
            } else {
                console.error('Failed to create story');
            }
        } catch (error) {
            console.error('Error creating story:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Create New Story</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Story Text */}
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                Story Text *
              </label>
              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your story... What are you working on? What inspires you?"
              />
            </div>

            {/* Picture 1 */}
            <div>
              <label htmlFor="picture1" className="block text-sm font-medium text-gray-700 mb-1">
                Main Picture URL
              </label>
              <input
                type="url"
                id="picture1"
                name="picture1"
                value={formData.picture1}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Picture 2 */}
            <div>
              <label htmlFor="picture2" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Picture URL
              </label>
              <input
                type="url"
                id="picture2"
                name="picture2"
                value={formData.picture2}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image2.jpg"
              />
            </div>

            {/* Video */}
            <div>
              <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
                Video URL (Vimeo)
              </label>
              <input
                type="url"
                id="video"
                name="video"
                value={formData.video}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://vimeo.com/your-video"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.text.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create Story'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    );
}
