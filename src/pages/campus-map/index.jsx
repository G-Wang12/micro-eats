import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';
import FilterPanel from 'components/ui/FilterPanel';
import RestaurantCard from './components/RestaurantCard';
import MapControls from './components/MapControls';
import RestaurantPopup from './components/RestaurantPopup';

const CampusMap = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mapRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 47.6431, lng: -122.1271 }); // Microsoft Redmond
  const [filters, setFilters] = useState({
    cuisineTypes: [],
    dietaryRestrictions: [],
    priceRange: [1, 4],
    rating: 0,
    distance: 1000,
    openNow: false
  });

  // Mock restaurant data with locations
  const restaurants = [
    {
      id: 1,
      name: "The Commons Café",
      cuisine: "American",
      rating: 4.5,
      reviewCount: 234,
      priceRange: 2,
      status: "open",
      location: { lat: 47.6441, lng: -122.1281 },
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      description: "Fresh salads, sandwiches, and daily specials in a bright, modern setting.",
      hours: "7:00 AM - 6:00 PM",
      walkingTime: "3 min",
      dietaryOptions: ["Vegetarian", "Gluten-Free"],
      busyLevel: "moderate"
    },
    {
      id: 2,
      name: "Spice Route",
      cuisine: "Indian",
      rating: 4.7,
      reviewCount: 189,
      priceRange: 2,
      status: "open",
      location: { lat: 47.6421, lng: -122.1261 },
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      description: "Authentic Indian cuisine with vegetarian and vegan options.",
      hours: "11:00 AM - 8:00 PM",
      walkingTime: "5 min",
      dietaryOptions: ["Vegetarian", "Vegan", "Halal"],
      busyLevel: "busy"
    },
    {
      id: 3,
      name: "Pacific Grill",
      cuisine: "Asian",
      rating: 4.3,
      reviewCount: 156,
      priceRange: 3,
      status: "closed",
      location: { lat: 47.6451, lng: -122.1291 },
      image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=300&fit=crop",
      description: "Fresh seafood and Asian fusion dishes with a modern twist.",
      hours: "Closed - Opens at 5:00 PM",
      walkingTime: "7 min",
      dietaryOptions: ["Gluten-Free"],
      busyLevel: "low"
    },
    {
      id: 4,
      name: "Bella Vista",
      cuisine: "Italian",
      rating: 4.6,
      reviewCount: 298,
      priceRange: 3,
      status: "open",
      location: { lat: 47.6411, lng: -122.1251 },
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      description: "Wood-fired pizzas and handmade pasta in a cozy atmosphere.",
      hours: "11:30 AM - 9:00 PM",
      walkingTime: "4 min",
      dietaryOptions: ["Vegetarian"],
      busyLevel: "moderate"
    },
    {
      id: 5,
      name: "Green Garden",
      cuisine: "Mediterranean",
      rating: 4.4,
      reviewCount: 167,
      priceRange: 2,
      status: "open",
      location: { lat: 47.6461, lng: -122.1301 },
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      description: "Fresh Mediterranean bowls, wraps, and healthy options.",
      hours: "10:00 AM - 7:00 PM",
      walkingTime: "6 min",
      dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free"],
      busyLevel: "low"
    },
    {
      id: 6,
      name: "Taco Corner",
      cuisine: "Mexican",
      rating: 4.2,
      reviewCount: 203,
      priceRange: 1,
      status: "busy",
      location: { lat: 47.6431, lng: -122.1241 },
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      description: "Authentic Mexican street food and fresh made-to-order tacos.",
      hours: "11:00 AM - 8:00 PM",
      walkingTime: "2 min",
      dietaryOptions: ["Vegetarian", "Gluten-Free"],
      busyLevel: "busy"
    }
  ];

  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }

    // Check if there's a restaurant parameter in URL
    const restaurantId = searchParams.get('restaurant');
    if (restaurantId) {
      const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
      if (restaurant) {
        setSelectedRestaurant(restaurant);
        setMapCenter(restaurant.location);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery]);

  const applyFilters = () => {
    let filtered = restaurants.filter(restaurant => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = restaurant.name.toLowerCase().includes(query);
        const matchesCuisine = restaurant.cuisine.toLowerCase().includes(query);
        const matchesDescription = restaurant.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCuisine && !matchesDescription) {
          return false;
        }
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
        if (!hasMatchingDietary) {
          return false;
        }
      }

      // Price range filter
      if (restaurant.priceRange < filters.priceRange[0] || restaurant.priceRange > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && restaurant.rating < filters.rating) {
        return false;
      }

      // Open now filter
      if (filters.openNow && restaurant.status !== 'open') {
        return false;
      }

      return true;
    });

    setFilteredRestaurants(filtered);
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setMapCenter(restaurant.location);
    setIsBottomSheetOpen(false);
  };

  const handleDirections = (restaurant) => {
    setShowDirections(true);
    setSelectedRestaurant(restaurant);
  };

  const handleViewDetails = (restaurant) => {
    navigate(`/restaurant-detail?id=${restaurant.id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#10B981';
      case 'closed': return '#EF4444';
      case 'busy': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getCuisineIcon = (cuisine) => {
    const iconMap = {
      'American': 'Utensils',
      'Indian': 'Coffee',
      'Asian': 'Coffee',
      'Italian': 'Pizza',
      'Mediterranean': 'Leaf',
      'Mexican': 'Coffee'
    };
    return iconMap[cuisine] || 'MapPin';
  };

  return (
    <div className="h-screen bg-background relative overflow-hidden">
      {/* Search Bar Overlay */}
      <div className="absolute top-4 left-4 right-4 z-1000 md:right-auto md:w-80">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="text"
            placeholder="Search restaurants or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg shadow-card text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Filter Button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="absolute top-20 right-4 z-1000 w-12 h-12 bg-surface border border-border rounded-lg shadow-card flex items-center justify-center text-text-primary hover:bg-surface-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <Icon name="Filter" size={20} />
      </button>

      {/* Map Container */}
      <div className="w-full h-full relative">
        <iframe
          ref={mapRef}
          width="100%"
          height="100%"
          loading="lazy"
          title="Microsoft Redmond Campus Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=16&output=embed`}
          className="border-0"
        />

        {/* Custom Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {filteredRestaurants.map((restaurant) => {
            // Calculate position based on map center (simplified positioning)
            const offsetLat = (restaurant.location.lat - mapCenter.lat) * 100000;
            const offsetLng = (restaurant.location.lng - mapCenter.lng) * 100000;
            const x = 50 + (offsetLng * 2); // Simplified conversion
            const y = 50 - (offsetLat * 2); // Simplified conversion

            if (x < 0 || x > 100 || y < 0 || y > 100) return null;

            return (
              <button
                key={restaurant.id}
                onClick={() => handleRestaurantSelect(restaurant)}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                style={{
                  left: `${x}%`,
                  top: `${y}%`
                }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-medium border-2 border-white ${
                  selectedRestaurant?.id === restaurant.id ? 'bg-primary' : 'bg-surface'
                }`}>
                  <Icon 
                    name={getCuisineIcon(restaurant.cuisine)} 
                    size={16} 
                    color={selectedRestaurant?.id === restaurant.id ? 'white' : getStatusColor(restaurant.status)}
                  />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  restaurant.status === 'open' ? 'bg-success' : 
                  restaurant.status === 'closed' ? 'bg-error' : 'bg-warning'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Controls */}
      <MapControls 
        onZoomIn={() => console.log('Zoom in')}
        onZoomOut={() => console.log('Zoom out')}
        onCurrentLocation={() => {
          if (userLocation) {
            setMapCenter(userLocation);
          }
        }}
        onToggleLayers={() => console.log('Toggle layers')}
        userLocation={userLocation}
      />

      {/* Restaurant List Toggle Button */}
      <button
        onClick={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-1000 bg-primary text-white px-6 py-3 rounded-full shadow-medium flex items-center space-x-2 hover:bg-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 md:hidden"
      >
        <Icon name="List" size={18} />
        <span className="font-medium">
          {filteredRestaurants.length} Restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
        </span>
        <Icon 
          name="ChevronUp" 
          size={16} 
          className={`transform transition-transform duration-200 ${isBottomSheetOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block absolute top-20 left-4 w-80 h-[calc(100vh-6rem)] bg-surface border border-border rounded-lg shadow-card overflow-hidden z-999">
        <div className="p-4 border-b border-border-light">
          <h2 className="text-lg font-semibold text-text-primary">
            Restaurants ({filteredRestaurants.length})
          </h2>
        </div>
        <div className="overflow-y-auto h-full pb-4">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="p-4 border-b border-border-light last:border-b-0">
              <RestaurantCard
                restaurant={restaurant}
                onSelect={() => handleRestaurantSelect(restaurant)}
                onDirections={() => handleDirections(restaurant)}
                onViewDetails={() => handleViewDetails(restaurant)}
                isSelected={selectedRestaurant?.id === restaurant.id}
                compact={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      {isBottomSheetOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-1001 md:hidden"
            onClick={() => setIsBottomSheetOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-2xl z-1002 max-h-[70vh] overflow-hidden md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-border-light">
              <h2 className="text-lg font-semibold text-text-primary">
                Restaurants ({filteredRestaurants.length})
              </h2>
              <button
                onClick={() => setIsBottomSheetOpen(false)}
                className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(70vh - 80px)' }}>
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onSelect={() => handleRestaurantSelect(restaurant)}
                  onDirections={() => handleDirections(restaurant)}
                  onViewDetails={() => handleViewDetails(restaurant)}
                  isSelected={selectedRestaurant?.id === restaurant.id}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Restaurant Popup */}
      {selectedRestaurant && (
        <RestaurantPopup
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onDirections={() => handleDirections(selectedRestaurant)}
          onViewDetails={() => handleViewDetails(selectedRestaurant)}
          showDirections={showDirections}
        />
      )}

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={setFilters}
        initialFilters={filters}
        context="map"
      />
    </div>
  );
};

export default CampusMap;