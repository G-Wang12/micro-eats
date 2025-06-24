import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const WriteReview = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get('restaurant') || '1';
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    overallRating: 0,
    foodQuality: 0,
    service: 0,
    value: 0,
    atmosphere: 0,
    reviewText: '',
    photos: [],
    isAnonymous: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Mock restaurant data
  const restaurant = {
    id: restaurantId,
    name: "The Commons Café",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
    cuisine: "American",
    rating: 4.2,
    priceRange: "$$",
    location: "Building 92, Level 1"
  };

  const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const maxPhotos = 5;
  const maxCharacters = 1000;

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.overallRating > 0 || formData.reviewText.trim()) {
        localStorage.setItem(`review-draft-${restaurantId}`, JSON.stringify(formData));
        setIsDraftSaved(true);
        setTimeout(() => setIsDraftSaved(false), 2000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData, restaurantId]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(`review-draft-${restaurantId}`);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, [restaurantId]);

  const handleRatingChange = (category, rating) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category] === rating ? 0 : rating
    }));
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharacters) {
      setFormData(prev => ({
        ...prev,
        reviewText: text
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = maxPhotos - formData.photos.length;
    const filesToAdd = files.slice(0, remainingSlots);

    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          file,
          preview: event.target.result,
          name: file.name
        };
        
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, newPhoto]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoDelete = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.overallRating === 0) {
      alert('Please provide an overall rating');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft
      localStorage.removeItem(`review-draft-${restaurantId}`);
      
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessAction = (action) => {
    if (action === 'share') {
      // Handle share logic
      console.log('Sharing review...');
    }
    navigate(`/restaurant-detail?id=${restaurantId}`);
  };

  const renderStarRating = (category, rating, size = 24) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(category, star)}
            className={`transition-all duration-200 hover:scale-110 ${
              star <= rating ? 'text-accent' : 'text-border-dark hover:text-accent'
            }`}
          >
            <Icon 
              name="Star" 
              size={size} 
              fill={star <= rating ? "currentColor" : "none"}
            />
          </button>
        ))}
      </div>
    );
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" />
          </div>
          <h1 className="text-2xl font-semibold text-text-primary mb-4">
            Review Submitted!
          </h1>
          <p className="text-text-secondary mb-8">
            Thank you for sharing your experience. Your review helps the campus community make better dining choices.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => handleSuccessAction('share')}
              className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              <Icon name="Share" size={18} />
              <span>Share Review</span>
            </button>
            <button
              onClick={() => handleSuccessAction('return')}
              className="w-full flex items-center justify-center space-x-2 bg-surface text-text-primary border border-border px-6 py-3 rounded-lg font-medium hover:bg-surface-hover transition-colors duration-200"
            >
              <span>Back to Restaurant</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border-light sticky top-16 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-all duration-200"
            >
              <Icon name="ArrowLeft" size={20} />
            </button>
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-semibold text-text-primary truncate">
                  {restaurant.name}
                </h1>
                <p className="text-sm text-text-secondary">
                  {restaurant.cuisine} • {restaurant.priceRange} • {restaurant.location}
                </p>
              </div>
            </div>
            {isDraftSaved && (
              <div className="flex items-center space-x-1 text-success text-sm">
                <Icon name="Check" size={16} />
                <span>Draft saved</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Overall Rating */}
          <div className="bg-surface rounded-lg p-6 border border-border-light">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Overall Rating *
            </h2>
            <div className="flex flex-col items-center space-y-4">
              {renderStarRating('overallRating', formData.overallRating, 32)}
              {formData.overallRating > 0 && (
                <p className="text-lg font-medium text-text-primary">
                  {ratingLabels[formData.overallRating - 1]}
                </p>
              )}
            </div>
          </div>

          {/* Category Ratings */}
          <div className="bg-surface rounded-lg p-6 border border-border-light">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Rate by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'foodQuality', label: 'Food Quality' },
                { key: 'service', label: 'Service' },
                { key: 'value', label: 'Value for Money' },
                { key: 'atmosphere', label: 'Atmosphere' }
              ].map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    {label}
                  </label>
                  {renderStarRating(key, formData[key], 20)}
                </div>
              ))}
            </div>
          </div>

          {/* Written Review */}
          <div className="bg-surface rounded-lg p-6 border border-border-light">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Share Your Experience
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-text-secondary space-y-1">
                  <p>• What did you order?</p>
                  <p>• What stood out about your experience?</p>
                  <p>• Any tips for other diners?</p>
                </div>
              </div>
              <div className="relative">
                <textarea
                  value={formData.reviewText}
                  onChange={handleTextChange}
                  placeholder="Write your review here..."
                  className="w-full h-32 md:h-40 px-4 py-3 border border-border rounded-lg bg-background text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                />
                <div className="absolute bottom-3 right-3 text-xs text-text-tertiary">
                  {formData.reviewText.length}/{maxCharacters}
                </div>
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="bg-surface rounded-lg p-6 border border-border-light">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Add Photos
            </h2>
            <div className="space-y-4">
              {/* Upload Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={formData.photos.length >= maxPhotos}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="Upload" size={18} />
                  <span>Upload Photos</span>
                </button>
                <button
                  type="button"
                  onClick={handleCameraCapture}
                  disabled={formData.photos.length >= maxPhotos}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-surface text-text-primary border border-border rounded-lg font-medium hover:bg-surface-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed md:hidden"
                >
                  <Icon name="Camera" size={18} />
                  <span>Take Photo</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <p className="text-sm text-text-secondary">
                Add up to {maxPhotos} photos to help others see what to expect
              </p>

              {/* Photo Previews */}
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {formData.photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-background">
                        <img
                          src={photo.preview}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePhotoDelete(photo.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-surface rounded-lg p-6 border border-border-light">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-text-primary">
                  Post Anonymously
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Your review will be posted without your name or profile information
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-background border-t border-border-light p-4 -mx-4">
            <button
              type="submit"
              disabled={formData.overallRating === 0 || isSubmitting}
              className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-6 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={20} className="animate-spin" />
                  <span>Submitting Review...</span>
                </>
              ) : (
                <>
                  <Icon name="Send" size={20} />
                  <span>Submit Review</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;