import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecommendedSection = () => {
  const scrollRef = useRef(null);

  const recommendedRestaurants = [
    {
      id: "rec-001",
      name: "Mediterranean Delights",
      cuisine: "Mediterranean",
      rating: 4.6,
      reviewCount: 128,
      priceRange: 2,
      image: "https://images.unsplash.com/photo-1544510808-0c8e1b6e2d2e?w=400&h=300&fit=crop",
      status: "open",
      estimatedWaitTime: "10-15 min",
      distance: "0.2 miles",
      matchReason: "Based on your love for healthy options"
    },
    {
      id: "rec-002",
      name: "Spice Route Indian",
      cuisine: "Indian",
      rating: 4.7,
      reviewCount: 256,
      priceRange: 2,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      status: "open",
      estimatedWaitTime: "20-25 min",
      distance: "0.4 miles",
      matchReason: "Similar to restaurants you\'ve rated highly"
    },
    {
      id: "rec-003",
      name: "Green Garden Salads",
      cuisine: "Healthy",
      rating: 4.5,
      reviewCount: 89,
      priceRange: 2,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      status: "open",
      estimatedWaitTime: "5-10 min",
      distance: "0.1 miles",
      matchReason: "Matches your dietary preferences"
    },
    {
      id: "rec-004",
      name: "Artisan Pizza Co.",
      cuisine: "Italian",
      rating: 4.8,
      reviewCount: 312,
      priceRange: 3,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      status: "busy",
      estimatedWaitTime: "30-35 min",
      distance: "0.5 miles",
      matchReason: "Popular among your colleagues"
    },
    {
      id: "rec-005",
      name: "Seoul Kitchen",
      cuisine: "Korean",
      rating: 4.4,
      reviewCount: 167,
      priceRange: 2,
      image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop",
      status: "open",
      estimatedWaitTime: "15-20 min",
      distance: "0.3 miles",
      matchReason: "New restaurant you might enjoy"
    }
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 280;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-accent" fill="currentColor" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={12} className="text-accent" fill="currentColor" style={{ opacity: 0.5 }} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-border-dark" />
      );
    }

    return stars;
  };

  const renderPriceRange = (range) => {
    return Array.from({ length: 4 }, (_, i) => (
      <span key={i} className={i < range ? "text-accent" : "text-border-dark"}>$</span>
    ));
  };

  return (
    <div className="px-4 lg:px-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Recommended for You</h2>
          <p className="text-sm text-text-secondary">Based on your preferences and activity</p>
        </div>
        <Link
          to="/restaurant-browse-search?filter=recommended"
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200"
        >
          View All
        </Link>
      </div>

      <div className="relative">
        {/* Desktop Navigation Buttons */}
        <div className="hidden lg:block">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-surface border border-border rounded-full shadow-card flex items-center justify-center hover:bg-surface-hover transition-all duration-200"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-surface border border-border rounded-full shadow-card flex items-center justify-center hover:bg-surface-hover transition-all duration-200"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recommendedRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant-detail?id=${restaurant.id}`}
              className="flex-shrink-0 w-64 lg:w-72 card card-hover overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    restaurant.status === 'open' ?'bg-success text-white' 
                      : restaurant.status === 'busy' ?'bg-warning text-white' :'bg-error text-white'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <span className="capitalize">{restaurant.status}</span>
                  </div>
                </div>

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 p-1.5 bg-surface/80 backdrop-blur-sm rounded-full hover:bg-surface transition-colors duration-200">
                  <Icon name="Heart" size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-text-primary mb-1 truncate">{restaurant.name}</h3>
                <p className="text-sm text-text-secondary mb-2">{restaurant.cuisine}</p>
                
                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(restaurant.rating)}
                    <span className="text-xs font-medium text-text-primary ml-1">
                      {restaurant.rating}
                    </span>
                    <span className="text-xs text-text-secondary">
                      ({restaurant.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs">
                    {renderPriceRange(restaurant.priceRange)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{restaurant.estimatedWaitTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>

                {/* Match Reason */}
                <div className="bg-primary-50 border border-primary-100 rounded-lg p-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Target" size={12} className="text-primary" />
                    <span className="text-xs text-primary font-medium">
                      {restaurant.matchReason}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedSection;