import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TrendingSection = () => {
  const trendingRestaurants = [
    {
      id: "trend-001",
      name: "Fusion Bistro",
      cuisine: "Fusion",
      rating: 4.9,
      reviewCount: 89,
      priceRange: 3,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      status: "open",
      estimatedWaitTime: "25-30 min",
      distance: "0.6 miles",
      trendingReason: "Most reviewed this week",
      trendingIcon: "TrendingUp",
      popularDish: "Truffle Pasta"
    },
    {
      id: "trend-002",
      name: "Campus Coffee & More",
      cuisine: "Cafe",
      rating: 4.3,
      reviewCount: 234,
      priceRange: 1,
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
      status: "open",
      estimatedWaitTime: "5-10 min",
      distance: "0.1 miles",
      trendingReason: "Highest rated new arrival",
      trendingIcon: "Star",
      popularDish: "Iced Matcha Latte"
    },
    {
      id: "trend-003",
      name: "Taco Libre",
      cuisine: "Mexican",
      rating: 4.6,
      reviewCount: 156,
      priceRange: 2,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      status: "busy",
      estimatedWaitTime: "20-25 min",
      distance: "0.4 miles",
      trendingReason: "Most ordered today",
      trendingIcon: "Flame",
      popularDish: "Fish Tacos"
    },
    {
      id: "trend-004",
      name: "Noodle House",
      cuisine: "Asian",
      rating: 4.4,
      reviewCount: 198,
      priceRange: 2,
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
      status: "open",
      estimatedWaitTime: "15-20 min",
      distance: "0.3 miles",
      trendingReason: "Fastest growing popularity",
      trendingIcon: "Zap",
      popularDish: "Spicy Ramen"
    }
  ];

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
          <h2 className="text-xl font-bold text-text-primary flex items-center space-x-2">
            <Icon name="TrendingUp" size={24} className="text-accent" />
            <span>Trending Now</span>
          </h2>
          <p className="text-sm text-text-secondary">What's popular on campus today</p>
        </div>
        <Link
          to="/restaurant-browse-search?filter=trending"
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200"
        >
          View All
        </Link>
      </div>

      {/* Mobile Layout - Vertical Cards */}
      <div className="lg:hidden space-y-4">
        {trendingRestaurants.slice(0, 3).map((restaurant, index) => (
          <Link
            key={restaurant.id}
            to={`/restaurant-detail?id=${restaurant.id}`}
            className="card card-hover overflow-hidden"
          >
            <div className="flex">
              {/* Image */}
              <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Trending Badge */}
                <div className="absolute top-1 left-1">
                  <div className="bg-accent text-white p-1 rounded-full">
                    <Icon name={restaurant.trendingIcon} size={10} />
                  </div>
                </div>

                {/* Rank Badge */}
                <div className="absolute bottom-1 right-1">
                  <div className="bg-black/70 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                    #{index + 1}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-text-primary text-sm truncate pr-2">
                    {restaurant.name}
                  </h3>
                  <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    restaurant.status === 'open' ?'bg-success-100 text-success-600' 
                      : restaurant.status === 'busy' ?'bg-warning-100 text-warning-600' :'bg-error-100 text-error-600'
                  }`}>
                    <div className={`w-1 h-1 rounded-full ${
                      restaurant.status === 'open' ?'bg-success-600' 
                        : restaurant.status === 'busy' ?'bg-warning-600' :'bg-error-600'
                    }`}></div>
                    <span className="capitalize">{restaurant.status}</span>
                  </div>
                </div>

                <p className="text-xs text-text-secondary mb-1">{restaurant.cuisine}</p>
                
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

                {/* Trending Reason */}
                <div className="bg-accent-50 border border-accent-100 rounded px-2 py-1 mb-1">
                  <div className="flex items-center space-x-1">
                    <Icon name={restaurant.trendingIcon} size={10} className="text-accent" />
                    <span className="text-xs text-accent font-medium">
                      {restaurant.trendingReason}
                    </span>
                  </div>
                </div>

                {/* Popular Dish */}
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={10} />
                    <span>{restaurant.estimatedWaitTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="ChefHat" size={10} />
                    <span>{restaurant.popularDish}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop Layout - Grid */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6">
        {trendingRestaurants.map((restaurant, index) => (
          <Link
            key={restaurant.id}
            to={`/restaurant-detail?id=${restaurant.id}`}
            className="card card-hover overflow-hidden"
          >
            <div className="flex">
              {/* Image */}
              <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Trending Badge */}
                <div className="absolute top-2 left-2">
                  <div className="bg-accent text-white p-1.5 rounded-full">
                    <Icon name={restaurant.trendingIcon} size={14} />
                  </div>
                </div>

                {/* Rank Badge */}
                <div className="absolute bottom-2 right-2">
                  <div className="bg-black/70 text-white text-sm font-bold px-2 py-1 rounded">
                    #{index + 1}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    restaurant.status === 'open' ?'bg-success text-white' 
                      : restaurant.status === 'busy' ?'bg-warning text-white' :'bg-error text-white'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <span className="capitalize">{restaurant.status}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-text-primary mb-1">{restaurant.name}</h3>
                <p className="text-sm text-text-secondary mb-2">{restaurant.cuisine}</p>
                
                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(restaurant.rating)}
                    <span className="text-sm font-medium text-text-primary ml-1">
                      {restaurant.rating}
                    </span>
                    <span className="text-sm text-text-secondary">
                      ({restaurant.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    {renderPriceRange(restaurant.priceRange)}
                  </div>
                </div>

                {/* Trending Reason */}
                <div className="bg-accent-50 border border-accent-100 rounded-lg p-2 mb-2">
                  <div className="flex items-center space-x-1">
                    <Icon name={restaurant.trendingIcon} size={14} className="text-accent" />
                    <span className="text-sm text-accent font-medium">
                      {restaurant.trendingReason}
                    </span>
                  </div>
                </div>

                {/* Info Row */}
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{restaurant.estimatedWaitTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="ChefHat" size={12} />
                    <span>{restaurant.popularDish}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button for Mobile */}
      <div className="lg:hidden mt-4">
        <Link
          to="/restaurant-browse-search?filter=trending"
          className="w-full bg-surface border border-border text-text-primary py-3 px-4 rounded-lg font-medium text-center hover:bg-surface-hover transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>View All Trending</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default TrendingSection;