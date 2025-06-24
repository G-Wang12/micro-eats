import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ActivityTab = () => {
  const [activeSection, setActiveSection] = useState('reviews');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const reviewHistory = [
    {
      id: 1,
      restaurant: "The Commons Café",
      rating: 5,
      date: "2024-01-15",
      review: `Absolutely love this place! The coffee is consistently excellent and the breakfast sandwiches are made fresh daily. The staff is incredibly friendly and they remember your order after just a few visits. The atmosphere is perfect for both quick meetings and solo work sessions.

The seasonal menu changes keep things interesting, and I particularly enjoy their fall pumpkin spice offerings. Highly recommend the avocado toast with everything bagel seasoning - it's become my go-to breakfast.`,
      helpful: 12,
      restaurantImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
      canEdit: true
    },
    {
      id: 2,
      restaurant: "Spice Route Indian Kitchen",
      rating: 4,
      date: "2024-01-10",
      review: "Great authentic Indian flavors with generous portions. The butter chicken is creamy and perfectly spiced. Service can be a bit slow during lunch rush, but the food quality makes up for it. The naan bread is freshly baked and delicious.",
      helpful: 8,
      restaurantImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      canEdit: true
    },
    {
      id: 3,
      restaurant: "Green Garden Salads",
      rating: 3,
      date: "2024-01-05",
      review: "Decent salad options with fresh ingredients. The build-your-own concept is nice, but prices are a bit high for what you get. The quinoa bowls are filling and healthy. Would like to see more protein options.",
      helpful: 5,
      restaurantImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      canEdit: true
    }
  ];

  const favoriteRestaurants = [
    {
      id: 1,
      name: "The Commons Café",
      cuisine: "American, Coffee",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
      priceRange: "$$",
      status: "Open"
    },
    {
      id: 2,
      name: "Sakura Sushi Bar",
      cuisine: "Japanese",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      priceRange: "$$$",
      status: "Open"
    },
    {
      id: 3,
      name: "Mediterranean Grill",
      cuisine: "Mediterranean",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1544510808-5e41d7d2c9b8?w=400&h=300&fit=crop",
      priceRange: "$$",
      status: "Closed"
    },
    {
      id: 4,
      name: "Taco Libre",
      cuisine: "Mexican",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      priceRange: "$",
      status: "Open"
    }
  ];

  const handleDeleteReview = (reviewId) => {
    setSelectedReview(reviewId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log('Deleting review:', selectedReview);
    setShowDeleteModal(false);
    setSelectedReview(null);
  };

  const handleUnfavorite = (restaurantId) => {
    // Handle unfavorite logic here
    console.log('Unfavoriting restaurant:', restaurantId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Toggle */}
      <div className="flex space-x-1 bg-background rounded-lg p-1">
        <button
          onClick={() => setActiveSection('reviews')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeSection === 'reviews' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          My Reviews
        </button>
        <button
          onClick={() => setActiveSection('favorites')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeSection === 'favorites' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Favorite Restaurants
        </button>
      </div>

      {/* Reviews Section */}
      {activeSection === 'reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">My Reviews</h2>
            <span className="text-sm text-text-secondary">{reviewHistory.length} reviews</span>
          </div>

          <div className="space-y-4">
            {reviewHistory.map((review) => (
              <div key={review.id} className="bg-surface rounded-lg shadow-card border border-border-light p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={review.restaurantImage}
                      alt={review.restaurant}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        to="/restaurant-detail"
                        className="text-lg font-semibold text-text-primary hover:text-primary transition-colors duration-200"
                      >
                        {review.restaurant}
                      </Link>
                      {review.canEdit && (
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200">
                            <Icon name="Edit2" size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                          >
                            <Icon name="Trash2" size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={16}
                            className={star <= review.rating ? 'text-accent' : 'text-border-dark'}
                            fill={star <= review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-text-secondary">{formatDate(review.date)}</span>
                    </div>

                    <p className="text-text-primary mb-4 leading-relaxed">{review.review}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="ThumbsUp" size={14} />
                        <span>{review.helpful} people found this helpful</span>
                      </div>
                      <Link
                        to="/restaurant-detail"
                        className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200"
                      >
                        View Restaurant
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Favorites Section */}
      {activeSection === 'favorites' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Favorite Restaurants</h2>
            <span className="text-sm text-text-secondary">{favoriteRestaurants.length} favorites</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-surface rounded-lg shadow-card border border-border-light overflow-hidden group">
                <div className="relative">
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleUnfavorite(restaurant.id)}
                      className="w-8 h-8 bg-surface bg-opacity-90 rounded-full flex items-center justify-center text-accent hover:bg-opacity-100 transition-all duration-200"
                    >
                      <Icon name="Heart" size={16} fill="currentColor" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      restaurant.status === 'Open' ?'bg-success text-white' :'bg-error text-white'
                    }`}>
                      {restaurant.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">{restaurant.name}</h3>
                    <span className="text-sm font-medium text-text-secondary">{restaurant.priceRange}</span>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-accent" fill="currentColor" />
                      <span className="text-sm font-medium text-text-primary">{restaurant.rating}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Link
                        to="/restaurant-detail"
                        className="px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors duration-200"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1002 p-4">
          <div className="bg-surface rounded-lg shadow-medium max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Delete Review</h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 bg-error text-white rounded-lg font-medium hover:bg-error-600 transition-colors duration-200"
              >
                Delete Review
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 text-text-secondary border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTab;