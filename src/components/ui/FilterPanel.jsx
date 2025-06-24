import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  initialFilters = {},
  context = 'browse' // 'browse' or 'map'
}) => {
  const [filters, setFilters] = useState({
    cuisineTypes: [],
    dietaryRestrictions: [],
    priceRange: [1, 4],
    rating: 0,
    distance: 1000, // in meters
    openNow: false,
    ...initialFilters
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const cuisineOptions = [
    'American', 'Asian', 'Chinese', 'Italian', 'Mexican', 'Indian', 
    'Mediterranean', 'Japanese', 'Thai', 'Vietnamese', 'Korean', 'Greek'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Halal', 'Kosher'
  ];

  const priceLabels = ['$', '$$', '$$$', '$$$$'];

  useEffect(() => {
    const count = 
      filters.cuisineTypes.length +
      filters.dietaryRestrictions.length +
      (filters.rating > 0 ? 1 : 0) +
      (filters.openNow ? 1 : 0) +
      (filters.priceRange[0] > 1 || filters.priceRange[1] < 4 ? 1 : 0) +
      (filters.distance < 1000 ? 1 : 0);
    
    setActiveFiltersCount(count);
  }, [filters]);

  const handleCuisineToggle = (cuisine) => {
    setFilters(prev => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter(c => c !== cuisine)
        : [...prev.cuisineTypes, cuisine]
    }));
  };

  const handleDietaryToggle = (dietary) => {
    setFilters(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(dietary)
        ? prev.dietaryRestrictions.filter(d => d !== dietary)
        : [...prev.dietaryRestrictions, dietary]
    }));
  };

  const handlePriceRangeChange = (index, value) => {
    setFilters(prev => {
      const newRange = [...prev.priceRange];
      newRange[index] = value;
      // Ensure min <= max
      if (index === 0 && value > newRange[1]) {
        newRange[1] = value;
      } else if (index === 1 && value < newRange[0]) {
        newRange[0] = value;
      }
      return { ...prev, priceRange: newRange };
    });
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating
    }));
  };

  const handleDistanceChange = (distance) => {
    setFilters(prev => ({ ...prev, distance }));
  };

  const handleOpenNowToggle = () => {
    setFilters(prev => ({ ...prev, openNow: !prev.openNow }));
  };

  const handleClearAll = () => {
    setFilters({
      cuisineTypes: [],
      dietaryRestrictions: [],
      priceRange: [1, 4],
      rating: 0,
      distance: 1000,
      openNow: false
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const distanceOptions = [
    { value: 200, label: '200m' },
    { value: 500, label: '500m' },
    { value: 1000, label: '1km' },
    { value: 2000, label: '2km' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Slide-up Panel */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-1001"
          onClick={onClose}
        />
        
        {/* Panel */}
        <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-2xl z-1002 max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-light">
            <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
            <div className="flex items-center space-x-2">
              {activeFiltersCount > 0 && (
                <span className="px-2 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-full">
                  {activeFiltersCount}
                </span>
              )}
              <button
                onClick={onClose}
                className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-4 space-y-6" style={{ maxHeight: 'calc(80vh - 140px)' }}>
            {/* Cuisine Types */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Cuisine Type</h3>
              <div className="flex flex-wrap gap-2">
                {cuisineOptions.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => handleCuisineToggle(cuisine)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      filters.cuisineTypes.includes(cuisine)
                        ? 'bg-primary text-white' :'bg-background text-text-secondary border border-border hover:bg-surface-hover'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Dietary Restrictions</h3>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((dietary) => (
                  <button
                    key={dietary}
                    onClick={() => handleDietaryToggle(dietary)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      filters.dietaryRestrictions.includes(dietary)
                        ? 'bg-secondary text-white' :'bg-background text-text-secondary border border-border hover:bg-surface-hover'
                    }`}
                  >
                    {dietary}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Price Range</h3>
              <div className="flex items-center space-x-2">
                {priceLabels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (filters.priceRange[0] === index + 1 && filters.priceRange[1] === index + 1) {
                        setFilters(prev => ({ ...prev, priceRange: [1, 4] }));
                      } else {
                        setFilters(prev => ({ ...prev, priceRange: [index + 1, index + 1] }));
                      }
                    }}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      index + 1 >= filters.priceRange[0] && index + 1 <= filters.priceRange[1]
                        ? 'bg-accent text-white' :'bg-background text-text-secondary border border-border hover:bg-surface-hover'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Minimum Rating</h3>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`p-1 transition-colors duration-200 ${
                      star <= filters.rating ? 'text-accent' : 'text-border-dark hover:text-accent'
                    }`}
                  >
                    <Icon name="Star" size={20} fill={star <= filters.rating ? "currentColor" : "none"} />
                  </button>
                ))}
                {filters.rating > 0 && (
                  <span className="ml-2 text-sm text-text-secondary">
                    {filters.rating}+ stars
                  </span>
                )}
              </div>
            </div>

            {/* Distance */}
            {context === 'map' && (
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Distance</h3>
                <div className="grid grid-cols-2 gap-2">
                  {distanceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleDistanceChange(option.value)}
                      className={`py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        filters.distance === option.value
                          ? 'bg-primary text-white' :'bg-background text-text-secondary border border-border hover:bg-surface-hover'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Open Now */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.openNow}
                  onChange={handleOpenNowToggle}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-text-primary">Open now</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center space-x-3 p-4 border-t border-border-light bg-background">
            <button
              onClick={handleClearAll}
              className="flex-1 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200"
            >
              Clear All
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        {context === 'browse' ? (
          // Persistent sidebar for browse page
          <div className="w-80 bg-surface border-r border-border-light h-full overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>

              {/* Same content as mobile but with different styling */}
              <div className="space-y-6">
                {/* Cuisine Types */}
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-3">Cuisine Type</h3>
                  <div className="space-y-2">
                    {cuisineOptions.map((cuisine) => (
                      <label key={cuisine} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={filters.cuisineTypes.includes(cuisine)}
                          onChange={() => handleCuisineToggle(cuisine)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-text-primary">{cuisine}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dietary Restrictions */}
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-3">Dietary Restrictions</h3>
                  <div className="space-y-2">
                    {dietaryOptions.map((dietary) => (
                      <label key={dietary} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={filters.dietaryRestrictions.includes(dietary)}
                          onChange={() => handleDietaryToggle(dietary)}
                          className="w-4 h-4 text-secondary border-border rounded focus:ring-secondary-500"
                        />
                        <span className="text-sm text-text-primary">{dietary}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-3">Price Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {priceLabels.map((label, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (filters.priceRange[0] === index + 1 && filters.priceRange[1] === index + 1) {
                            setFilters(prev => ({ ...prev, priceRange: [1, 4] }));
                          } else {
                            setFilters(prev => ({ ...prev, priceRange: [index + 1, index + 1] }));
                          }
                        }}
                        className={`py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          index + 1 >= filters.priceRange[0] && index + 1 <= filters.priceRange[1]
                            ? 'bg-accent text-white' :'bg-background text-text-secondary border border-border hover:bg-surface-hover'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-3">Minimum Rating</h3>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        className={`p-1 transition-colors duration-200 ${
                          star <= filters.rating ? 'text-accent' : 'text-border-dark hover:text-accent'
                        }`}
                      >
                        <Icon name="Star" size={18} fill={star <= filters.rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Open Now */}
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters.openNow}
                      onChange={handleOpenNowToggle}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-text-primary">Open now</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border-light">
                <button
                  onClick={handleApply}
                  className="w-full py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleClearAll}
                  className="w-full py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Overlay panel for map page
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-25 z-1001"
              onClick={onClose}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-surface rounded-lg shadow-medium z-1002 max-h-[80vh] overflow-hidden">
              {/* Same mobile content but styled for desktop overlay */}
              <div className="flex items-center justify-between p-4 border-b border-border-light">
                <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
                <button
                  onClick={onClose}
                  className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(80vh - 140px)' }}>
                {/* Same filter content as mobile */}
              </div>
              
              <div className="flex items-center space-x-3 p-4 border-t border-border-light">
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200"
                >
                  Clear All
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FilterPanel;