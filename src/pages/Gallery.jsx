import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Gallery.css';
import bidyuhiko1 from '../images/bidyuhiko/BIDYUHIKO 1.jpeg';
import bidyuhiko2 from '../images/bidyuhiko/BIDYUHIKO 2.jpeg';
import bidyuhiko3 from '../images/bidyuhiko/BIDYUHIKO 3.jpeg';
import me1 from '../images/me/Me 1.png';
import me2 from '../images/me/Me 2.png';
import me3 from '../images/me/Me 3.png';
import withHer1 from '../images/with her/with her 1.png';
import withHer2 from '../images/with her/with her 2.png';
import withHer3 from '../images/with her/with her 3.png';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      src: bidyuhiko1,
      title: 'Museum',
      category: 'Bidyuhiko'
    },
    {
      id: 2,
      src: bidyuhiko2,
      title: 'Ballet',
      category: 'Bidyuhiko'
    },
    {
      id: 3,
      src: bidyuhiko3,
      title: 'Reporting',
      category: 'Bidyuhiko'
    },
    {
      id: 4,
      src: me1,
      title: 'Jungle Book',
      category: 'Me'
    },
    {
      id: 5,
      src: me2,
      title: 'Mirror Shot',
      category: 'Me'
    },
    {
      id: 6,
      src: me3,
      title: 'Oki',
      category: 'Me'
    },
    {
      id: 7,
      src: withHer1,
      title: 'Laguna',
      category: 'With Her'
    },
    {
      id: 8,
      src: withHer2,
      title: 'Mirror Shot',
      category: 'With Her'
    },
    {
      id: 9,
      src: withHer3,
      title: 'Rainy?',
      category: 'With Her'
    }
  ];

  const categories = ['Me', 'Bidyuhiko', 'With Her'];
  const [activeCategory, setActiveCategory] = useState('Me');

  const filteredImages = images.filter(img => img.category === activeCategory);

  return (
    <div className="gallery-container">
      <motion.h1 
        className="page-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Photo Gallery
      </motion.h1>

      <motion.div 
        className="category-filters"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <motion.div 
        className="gallery-grid"
        layout
      >
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="gallery-item"
            layoutId={`gallery-item-${image.id}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            onClick={() => setSelectedImage(image)}
          >
            <div className="image-container">
              <img src={image.src} alt={image.title} />
              <div className="image-overlay">
                <h3>{image.title}</h3>
                <span className="category-tag">{image.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="lightbox-content"
              layoutId={`gallery-item-${selectedImage.id}`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut"
              }}
            >
              <img src={selectedImage.src} alt={selectedImage.title} />
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <span className="category-tag">{selectedImage.category}</span>
              </div>
              <button 
                className="close-button"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
