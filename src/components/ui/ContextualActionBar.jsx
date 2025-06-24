import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ContextualActionBar = ({ 
  restaurantId, 
  isFavorited = false, 
  showDirections = true, 
  showShare = true, 
  showReview = true,
  className = "" 
}) => {
  const [isFavorite, setIsFavorite] = useState(isFavorited);
  const [isSharing, setIsSharing] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Handle favorite logic here
    console.log(`${isFavorite ? 'Removed from' : 'Added to'} favorites:`, restaurantId);
  };

  const handleDirections = () => {
    // Navigate to map with restaurant location
    navigate(`/campus-map?restaurant=${restaurantId}`);
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this restaurant',
          text: 'Found this great restaurant on Campus Eats',
          url: window.location.href,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // Show toast notification here
        console.log('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleWriteReview = () => {
    navigate(`/write-review?restaurant=${restaurantId}`);
  };

  return (
    <>
      {/* Mobile Floating Action Buttons */}
      <div className={`md:hidden fixed bottom-20 right-4 flex flex-col space-y-3 z-999 ${className}`}>
        {showReview && (
          <button
            onClick={handleWriteReview}
            className="w-14 h-14 bg-primary text-white rounded-full shadow-medium flex items-center justify-center transition-all duration-200 hover:bg-primary-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Icon name="PenTool" size={20} />
          </button>
        )}
        
        {showDirections && (
          <button
            onClick={handleDirections}
            className="w-12 h-12 bg-surface text-text-primary rounded-full shadow-card border border-border-light flex items-center justify-center transition-all duration-200 hover:bg-surface-hover hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Icon name="Navigation" size={18} />
          </button>
        )}
        
        <button
          onClick={handleFavoriteToggle}
          className={`w-12 h-12 rounded-full shadow-card border border-border-light flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isFavorite 
              ? 'bg-accent text-white hover:bg-accent-600 focus:ring-accent-500' :'bg-surface text-text-primary hover:bg-surface-hover focus:ring-primary-500'
          }`}
        >
          <Icon name={isFavorite ? "Heart" : "Heart"} size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        
        {showShare && (
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="w-12 h-12 bg-surface text-text-primary rounded-full shadow-card border border-border-light flex items-center justify-center transition-all duration-200 hover:bg-surface-hover hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name={isSharing ? "Loader2" : "Share"} size={18} className={isSharing ? "animate-spin" : ""} />
          </button>
        )}
      </div>

      {/* Desktop Inline Action Bar */}
      <div className={`hidden md:flex items-center space-x-4 ${className}`}>
        <button
          onClick={handleFavoriteToggle}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isFavorite 
              ? 'bg-accent text-white hover:bg-accent-600 focus:ring-accent-500' :'bg-surface text-text-primary border border-border hover:bg-surface-hover focus:ring-primary-500'
          }`}
        >
          <Icon name="Heart" size={18} fill={isFavorite ? "currentColor" : "none"} />
          <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
        </button>

        {showDirections && (
          <button
            onClick={handleDirections}
            className="flex items-center space-x-2 px-4 py-2 bg-surface text-text-primary border border-border rounded-lg font-medium transition-all duration-200 hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Icon name="Navigation" size={18} />
            <span>Directions</span>
          </button>
        )}

        {showShare && (
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center space-x-2 px-4 py-2 bg-surface text-text-primary border border-border rounded-lg font-medium transition-all duration-200 hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name={isSharing ? "Loader2" : "Share"} size={18} className={isSharing ? "animate-spin" : ""} />
            <span>Share</span>
          </button>
        )}

        {showReview && (
          <button
            onClick={handleWriteReview}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-medium transition-all duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Icon name="PenTool" size={18} />
            <span>Write Review</span>
          </button>
        )}
      </div>
    </>
  );
};

export default ContextualActionBar;