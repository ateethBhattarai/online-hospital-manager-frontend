import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            await axios.post('/api/upload', formData);
            console.log('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            <button onClick={handleSubmit}>Upload Image</button>
        </div>
    );
};

export default ImageUploader;
