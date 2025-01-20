import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AxiosSecure from '../../../Components/Hooks/AxiosSecure';

export default function AddBlogPage() {
  const axioSecure = AxiosSecure();
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('<p></p>'); 
  const [loading, setLoading] = useState(false);

  const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  // Function to validate content
  const isContentValid = (content) => {
    const sanitizedContent = content.trim();
    return (
      sanitizedContent &&
      sanitizedContent !== '<p><br></p>' && 
      sanitizedContent !== '<p>&nbsp;</p>'
    );
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(imageHostingApi, formData);
        setThumbnail(response.data.data.display_url);
      ;
      } catch (error) {
       
      }
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!title || !thumbnail || !isContentValid(content)) {
      Swal.fire('Error', 'Please fill in all fields with valid data', 'error');
      return;
    }

    const blogData = {
      title,
      thumbnail,
      content,
      status: 'draft',
    };

    setLoading(true);
    try {
      const response = await axioSecure.post('/blogs', blogData);
      if(response.data.insertedId){
        Swal.fire('Success', 'Blog created successfully!', 'success');
        setTitle('');
        setThumbnail('');
        setContent('<p></p>'); 
      }
      console.log('Blog Response:', response.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to create blog', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Blog Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Thumbnail Image */}
        <div>
          <label htmlFor="thumbnail" className="block text-lg font-medium">Thumbnail Image</label>
          <input
            id="thumbnail"
            type="file"
            onChange={handleImageUpload}
            className="input input-bordered w-full"
            accept="image/*"
            required
          />
          {thumbnail && (
            <img src={thumbnail} alt="Thumbnail preview" className="mt-4 max-w-xs rounded-md" />
          )}
        </div>

        {/* Blog Content */}
        <div>
          <label htmlFor="content" className="block text-lg font-medium">Content</label>
          <JoditEditor
            value={content}
            onChange={(value) => setContent(value)}
            config={{
              readonly: false,
              height: 400,
            }}
          />
          {!isContentValid(content) && (
            <p className="text-red-500 text-sm mt-1">Please add valid content.</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`btn bg-blue-600 text-white ${loading || !isContentValid(content) ? 'opacity-50' : ''}`}
            disabled={loading || !isContentValid(content)}
          >
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
        </div>
      </form>
    </div>
  );
}
