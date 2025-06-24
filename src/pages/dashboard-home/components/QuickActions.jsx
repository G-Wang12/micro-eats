import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActions = () => {
  const quickActions = [
    {
      id: 'nearby',
      title: 'Find Nearby',
      subtitle: 'Restaurants close to you',
      icon: 'MapPin',
      color: 'primary',
      link: '/campus-map',
      badge: null
    },
    {
      id: 'favorites',
      title: 'My Favorites',
      subtitle: 'Your saved restaurants',
      icon: 'Heart',
      color: 'accent',
      link: '/user-profile?tab=favorites',
      badge: '12'
    },
    {
      id: 'browse',
      title: 'Browse All',
      subtitle: 'Explore all options',
      icon: 'Search',
      color: 'secondary',
      link: '/restaurant-browse-search',
      badge: null
    },
    {
      id: 'reviews',
      title: 'Write Review',
      subtitle: 'Share your experience',
      icon: 'PenTool',
      color: 'success',
      link: '/write-review',
      badge: null
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary',
        hover: 'hover:bg-primary-100'
      },
      secondary: {
        bg: 'bg-secondary-50',
        icon: 'text-secondary',
        hover: 'hover:bg-secondary-100'
      },
      accent: {
        bg: 'bg-accent-50',
        icon: 'text-accent',
        hover: 'hover:bg-accent-100'
      },
      success: {
        bg: 'bg-success-50',
        icon: 'text-success',
        hover: 'hover:bg-success-100'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-text-primary mb-4 lg:hidden">Quick Actions</h3>
      
      {/* Mobile Layout - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {quickActions.map((action) => {
          const colors = getColorClasses(action.color);
          return (
            <Link
              key={action.id}
              to={action.link}
              className={`${colors.bg} ${colors.hover} p-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative">
                  <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
                    <Icon name={action.icon} size={24} className={colors.icon} />
                  </div>
                  {action.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {action.badge}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-sm">{action.title}</h4>
                  <p className="text-xs text-text-secondary mt-1">{action.subtitle}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Desktop Layout - Vertical List */}
      <div className="hidden lg:block">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action) => {
            const colors = getColorClasses(action.color);
            return (
              <Link
                key={action.id}
                to={action.link}
                className={`${colors.bg} ${colors.hover} p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] flex items-center space-x-4`}
              >
                <div className="relative">
                  <div className={`w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-sm`}>
                    <Icon name={action.icon} size={20} className={colors.icon} />
                  </div>
                  {action.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {action.badge}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary">{action.title}</h4>
                  <p className="text-sm text-text-secondary">{action.subtitle}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-tertiary" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;