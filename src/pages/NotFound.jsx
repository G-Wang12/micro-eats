import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Search" size={48} color="var(--color-primary)" />
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            Sorry, we couldn't find the page you're looking for. The restaurant you're searching for might have moved or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/dashboard-home"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Home" size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/restaurant-browse-search"
              className="inline-flex items-center space-x-2 bg-surface text-text-primary px-4 py-2 rounded-lg font-medium border border-border hover:bg-surface-hover transition-colors duration-200"
            >
              <Icon name="Search" size={18} />
              <span>Browse Restaurants</span>
            </Link>
            
            <Link
              to="/campus-map"
              className="inline-flex items-center space-x-2 bg-surface text-text-primary px-4 py-2 rounded-lg font-medium border border-border hover:bg-surface-hover transition-colors duration-200"
            >
              <Icon name="MapPin" size={18} />
              <span>View Map</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;