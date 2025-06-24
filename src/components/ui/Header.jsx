import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Search query:', searchQuery);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  const handleProfileToggle = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const isSearchPage = location.pathname === '/restaurant-browse-search';

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border-light z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard-home" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Utensils" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary hidden sm:block">
              Campus Eats
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
            {isSearchPage ? (
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary"
                  />
                  <input
                    type="text"
                    placeholder="Search restaurants, cuisines, or dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  />
                </div>
              </form>
            ) : (
              <div className="hidden md:block">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={18} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary"
                    />
                    <input
                      type="text"
                      placeholder="Quick search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-1.5 border border-border rounded-md bg-background text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    />
                  </div>
                </form>
              </div>
            )}

            {/* Mobile Search Toggle */}
            <div className="md:hidden">
              {isSearchExpanded ? (
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={18} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary"
                    />
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-10 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={handleSearchToggle}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors duration-200"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={handleSearchToggle}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-all duration-200"
                >
                  <Icon name="Search" size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-all duration-200">
              <Icon name="Bell" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={handleProfileToggle}
                className="flex items-center space-x-2 p-1 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-all duration-200"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="#0078D4" />
                </div>
                <Icon name="ChevronDown" size={16} className="hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-medium border border-border-light z-1001">
                  <div className="py-1">
                    <Link
                      to="/user-profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200"
                    >
                      <Icon name="User" size={16} className="mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/user-profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200"
                    >
                      <Icon name="Settings" size={16} className="mr-3" />
                      Settings
                    </Link>
                    <Link
                      to="/user-profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200"
                    >
                      <Icon name="Heart" size={16} className="mr-3" />
                      Favorites
                    </Link>
                    <div className="border-t border-border-light my-1"></div>
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        // Handle logout logic
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile search */}
      {isSearchExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-999 md:hidden"
          onClick={handleSearchToggle}
        ></div>
      )}

      {/* Backdrop for profile dropdown */}
      {isProfileDropdownOpen && (
        <div 
          className="fixed inset-0 z-1000"
          onClick={() => setIsProfileDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;