import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentActivity = () => {
  const recentActivities = [
    {
      id: 'activity-001',
      type: 'review',
      restaurant: {
        id: 'rest-001',
        name: 'Sakura Sushi & Ramen',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop'
      },
      action: 'You reviewed',
      rating: 5,
      comment: 'Amazing fresh sushi and authentic ramen! The service was excellent.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'Star'
    },
    {
      id: 'activity-002',
      type: 'favorite',
      restaurant: {
        id: 'rest-002',
        name: 'Mediterranean Delights',
        image: 'https://images.unsplash.com/photo-1544510808-0c8e1b6e2d2e?w=100&h=100&fit=crop'
      },
      action: 'You added to favorites',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      icon: 'Heart'
    },
    {
      id: 'activity-003',
      type: 'visit',
      restaurant: {
        id: 'rest-003',
        name: 'Artisan Pizza Co.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop'
      },
      action: 'You visited',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'MapPin'
    },
    {
      id: 'activity-004',
      type: 'recommendation',
      restaurant: {
        id: 'rest-004',
        name: 'Seoul Kitchen',
        image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=100&h=100&fit=crop'
      },
      action: 'New recommendation for you',
      reason: 'Based on your Korean cuisine preferences',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'Target'
    },
    {
      id: 'activity-005',
      type: 'trending',
      restaurant: {
        id: 'rest-005',
        name: 'Campus Coffee & More',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&h=100&fit=crop'
      },
      action: 'Now trending',
      reason: 'Most reviewed this week',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: 'TrendingUp'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMs = now - timestamp;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-accent" fill="currentColor" />
      );
    }
    return stars;
  };

  const getActivityColor = (type) => {
    const colorMap = {
      review: 'text-accent',
      favorite: 'text-error',
      visit: 'text-primary',
      recommendation: 'text-secondary',
      trending: 'text-success'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  const getActivityBgColor = (type) => {
    const colorMap = {
      review: 'bg-accent-50',
      favorite: 'bg-error-50',
      visit: 'bg-primary-50',
      recommendation: 'bg-secondary-50',
      trending: 'bg-success-50'
    };
    return colorMap[type] || 'bg-background';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <Link
          to="/user-profile?tab=activity"
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {recentActivities.slice(0, 5).map((activity) => (
          <div key={activity.id} className="card p-4 hover:shadow-medium transition-all duration-200">
            <div className="flex items-start space-x-3">
              {/* Activity Icon */}
              <div className={`w-8 h-8 ${getActivityBgColor(activity.type)} rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon 
                  name={activity.icon} 
                  size={16} 
                  className={getActivityColor(activity.type)} 
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Action Text */}
                    <p className="text-sm text-text-primary mb-1">
                      <span className="font-medium">{activity.action}</span>
                      <Link
                        to={`/restaurant-detail?id=${activity.restaurant.id}`}
                        className="text-primary hover:text-primary-700 font-medium ml-1 transition-colors duration-200"
                      >
                        {activity.restaurant.name}
                      </Link>
                    </p>

                    {/* Additional Info */}
                    {activity.type === 'review' && activity.rating && (
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="flex items-center space-x-1">
                          {renderStars(activity.rating)}
                        </div>
                        {activity.comment && (
                          <span className="text-xs text-text-secondary truncate">
                            "{activity.comment}"
                          </span>
                        )}
                      </div>
                    )}

                    {(activity.reason) && (
                      <p className="text-xs text-text-secondary mb-1">
                        {activity.reason}
                      </p>
                    )}

                    {/* Timestamp */}
                    <p className="text-xs text-text-tertiary">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>

                  {/* Restaurant Image */}
                  <Link
                    to={`/restaurant-detail?id=${activity.restaurant.id}`}
                    className="w-12 h-12 flex-shrink-0 ml-3"
                  >
                    <Image
                      src={activity.restaurant.image}
                      alt={activity.restaurant.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {recentActivities.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={32} className="text-text-tertiary" />
          </div>
          <h4 className="text-lg font-medium text-text-primary mb-2">No Recent Activity</h4>
          <p className="text-text-secondary mb-4">
            Start exploring restaurants to see your activity here
          </p>
          <Link
            to="/restaurant-browse-search"
            className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Search" size={16} />
            <span>Browse Restaurants</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;