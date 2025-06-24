import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AccountTab = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@microsoft.com",
    phone: "+1 (425) 555-0123",
    department: "Azure Engineering",
    location: "Building 92, Office 3142"
  });

  const [dietaryRestrictions, setDietaryRestrictions] = useState([
    'Vegetarian', 'Gluten-Free'
  ]);

  const [cuisinePreferences, setCuisinePreferences] = useState({
    'American': 4,
    'Asian': 5,
    'Italian': 3,
    'Mexican': 4,
    'Indian': 5,
    'Mediterranean': 3,
    'Japanese': 4,
    'Thai': 5
  });

  const [notifications, setNotifications] = useState({
    newRestaurants: true,
    specialOffers: true,
    reviewResponses: true,
    weeklyDigest: false,
    friendActivity: true
  });

  const [isEditing, setIsEditing] = useState(false);

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 
    'Halal', 'Kosher', 'Keto', 'Paleo', 'Low-Sodium'
  ];

  const handleDietaryToggle = (dietary) => {
    setDietaryRestrictions(prev => 
      prev.includes(dietary)
        ? prev.filter(d => d !== dietary)
        : [...prev, dietary]
    );
  };

  const handleCuisineRating = (cuisine, rating) => {
    setCuisinePreferences(prev => ({
      ...prev,
      [cuisine]: rating
    }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log('Account settings saved');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset changes if needed
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Personal Information</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors duration-200"
            >
              <Icon name="Edit2" size={16} />
              <span className="text-sm font-medium">Edit</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Phone</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Department</label>
                <input
                  type="text"
                  value={personalInfo.department}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, department: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-1">Office Location</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, location: e.target.value }))}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button onClick={handleSave} className="btn-primary">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
              <p className="text-text-primary">{personalInfo.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
              <p className="text-text-primary">{personalInfo.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
              <p className="text-text-primary">{personalInfo.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Department</label>
              <p className="text-text-primary">{personalInfo.department}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-1">Office Location</label>
              <p className="text-text-primary">{personalInfo.location}</p>
            </div>
          </div>
        )}
      </div>

      {/* Dietary Restrictions */}
      <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Dietary Restrictions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {dietaryOptions.map((dietary) => (
            <label key={dietary} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dietaryRestrictions.includes(dietary)}
                onChange={() => handleDietaryToggle(dietary)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
              />
              <span className="text-sm text-text-primary">{dietary}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cuisine Preferences */}
      <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Cuisine Preferences</h2>
        <div className="space-y-4">
          {Object.entries(cuisinePreferences).map(([cuisine, rating]) => (
            <div key={cuisine} className="flex items-center justify-between">
              <span className="text-text-primary font-medium">{cuisine}</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleCuisineRating(cuisine, star)}
                      className={`transition-colors duration-200 ${
                        star <= rating ? 'text-accent' : 'text-border-dark hover:text-accent'
                      }`}
                    >
                      <Icon name="Star" size={18} fill={star <= rating ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
                <span className="text-sm text-text-secondary w-8">{rating}/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text-primary font-medium">New Restaurants</h3>
              <p className="text-sm text-text-secondary">Get notified when new restaurants open on campus</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.newRestaurants}
                onChange={() => handleNotificationToggle('newRestaurants')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text-primary font-medium">Special Offers</h3>
              <p className="text-sm text-text-secondary">Receive notifications about deals and promotions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.specialOffers}
                onChange={() => handleNotificationToggle('specialOffers')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text-primary font-medium">Review Responses</h3>
              <p className="text-sm text-text-secondary">Get notified when restaurants respond to your reviews</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.reviewResponses}
                onChange={() => handleNotificationToggle('reviewResponses')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text-primary font-medium">Weekly Digest</h3>
              <p className="text-sm text-text-secondary">Weekly summary of new reviews and trending restaurants</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.weeklyDigest}
                onChange={() => handleNotificationToggle('weeklyDigest')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text-primary font-medium">Friend Activity</h3>
              <p className="text-sm text-text-secondary">See when colleagues add reviews or favorites</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.friendActivity}
                onChange={() => handleNotificationToggle('friendActivity')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;