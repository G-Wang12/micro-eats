import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MapControls = ({ 
  onZoomIn, 
  onZoomOut, 
  onCurrentLocation, 
  onToggleLayers,
  userLocation 
}) => {
  const [showLayers, setShowLayers] = useState(false);
  const [activeLayers, setActiveLayers] = useState({
    restaurants: true,
    parking: false,
    buildings: true,
    walkingPaths: false
  });

  const handleLayerToggle = (layer) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
    onToggleLayers(layer);
  };

  const layerOptions = [
    { key: 'restaurants', label: 'Restaurants', icon: 'Utensils' },
    { key: 'parking', label: 'Parking', icon: 'Car' },
    { key: 'buildings', label: 'Buildings', icon: 'Building' },
    { key: 'walkingPaths', label: 'Walking Paths', icon: 'Route' }
  ];

  return (
    <>
      {/* Zoom Controls */}
      <div className="absolute top-32 right-4 z-1000 flex flex-col space-y-2">
        <button
          onClick={onZoomIn}
          className="w-12 h-12 bg-surface border border-border rounded-lg shadow-card flex items-center justify-center text-text-primary hover:bg-surface-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <Icon name="Plus" size={20} />
        </button>
        
        <button
          onClick={onZoomOut}
          className="w-12 h-12 bg-surface border border-border rounded-lg shadow-card flex items-center justify-center text-text-primary hover:bg-surface-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <Icon name="Minus" size={20} />
        </button>
      </div>

      {/* Location and Layer Controls */}
      <div className="absolute bottom-20 right-4 z-1000 flex flex-col space-y-2 md:bottom-4">
        {/* Current Location Button */}
        <button
          onClick={onCurrentLocation}
          disabled={!userLocation}
          className={`w-12 h-12 bg-surface border border-border rounded-lg shadow-card flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            userLocation 
              ? 'text-primary hover:bg-primary-50' :'text-text-tertiary cursor-not-allowed'
          }`}
        >
          <Icon name="Navigation" size={20} />
        </button>

        {/* Layers Toggle Button */}
        <button
          onClick={() => setShowLayers(!showLayers)}
          className={`w-12 h-12 bg-surface border border-border rounded-lg shadow-card flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            showLayers ? 'bg-primary text-white' : 'text-text-primary hover:bg-surface-hover'
          }`}
        >
          <Icon name="Layers" size={20} />
        </button>
      </div>

      {/* Layers Panel */}
      {showLayers && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-1001"
            onClick={() => setShowLayers(false)}
          />
          
          {/* Panel */}
          <div className="absolute bottom-32 right-4 w-64 bg-surface border border-border rounded-lg shadow-medium z-1002 md:bottom-16">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text-primary">Map Layers</h3>
                <button
                  onClick={() => setShowLayers(false)}
                  className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              <div className="space-y-3">
                {layerOptions.map((layer) => (
                  <label key={layer.key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeLayers[layer.key]}
                      onChange={() => handleLayerToggle(layer.key)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                    />
                    <Icon name={layer.icon} size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{layer.label}</span>
                  </label>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border-light">
                <button
                  onClick={() => {
                    setActiveLayers({
                      restaurants: true,
                      parking: false,
                      buildings: true,
                      walkingPaths: false
                    });
                  }}
                  className="w-full py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Compass (Desktop Only) */}
      <div className="hidden md:block absolute top-32 left-4 z-1000">
        <div className="w-16 h-16 bg-surface border border-border rounded-full shadow-card flex items-center justify-center">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="Navigation" size={24} className="text-primary" />
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
              <span className="text-xs font-bold text-text-primary">N</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scale Indicator (Desktop Only) */}
      <div className="hidden md:block absolute bottom-4 left-4 z-1000">
        <div className="bg-surface border border-border rounded-lg shadow-card px-3 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-16 h-1 bg-text-primary relative">
              <div className="absolute -left-1 -top-1 w-1 h-3 bg-text-primary" />
              <div className="absolute -right-1 -top-1 w-1 h-3 bg-text-primary" />
            </div>
            <span className="text-xs text-text-secondary">100m</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapControls;