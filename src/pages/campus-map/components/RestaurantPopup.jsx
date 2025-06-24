import React, { useEffect, useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RestaurantPopup = ({ 
  restaurant, 
  onClose, 
  onDirections, 
  onViewDetails,
  showDirections = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-success';
      case 'closed': return 'text-error';
      case 'busy': return 'text-warning';
      default: return 'text-text-tertiary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'Open';
      case 'closed': return 'Closed';
      case 'busy': return 'Busy';
      default: return 'Unknown';
    }
  };

  const renderPriceRange = (range) => {
    return Array.from({ length: 4 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < range ? 'text-accent' : 'text-border-dark'}`}
      >
        $
      </span>
    ));
  };

  if (showDirections) {
    return (
      <div className="absolute bottom-4 left-4 right-4 z-1001 md:bottom-auto md:top-32 md:right-4 md:left-auto md:w-80">
        <div className={`bg-surface border border-border rounded-lg shadow-medium overflow-hidden transform transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Directions</h3>
              <button
                onClick={onClose}
                className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary truncate">{restaurant.name}</h4>
                <p className="text-sm text-text-secondary">{restaurant.cuisine}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Navigation" size={16} color="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">Walking directions</p>
                  <p className="text-xs text-text-secondary">Estimated time: {restaurant.walkingTime}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">Your Location</p>
                    <p className="text-xs text-text-secondary">Microsoft Campus</p>
                  </div>
                </div>
                
                <div className="ml-3 border-l-2 border-border-light h-4" />
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                    <Icon name="MapPin" size={12} color="white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{restaurant.name}</p>
                    <p className="text-xs text-text-secondary">Building 92, Level 1</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <button
                onClick={onViewDetails}
                className="flex-1 py-2 px-3 bg-surface border border-border text-text-primary rounded-lg font-medium hover:bg-surface-hover transition-colors duration-200"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  // Start navigation
                  console.log('Starting navigation to:', restaurant.name);
                }}
                className="flex-1 py-2 px-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                Start Navigation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 z-1001 md:bottom-auto md:top-32 md:right-4 md:left-auto md:w-80">
      <div className={`bg-surface border border-border rounded-lg shadow-medium overflow-hidden transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="relative">
          <div className="h-32 overflow-hidden">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Status Badge */}
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
            restaurant.status === 'open' ? 'bg-success text-white' :
            restaurant.status === 'closed'? 'bg-error text-white' : 'bg-warning text-white'
          }`}>
            {getStatusText(restaurant.status)}
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-text-primary truncate">{restaurant.name}</h3>
              <p className="text-sm text-text-secondary">{restaurant.cuisine}</p>
            </div>
            
            <div className="flex items-center space-x-1 ml-3">
              <Icon name="Star" size={16} className="text-accent" fill="currentColor" />
              <span className="font-medium text-text-primary">{restaurant.rating}</span>
              <span className="text-sm text-text-tertiary">({restaurant.reviewCount})</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} className="text-text-tertiary" />
                <span className="text-sm text-text-secondary">{restaurant.hours}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} className="text-text-tertiary" />
                <span className="text-sm text-text-secondary">{restaurant.walkingTime}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              {renderPriceRange(restaurant.priceRange)}
            </div>
          </div>
          
          {/* Dietary Options */}
          {restaurant.dietaryOptions.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {restaurant.dietaryOptions.slice(0, 2).map((option) => (
                <span
                  key={option}
                  className="px-2 py-1 bg-secondary-50 text-secondary-600 text-xs font-medium rounded-full"
                >
                  {option}
                </span>
              ))}
              {restaurant.dietaryOptions.length > 2 && (
                <span className="px-2 py-1 bg-background text-text-tertiary text-xs font-medium rounded-full">
                  +{restaurant.dietaryOptions.length - 2}
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onDirections}
              className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              <Icon name="Navigation" size={16} />
              <span>Directions</span>
            </button>
            
            <button
              onClick={onViewDetails}
              className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-surface border border-border text-text-primary rounded-lg font-medium hover:bg-surface-hover transition-colors duration-200"
            >
              <span>Details</span>
              <Icon name="ExternalLink" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPopup;