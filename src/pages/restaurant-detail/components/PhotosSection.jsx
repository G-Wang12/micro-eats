import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PhotosSection = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [imageFilter, setImageFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Photos' },
    { value: 'food', label: 'Food' },
    { value: 'interior', label: 'Interior' },
    { value: 'exterior', label: 'Exterior' }
  ];

  // Mock categorized images (in real app, this would come from API)
  const categorizedImages = images.map((image, index) => ({
    src: image,
    category: index % 3 === 0 ? 'food' : index % 3 === 1 ? 'interior' : 'exterior',
    alt: `Restaurant photo ${index + 1}`
  }));

  const filteredImages = imageFilter === 'all' 
    ? categorizedImages 
    : categorizedImages.filter(img => img.category === imageFilter);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction) => {
    if (selectedImageIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % filteredImages.length
      : selectedImageIndex === 0 
        ? filteredImages.length - 1 
        : selectedImageIndex - 1;
    
    setSelectedImageIndex(newIndex);
  };

  const handleKeyDown = (e) => {
    if (selectedImageIndex === null) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft': navigateImage('prev');
        break;
      case 'ArrowRight': navigateImage('next');
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex]);

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          Photos ({filteredImages.length})
        </h2>
        <div className="flex space-x-1 bg-background p-1 rounded-lg">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setImageFilter(option.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                imageFilter === option.value
                  ? 'bg-surface text-primary-600 shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
              <Icon 
                name="Expand" 
                size={24} 
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Camera" size={32} className="text-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Photos Found</h3>
          <p className="text-text-secondary">
            No photos available for the selected category.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-1003 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4 w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 z-10"
            >
              <Icon name="X" size={24} />
            </button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 z-10"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 z-10"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <div className="flex items-center justify-center h-full">
              <Image
                src={filteredImages[selectedImageIndex].src}
                alt={filteredImages[selectedImageIndex].alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
              {selectedImageIndex + 1} of {filteredImages.length}
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
              <span className="capitalize">{filteredImages[selectedImageIndex].category}</span>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photos CTA */}
      <div className="bg-background rounded-lg p-6 text-center border border-border-light">
        <Icon name="Camera" size={32} className="text-text-tertiary mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Share Your Experience
        </h3>
        <p className="text-text-secondary mb-4">
          Help other diners by sharing photos of your meal and the restaurant atmosphere.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 inline-flex items-center space-x-2">
          <Icon name="Upload" size={18} />
          <span>Upload Photos</span>
        </button>
      </div>
    </div>
  );
};

export default PhotosSection;