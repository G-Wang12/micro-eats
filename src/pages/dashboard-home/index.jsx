import React, { useState, useEffect } from 'react';

import Icon from 'components/AppIcon';

import RestaurantOfTheDay from './components/RestaurantOfTheDay';
import RecommendedSection from './components/RecommendedSection';
import TrendingSection from './components/TrendingSection';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';

const DashboardHome = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    preferences: ["Italian", "Asian", "Vegetarian"],
    favoriteRestaurants: 12,
    totalReviews: 28
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  // Pull to refresh for mobile
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    const threshold = 100;

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY === 0 && startY > 0) {
        currentY = e.touches[0].clientY;
        pullDistance = currentY - startY;
        
        if (pullDistance > 0 && pullDistance < threshold * 2) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > threshold && !isRefreshing) {
        handleRefresh();
      }
      startY = 0;
      currentY = 0;
      pullDistance = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isRefreshing]);

  return (
    <div className="min-h-screen bg-background">
      {/* Pull to refresh indicator */}
      {isRefreshing && (
        <div className="fixed top-16 left-0 right-0 bg-primary text-white py-2 px-4 text-center text-sm font-medium z-50 md:hidden">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="RotateCcw" size={16} className="animate-spin" />
            <span>Refreshing...</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:space-x-8 p-6">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Welcome Card */}
            <div className="card p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Welcome back, {userData.name}!</h2>
                  <p className="text-sm text-text-secondary">Ready to discover great food?</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{userData.favoriteRestaurants}</div>
                  <div className="text-xs text-text-secondary">Favorites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">{userData.totalReviews}</div>
                  <div className="text-xs text-text-secondary">Reviews</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Activity */}
            <RecentActivity />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <RestaurantOfTheDay />
            <RecommendedSection />
            <TrendingSection />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-text-primary">Good {getTimeOfDay()}, {userData.name.split(' ')[0]}!</h1>
                <p className="text-sm text-text-secondary">What would you like to eat today?</p>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 bg-surface rounded-full shadow-card hover:shadow-medium transition-all duration-200 disabled:opacity-50"
              >
                <Icon 
                  name="RotateCcw" 
                  size={20} 
                  className={isRefreshing ? "animate-spin" : ""} 
                />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-primary">{userData.favoriteRestaurants}</div>
                <div className="text-xs text-text-secondary">Favorites</div>
              </div>
              <div className="bg-surface rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-secondary">{userData.totalReviews}</div>
                <div className="text-xs text-text-secondary">Reviews</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 mb-6">
            <QuickActions />
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <RestaurantOfTheDay />
            <RecommendedSection />
            <TrendingSection />
            
            {/* Recent Activity */}
            <div className="px-4">
              <RecentActivity />
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center py-4 px-4">
          <p className="text-xs text-text-tertiary">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to get time of day greeting
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

export default DashboardHome;