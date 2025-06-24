import React, { useState } from 'react';

import Icon from 'components/AppIcon';

import ProfileHeader from './components/ProfileHeader';
import AccountTab from './components/AccountTab';
import ActivityTab from './components/ActivityTab';
import SettingsTab from './components/SettingsTab';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account', icon: 'User' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountTab />;
      case 'activity':
        return <ActivityTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <AccountTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Tab Navigation */}
        <div className="mt-8">
          <div className="border-b border-border-light">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary-600' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-dark'
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;