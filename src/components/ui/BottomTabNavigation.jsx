import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Home',
      path: '/dashboard-home',
      icon: 'Home',
      badge: null
    },
    {
      label: 'Browse',
      path: '/restaurant-browse-search',
      icon: 'Search',
      badge: null
    },
    {
      label: 'Map',
      path: '/campus-map',
      icon: 'MapPin',
      badge: null
    },
    {
      label: 'Profile',
      path: '/user-profile',
      icon: 'User',
      badge: null
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border-light z-999 md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'text-primary-600 bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  strokeWidth={isActive(item.path) ? 2.5 : 2}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium truncate ${
                isActive(item.path) ? 'text-primary-600' : 'text-text-secondary'
              }`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Top Navigation */}
      <nav className="hidden md:block bg-surface border-b border-border-light mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    strokeWidth={isActive(item.path) ? 2.5 : 2}
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;