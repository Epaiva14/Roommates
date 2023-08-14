import React, { useState, useEffect } from 'react';
import image1 from '../components/images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import '../css/home.css';

const Slideshow = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    const images = [image1, image2, image3];

    return (
        <div className="slideshow">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className={index === currentImageIndex ? 'active' : ''}
                />
            ))}
        </div>
    );
};

export default Slideshow;