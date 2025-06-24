import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@microsoft.com",
    employeeId: "EMP-2024-1234",
    department: "Azure Engineering",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "March 2022",
    totalReviews: 47,
    favoriteRestaurants: 12,
    helpfulVotes: 89
  });

  const achievements = [
    { id: 1, name: "First Review", icon: "Star", color: "text-accent" },
    { id: 2, name: "Campus Foodie", icon: "Award", color: "text-primary" },
    { id: 3, name: "Helpful Reviewer", icon: "ThumbsUp", color: "text-success" },
    { id: 4, name: "Explorer", icon: "MapPin", color: "text-secondary" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log('Profile updated:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  return (
    <div className="bg-surface rounded-lg shadow-card border border-border-light overflow-hidden">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
      
      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
          <div className="relative -mt-16 mb-4 sm:mb-0">
            <div className="w-32 h-32 rounded-full border-4 border-surface overflow-hidden bg-surface">
              <Image
                src={profileData.avatar}
                alt={profileData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-200">
              <Icon name="Camera" size={16} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-text-secondary border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-text-primary">{profileData.name}</h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    <Icon name="Edit2" size={16} />
                  </button>
                </div>
                <p className="text-text-secondary mb-1">{profileData.email}</p>
                <p className="text-text-tertiary text-sm mb-4">
                  {profileData.department} • Employee ID: {profileData.employeeId} • Joined {profileData.joinDate}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border-light">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{profileData.totalReviews}</div>
            <div className="text-sm text-text-secondary">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{profileData.favoriteRestaurants}</div>
            <div className="text-sm text-text-secondary">Favorites</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{profileData.helpfulVotes}</div>
            <div className="text-sm text-text-secondary">Helpful Votes</div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-6 pt-6 border-t border-border-light">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Achievements</h3>
          <div className="flex flex-wrap gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center space-x-2 px-3 py-2 bg-background rounded-lg border border-border-light"
              >
                <Icon name={achievement.icon} size={16} className={achievement.color} />
                <span className="text-sm font-medium text-text-primary">{achievement.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;