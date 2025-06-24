import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import FilterPanel from 'components/ui/FilterPanel';

const RestaurantBrowseSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    cuisineTypes: [],
    dietaryRestrictions: [],
    priceRange: [1, 4],
    rating: 0,
    distance: 1000,
    openNow: false
  });

  // Mock restaurant data
  const mockRestaurants = [
    {
      id: 1,
      name: "The Commons Café",
      cuisine: "American",
      rating: 4.5,
      reviewCount: 234,
      priceRange: 2,
      distance: 150,
      isOpen: true,
      status: "Open",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      dietaryOptions: ["Vegetarian", "Gluten-Free"],
      estimatedWaitTime: "5-10 min",
      description: "Fresh salads, sandwiches, and daily specials in a casual setting"
    },
    {
      id: 2,
      name: "Spice Route",
      cuisine: "Indian",
      rating: 4.7,
      reviewCount: 189,
      priceRange: 3,
      distance: 220,
      isOpen: true,
      status: "Busy",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      dietaryOptions: ["Vegetarian", "Vegan", "Halal"],
      estimatedWaitTime: "15-20 min",
      description: "Authentic Indian cuisine with aromatic spices and traditional recipes"
    },
    {
      id: 3,
      name: "Noodle Bar",
      cuisine: "Asian",
      rating: 4.3,
      reviewCount: 156,
      priceRange: 2,
      distance: 180,
      isOpen: false,
      status: "Closed",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
      dietaryOptions: ["Vegetarian"],
      estimatedWaitTime: "Closed until 11 AM",
      description: "Fresh ramen, pho, and Asian noodle dishes made to order"
    },
    {
      id: 4,
      name: "Mediterranean Grill",
      cuisine: "Mediterranean",
      rating: 4.6,
      reviewCount: 201,
      priceRange: 3,
      distance: 300,
      isOpen: true,
      status: "Open",
      image: "https://images.unsplash.com/photo-1544510808-5e41d7d2c9c8?w=400&h=300&fit=crop",
      dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free"],
      estimatedWaitTime: "10-15 min",
      description: "Fresh Mediterranean dishes with grilled meats and vegetables"
    },
    {
      id: 5,
      name: "Taco Junction",
      cuisine: "Mexican",
      rating: 4.4,
      reviewCount: 178,
      priceRange: 2,
      distance: 250,
      isOpen: true,
      status: "Open",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      dietaryOptions: ["Vegetarian", "Gluten-Free"],
      estimatedWaitTime: "8-12 min",
      description: "Authentic Mexican tacos, burritos, and fresh salsas"
    },
    {
      id: 6,
      name: "Sushi Express",
      cuisine: "Japanese",
      rating: 4.8,
      reviewCount: 267,
      priceRange: 4,
      distance: 320,
      isOpen: true,
      status: "Open",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      dietaryOptions: ["Gluten-Free"],
      estimatedWaitTime: "12-18 min",
      description: "Premium sushi and Japanese cuisine with fresh daily ingredients"
    },
    {
      id: 7,
      name: "Green Garden",
      cuisine: "Vegetarian",
      rating: 4.2,
      reviewCount: 143,
      priceRange: 2,
      distance: 190,
      isOpen: true,
      status: "Open",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free"],
      estimatedWaitTime: "6-10 min",
      description: "Plant-based meals, fresh salads, and healthy smoothies"
    },
    {
      id: 8,
      name: "Pizza Corner",
      cuisine: "Italian",
      rating: 4.1,
      reviewCount: 198,
      priceRange: 2,
      distance: 280,
      isOpen: true,
      status: "Busy",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      dietaryOptions: ["Vegetarian"],
      estimatedWaitTime: "20-25 min",
      description: "Wood-fired pizzas and Italian classics in a cozy atmosphere"
    }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'rating', label: 'Rating' },
    { value: 'distance', label: 'Distance' },
    { value: 'price', label: 'Price' },
    { value: 'popularity', label: 'Popularity' }
  ];

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let filtered = mockRestaurants.filter(restaurant => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = restaurant.name.toLowerCase().includes(query);
        const matchesCuisine = restaurant.cuisine.toLowerCase().includes(query);
        const matchesDescription = restaurant.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCuisine && !matchesDescription) return false;
      }

      // Cuisine filter
      if (filters.cuisineTypes.length > 0 && !filters.cuisineTypes.includes(restaurant.cuisine)) {
        return false;
      }

      // Dietary restrictions filter
      if (filters.dietaryRestrictions.length > 0) {
        const hasMatchingDietary = filters.dietaryRestrictions.some(dietary => 
          restaurant.dietaryOptions.includes(dietary)
        );
        if (!hasMatchingDietary) return false;
      }

      // Price range filter
      if (restaurant.priceRange < filters.priceRange[0] || restaurant.priceRange > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && restaurant.rating < filters.rating) {
        return false;
      }

      // Distance filter
      if (restaurant.distance > filters.distance) {
        return false;
      }

      // Open now filter
      if (filters.openNow && !restaurant.isOpen) {
        return false;
      }

      return true;
    });

    // Sort restaurants
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case 'price':
        filtered.sort((a, b) => a.priceRange - b.priceRange);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Relevance - keep original order or implement relevance scoring
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Update URL params
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      cuisineTypes: [],
      dietaryRestrictions: [],
      priceRange: [1, 4],
      rating: 0,
      distance: 1000,
      openNow: false
    });
  };

  const getActiveFiltersCount = () => {
    return filters.cuisineTypes.length +
           filters.dietaryRestrictions.length +
           (filters.rating > 0 ? 1 : 0) +
           (filters.openNow ? 1 : 0) +
           (filters.priceRange[0] > 1 || filters.priceRange[1] < 4 ? 1 : 0) +
           (filters.distance < 1000 ? 1 : 0);
  };

  const getPriceRangeDisplay = (priceRange) => {
    return '$'.repeat(priceRange);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'text-success-600 bg-success-50';
      case 'Busy':
        return 'text-warning-600 bg-warning-50';
      case 'Closed':
        return 'text-error-600 bg-error-50';
      default:
        return 'text-text-secondary bg-background';
    }
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant-detail?id=${restaurantId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        {/* Filter Sidebar */}
        <FilterPanel
          isOpen={true}
          onClose={() => {}}
          onApplyFilters={handleApplyFilters}
          initialFilters={filters}
          context="browse"
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Search and Sort Header */}
          <div className="sticky top-0 bg-surface border-b border-border-light z-10">
            <div className="p-6">
              {/* Search Bar */}
              <div className="relative mb-4">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary"
                />
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines, or dishes..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                />
              </div>

              {/* Sort and Results Count */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-text-secondary">
                  {filteredRestaurants.length} restaurants found
                  {searchQuery && ` for "${searchQuery}"`}
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        Sort by {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {getActiveFiltersCount() > 0 && (
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-sm text-text-secondary">Active filters:</span>
                  <div className="flex flex-wrap gap-2">
                    {filters.cuisineTypes.map(cuisine => (
                      <span key={cuisine} className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full">
                        {cuisine}
                      </span>
                    ))}
                    {filters.dietaryRestrictions.map(dietary => (
                      <span key={dietary} className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full">
                        {dietary}
                      </span>
                    ))}
                    {filters.rating > 0 && (
                      <span className="px-2 py-1 bg-accent-100 text-accent-600 text-xs rounded-full">
                        {filters.rating}+ stars
                      </span>
                    )}
                    {filters.openNow && (
                      <span className="px-2 py-1 bg-success-100 text-success-600 text-xs rounded-full">
                        Open now
                      </span>
                    )}
                    <button
                      onClick={handleClearFilters}
                      className="px-2 py-1 text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="p-6">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="card p-4 animate-pulse">
                    <div className="w-full h-48 bg-border-light rounded-lg mb-4"></div>
                    <div className="h-4 bg-border-light rounded mb-2"></div>
                    <div className="h-3 bg-border-light rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-border-light rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    onClick={() => handleRestaurantClick(restaurant.id)}
                    className="card card-hover cursor-pointer overflow-hidden"
                  >
                    <div className="relative">
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle favorite toggle
                          }}
                          className="w-8 h-8 bg-surface bg-opacity-90 rounded-full flex items-center justify-center text-text-secondary hover:text-accent transition-colors duration-200"
                        >
                          <Icon name="Heart" size={16} />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(restaurant.status)}`}>
                          {restaurant.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-text-primary text-lg leading-tight">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center space-x-1 ml-2">
                          <Icon name="Star" size={16} className="text-accent" fill="currentColor" />
                          <span className="text-sm font-medium text-text-primary">
                            {restaurant.rating}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                        <span>{restaurant.cuisine}</span>
                        <span>{getPriceRangeDisplay(restaurant.priceRange)}</span>
                        <span>{restaurant.distance}m away</span>
                      </div>
                      
                      <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                        {restaurant.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {restaurant.dietaryOptions.slice(0, 2).map(option => (
                            <span key={option} className="px-2 py-1 bg-background text-text-tertiary text-xs rounded">
                              {option}
                            </span>
                          ))}
                          {restaurant.dietaryOptions.length > 2 && (
                            <span className="px-2 py-1 bg-background text-text-tertiary text-xs rounded">
                              +{restaurant.dietaryOptions.length - 2}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-text-secondary">
                          {restaurant.estimatedWaitTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Search" size={48} className="text-text-tertiary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No restaurants found</h3>
                <p className="text-text-secondary mb-6">
                  {searchQuery 
                    ? `No results for "${searchQuery}". Try adjusting your search or filters.`
                    : "Try adjusting your filters to see more results."
                  }
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Search Header */}
        <div className="sticky top-0 bg-surface border-b border-border-light z-10">
          <div className="p-4">
            <div className="relative mb-4">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary"
              />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              />
            </div>

            {/* Filter and Sort Bar */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFilterPanelOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg text-text-primary hover:bg-surface-hover transition-colors duration-200"
              >
                <Icon name="Filter" size={18} />
                <span>Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="mt-3 text-sm text-text-secondary">
              {filteredRestaurants.length} restaurants
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="p-4">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="card p-3 animate-pulse">
                  <div className="w-full h-32 bg-border-light rounded-lg mb-3"></div>
                  <div className="h-3 bg-border-light rounded mb-2"></div>
                  <div className="h-2 bg-border-light rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  onClick={() => handleRestaurantClick(restaurant.id)}
                  className="card card-hover cursor-pointer overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle favorite toggle
                        }}
                        className="w-6 h-6 bg-surface bg-opacity-90 rounded-full flex items-center justify-center text-text-secondary hover:text-accent transition-colors duration-200"
                      >
                        <Icon name="Heart" size={12} />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getStatusColor(restaurant.status)}`}>
                        {restaurant.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-semibold text-text-primary text-sm leading-tight mb-1">
                      {restaurant.name}
                    </h3>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      <Icon name="Star" size={12} className="text-accent" fill="currentColor" />
                      <span className="text-xs font-medium text-text-primary">
                        {restaurant.rating}
                      </span>
                      <span className="text-xs text-text-secondary">
                        ({restaurant.reviewCount})
                      </span>
                    </div>
                    
                    <div className="text-xs text-text-secondary mb-2">
                      <div>{restaurant.cuisine}</div>
                      <div>{getPriceRangeDisplay(restaurant.priceRange)} • {restaurant.distance}m</div>
                    </div>
                    
                    <div className="text-xs text-text-tertiary">
                      {restaurant.estimatedWaitTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={32} className="text-text-tertiary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No restaurants found</h3>
              <p className="text-text-secondary text-sm mb-4">
                {searchQuery 
                  ? `No results for "${searchQuery}"`
                  : "Try adjusting your filters"
                }
              </p>
              <button
                onClick={handleClearFilters}
                className="btn-primary text-sm px-4 py-2"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
        context="browse"
      />
    </div>
  );
};

export default RestaurantBrowseSearch;