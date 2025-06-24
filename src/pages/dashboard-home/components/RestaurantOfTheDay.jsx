import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RestaurantOfTheDay = () => {
  const restaurantOfTheDay = {
    id: "rotd-001",
    name: "Sakura Sushi & Ramen",
    cuisine: "Japanese",
    rating: 4.8,
    reviewCount: 342,
    priceRange: 3,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
    description: "Authentic Japanese cuisine featuring fresh sushi, traditional ramen, and seasonal specialties. Known for their premium ingredients and skilled chefs.",
    specialOffer: "20% off lunch combos today!",
    status: "open",
    estimatedWaitTime: "15-20 min",
    distance: "0.3 miles",
    highlights: ["Fresh Sushi", "Authentic Ramen", "Vegetarian Options"],
    openUntil: "9:00 PM"
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-accent" fill="currentColor" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-accent" fill="currentColor" style={{ opacity: 0.5 }} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-border-dark" />
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
        <h2 className="text-xl font-bold text-text-primary">Restaurant of the Day</h2>
        <div className="flex items-center space-x-1 text-accent">
          <Icon name="Award" size={20} />
          <span className="text-sm font-medium">Featured</span>
        </div>
      </div>

      <div className="card card-hover overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-48 lg:h-64 overflow-hidden">
          <Image
            src={restaurantOfTheDay.image}
            alt={restaurantOfTheDay.name}
            className="w-full h-full object-cover"
          />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
              restaurantOfTheDay.status === 'open' ?'bg-success text-white' :'bg-error text-white'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                restaurantOfTheDay.status === 'open' ? 'bg-white' : 'bg-white'
              }`}></div>
              <span className="capitalize">{restaurantOfTheDay.status}</span>
            </div>
          </div>

          {/* Special Offer Badge */}
          {restaurantOfTheDay.specialOffer && (
            <div className="absolute top-4 right-4">
              <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                <Icon name="Percent" size={14} className="inline mr-1" />
                Special Offer
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-primary mb-1">{restaurantOfTheDay.name}</h3>
              <p className="text-text-secondary text-sm mb-2">{restaurantOfTheDay.cuisine}</p>
              
              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  {renderStars(restaurantOfTheDay.rating)}
                  <span className="text-sm font-medium text-text-primary ml-1">
                    {restaurantOfTheDay.rating}
                  </span>
                </div>
                <span className="text-sm text-text-secondary">
                  ({restaurantOfTheDay.reviewCount} reviews)
                </span>
              </div>

              {/* Price Range */}
              <div className="flex items-center space-x-1 text-sm">
                {renderPriceRange(restaurantOfTheDay.priceRange)}
                <span className="text-text-secondary ml-2">• {restaurantOfTheDay.distance}</span>
              </div>
            </div>

            {/* Favorite Button */}
            <button className="p-2 text-text-secondary hover:text-accent transition-colors duration-200">
              <Icon name="Heart" size={24} />
            </button>
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {restaurantOfTheDay.description}
          </p>

          {/* Special Offer */}
          {restaurantOfTheDay.specialOffer && (
            <div className="bg-accent-50 border border-accent-100 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Gift" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">
                  {restaurantOfTheDay.specialOffer}
                </span>
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-4">
            {restaurantOfTheDay.highlights.map((highlight, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Info Row */}
          <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>Wait: {restaurantOfTheDay.estimatedWaitTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>Open until {restaurantOfTheDay.openUntil}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Link
              to={`/restaurant-detail?id=${restaurantOfTheDay.id}`}
              className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-primary-700 transition-colors duration-200"
            >
              View Details
            </Link>
            <Link
              to={`/campus-map?restaurant=${restaurantOfTheDay.id}`}
              className="flex items-center justify-center px-4 py-3 bg-surface border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200"
            >
              <Icon name="Navigation" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantOfTheDay;