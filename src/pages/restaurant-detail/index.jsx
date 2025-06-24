import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

import ContextualActionBar from 'components/ui/ContextualActionBar';
import RestaurantHero from './components/RestaurantHero';
import RestaurantInfo from './components/RestaurantInfo';
import MenuSection from './components/MenuSection';
import ReviewsSection from './components/ReviewsSection';
import PhotosSection from './components/PhotosSection';

const RestaurantDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const restaurantId = searchParams.get('id') || '1';

  // Mock restaurant data
  const mockRestaurant = {
    id: '1',
    name: 'The Commons Café',
    cuisine: 'American Fusion',
    rating: 4.3,
    reviewCount: 247,
    priceRange: 2,
    status: 'open',
    busyLevel: 'moderate',
    hours: {
      monday: '7:00 AM - 8:00 PM',
      tuesday: '7:00 AM - 8:00 PM',
      wednesday: '7:00 AM - 8:00 PM',
      thursday: '7:00 AM - 8:00 PM',
      friday: '7:00 AM - 6:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    currentHours: '7:00 AM - 8:00 PM',
    nextStatusChange: 'Closes at 8:00 PM',
    description: `The Commons Café offers a modern dining experience with fresh, locally-sourced ingredients and innovative American fusion cuisine. Located in the heart of Building 92, we provide a comfortable atmosphere perfect for quick lunches, casual meetings, or relaxed dining with colleagues.

Our menu features seasonal specialties, healthy options, and comfort food favorites, all prepared with attention to quality and presentation. We pride ourselves on accommodating various dietary preferences including vegetarian, vegan, and gluten-free options.`,
    location: {
      building: 'Building 92',
      floor: 'Ground Floor',
      address: '1 Microsoft Way, Redmond, WA 98052',
      coordinates: { lat: 47.6423, lng: -122.1390 }
    },
    contact: {
      phone: '(425) 555-0192',
      email: 'commons.cafe@microsoft.com'
    },
    features: [
      'Free Wi-Fi',
      'Outdoor Seating',
      'Wheelchair Accessible',
      'Takeout Available',
      'Corporate Catering',
      'Meeting Room Adjacent'
    ],
    dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop'
    ],
    menu: {
      breakfast: [
        {
          id: 1,
          name: 'Artisan Breakfast Bowl',
          description: 'Quinoa, roasted vegetables, avocado, poached egg, hollandaise',
          price: 12.99,
          dietary: ['Vegetarian', 'Gluten-Free'],
          image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&h=200&fit=crop'
        },
        {
          id: 2,
          name: 'Classic Benedict',
          description: 'English muffin, Canadian bacon, poached eggs, hollandaise',
          price: 14.99,
          dietary: [],
          image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=300&h=200&fit=crop'
        }
      ],
      lunch: [
        {
          id: 3,
          name: 'Grilled Salmon Salad',
          description: 'Atlantic salmon, mixed greens, quinoa, cherry tomatoes, lemon vinaigrette',
          price: 16.99,
          dietary: ['Gluten-Free', 'Dairy-Free'],
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop'
        },
        {
          id: 4,
          name: 'Truffle Mac & Cheese',
          description: 'House-made pasta, aged cheddar, gruyere, truffle oil, breadcrumb topping',
          price: 13.99,
          dietary: ['Vegetarian'],
          image: 'https://images.unsplash.com/photo-1543826173-1ad8b8e5e9b7?w=300&h=200&fit=crop'
        },
        {
          id: 5,
          name: 'BBQ Pulled Pork Sandwich',
          description: 'Slow-cooked pork shoulder, house BBQ sauce, coleslaw, brioche bun',
          price: 15.99,
          dietary: [],
          image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=200&fit=crop'
        }
      ],
      beverages: [
        {
          id: 6,
          name: 'Craft Cold Brew',
          description: 'House-roasted beans, smooth and rich',
          price: 4.99,
          dietary: ['Vegan'],
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop'
        },
        {
          id: 7,
          name: 'Fresh Fruit Smoothie',
          description: 'Seasonal fruits, yogurt, honey, granola topping',
          price: 6.99,
          dietary: ['Vegetarian', 'Gluten-Free'],
          image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&h=200&fit=crop'
        }
      ]
    },
    reviews: [
      {
        id: 1,
        userName: 'Sarah Chen',
        userAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        rating: 5,
        date: '2024-01-15',
        text: `Absolutely love this place! The atmosphere is perfect for both quick lunches and longer meetings. The salmon salad is incredible - fresh, well-seasoned, and perfectly portioned. Staff is always friendly and the service is consistently fast. This has become my go-to spot for client lunches.`,
        helpful: 12,
        images: ['https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop']
      },
      {
        id: 2,
        userName: 'Michael Rodriguez',
        userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 4,
        date: '2024-01-12',
        text: `Great food quality and variety. The truffle mac & cheese is outstanding - rich and creamy with just the right amount of truffle flavor. Only minor complaint is that it can get quite busy during peak lunch hours, but the food is worth the wait.`,
        helpful: 8,
        images: []
      },
      {
        id: 3,
        userName: 'Jennifer Park',
        userAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        rating: 5,
        date: '2024-01-10',
        text: `As someone with dietary restrictions, I really appreciate how accommodating they are. The gluten-free options are clearly marked and taste amazing. The breakfast bowl is my favorite - packed with nutrients and flavor. The staff is knowledgeable about ingredients too.`,
        helpful: 15,
        images: ['https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop']
      }
    ],
    ratingBreakdown: {
      5: 156,
      4: 67,
      3: 18,
      2: 4,
      1: 2
    }
  };

  useEffect(() => {
    // Simulate API call
    const fetchRestaurant = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setRestaurant(mockRestaurant);
      setLoading(false);
    };

    fetchRestaurant();
  }, [restaurantId]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'menu', label: 'Menu', icon: 'Menu' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'photos', label: 'Photos', icon: 'Camera' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="AlertCircle" size={32} color="var(--color-error)" />
          </div>
          <h1 className="text-xl font-semibold text-text-primary mb-2">Restaurant Not Found</h1>
          <p className="text-text-secondary mb-6">
            Sorry, we couldn't find the restaurant you're looking for.
          </p>
          <Link
            to="/restaurant-browse-search"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="ArrowLeft" size={18} />
            <span>Back to Browse</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <div className="bg-surface border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to="/dashboard-home"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Icon name="ChevronRight" size={16} className="text-text-tertiary" />
            <Link
              to="/restaurant-browse-search"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Browse Restaurants
            </Link>
            <Icon name="ChevronRight" size={16} className="text-text-tertiary" />
            <span className="text-text-primary font-medium">{restaurant.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:space-x-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Section */}
            <RestaurantHero restaurant={restaurant} />

            {/* Restaurant Header Info - Mobile */}
            <div className="lg:hidden px-4 py-6 bg-surface border-b border-border-light">
              <h1 className="text-2xl font-bold text-text-primary mb-2">{restaurant.name}</h1>
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-text-secondary">{restaurant.cuisine}</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-accent" fill="currentColor" />
                  <span className="font-medium text-text-primary">{restaurant.rating}</span>
                  <span className="text-text-secondary">({restaurant.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: restaurant.priceRange }, (_, i) => (
                    <span key={i} className="text-accent font-medium">$</span>
                  ))}
                  {Array.from({ length: 4 - restaurant.priceRange }, (_, i) => (
                    <span key={i} className="text-text-tertiary">$</span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                  restaurant.status === 'open' ?'bg-success-100 text-success-600' :'bg-error-100 text-error-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    restaurant.status === 'open' ? 'bg-success-500' : 'bg-error-500'
                  }`}></div>
                  <span>{restaurant.status === 'open' ? 'Open' : 'Closed'}</span>
                </div>
                <span className="text-text-secondary text-sm">{restaurant.nextStatusChange}</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-surface border-b border-border-light sticky top-16 z-50">
              <div className="px-4 sm:px-6 lg:px-8">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-primary text-primary-600' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-dark'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              {activeTab === 'overview' && <RestaurantInfo restaurant={restaurant} />}
              {activeTab === 'menu' && <MenuSection menu={restaurant.menu} />}
              {activeTab === 'reviews' && (
                <ReviewsSection 
                  reviews={restaurant.reviews} 
                  ratingBreakdown={restaurant.ratingBreakdown}
                  averageRating={restaurant.rating}
                  totalReviews={restaurant.reviewCount}
                />
              )}
              {activeTab === 'photos' && <PhotosSection images={restaurant.images} />}
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 bg-surface border-l border-border-light">
            <div className="sticky top-28 p-6">
              <h1 className="text-2xl font-bold text-text-primary mb-2">{restaurant.name}</h1>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-text-secondary">{restaurant.cuisine}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-accent" fill="currentColor" />
                    <span className="font-medium text-text-primary">{restaurant.rating}</span>
                  </div>
                  <span className="text-text-secondary">({restaurant.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-text-secondary">Price:</span>
                  <div className="flex items-center">
                    {Array.from({ length: restaurant.priceRange }, (_, i) => (
                      <span key={i} className="text-accent font-medium">$</span>
                    ))}
                    {Array.from({ length: 4 - restaurant.priceRange }, (_, i) => (
                      <span key={i} className="text-text-tertiary">$</span>
                    ))}
                  </div>
                </div>

                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  restaurant.status === 'open' ?'bg-success-100 text-success-600' :'bg-error-100 text-error-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    restaurant.status === 'open' ? 'bg-success-500' : 'bg-error-500'
                  }`}></div>
                  <span className="font-medium">
                    {restaurant.status === 'open' ? 'Open' : 'Closed'}
                  </span>
                  <span className="text-sm">• {restaurant.nextStatusChange}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-medium text-text-primary mb-2">Location</h3>
                  <p className="text-sm text-text-secondary">{restaurant.location.building}</p>
                  <p className="text-sm text-text-secondary">{restaurant.location.floor}</p>
                </div>

                <div>
                  <h3 className="font-medium text-text-primary mb-2">Hours Today</h3>
                  <p className="text-sm text-text-secondary">{restaurant.currentHours}</p>
                </div>

                <div>
                  <h3 className="font-medium text-text-primary mb-2">Contact</h3>
                  <p className="text-sm text-text-secondary">{restaurant.contact.phone}</p>
                </div>
              </div>

              <ContextualActionBar 
                restaurantId={restaurant.id}
                className="flex-col space-y-3 space-x-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar */}
      <ContextualActionBar 
        restaurantId={restaurant.id}
        className="lg:hidden"
      />
    </div>
  );
};

export default RestaurantDetail;