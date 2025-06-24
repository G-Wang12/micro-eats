import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RestaurantCard = ({ 
  restaurant, 
  onSelect, 
  onDirections, 
  onViewDetails, 
  isSelected = false,
  compact = false 
}) => {
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

  const getBusyLevelColor = (level) => {
    switch (level) {
      case 'low': return 'bg-success';
      case 'moderate': return 'bg-warning';
      case 'busy': return 'bg-error';
      default: return 'bg-text-tertiary';
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

  if (compact) {
    return (
      <div 
        className={`cursor-pointer transition-all duration-200 hover:bg-surface-hover rounded-lg p-2 ${
          isSelected ? 'bg-primary-50 border-l-4 border-primary' : ''
        }`}
        onClick={onSelect}
      >
        <div className="flex items-start space-x-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary truncate">{restaurant.name}</h3>
                <p className="text-sm text-text-secondary">{restaurant.cuisine}</p>
              </div>
              
              <div className="flex items-center space-x-1 ml-2">
                <Icon name="Star" size={14} className="text-accent" fill="currentColor" />
                <span className="text-sm font-medium text-text-primary">{restaurant.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-medium ${getStatusColor(restaurant.status)}`}>
                  {getStatusText(restaurant.status)}
                </span>
                <span className="text-xs text-text-tertiary">•</span>
                <span className="text-xs text-text-tertiary">{restaurant.walkingTime}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDirections();
                  }}
                  className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <Icon name="Navigation" size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails();
                  }}
                  className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <Icon name="ExternalLink" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-surface rounded-lg shadow-card border border-border-light overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-medium hover:scale-[1.02] ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      <div className="relative">
        <div className="h-48 overflow-hidden">
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
        
        {/* Busy Level Indicator */}
        <div className="absolute top-3 right-3 flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${getBusyLevelColor(restaurant.busyLevel)}`} />
          <span className="text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded-full capitalize">
            {restaurant.busyLevel}
          </span>
        </div>
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
        
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">{restaurant.description}</p>
        
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
            {restaurant.dietaryOptions.slice(0, 3).map((option) => (
              <span
                key={option}
                className="px-2 py-1 bg-secondary-50 text-secondary-600 text-xs font-medium rounded-full"
              >
                {option}
              </span>
            ))}
            {restaurant.dietaryOptions.length > 3 && (
              <span className="px-2 py-1 bg-background text-text-tertiary text-xs font-medium rounded-full">
                +{restaurant.dietaryOptions.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDirections();
            }}
            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Navigation" size={16} />
            <span>Directions</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-surface border border-border text-text-primary rounded-lg font-medium hover:bg-surface-hover transition-colors duration-200"
          >
            <span>View Details</span>
            <Icon name="ExternalLink" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;