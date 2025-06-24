import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SettingsTab = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'colleagues',
    reviewVisibility: 'public',
    showInRecommendations: true,
    allowMessages: true
  });

  const [feedbackForm, setFeedbackForm] = useState({
    category: '',
    message: '',
    rating: 0
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDataExportModal, setShowDataExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handlePrivacyChange = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission
    console.log('Feedback submitted:', feedbackForm);
    setFeedbackForm({ category: '', message: '', rating: 0 });
  };

  const handleDataExport = async () => {
    setIsExporting(true);
    // Simulate data export
    setTimeout(() => {
      setIsExporting(false);
      setShowDataExportModal(false);
      console.log('Data export completed');
    }, 2000);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('User logged out');
    setShowLogoutModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Privacy Settings */}
      <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Privacy Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Profile Visibility</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="public"
                  checked={privacySettings.profileVisibility === 'public'}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Public</span>
                  <p className="text-xs text-text-secondary">Anyone can see your profile and reviews</p>
                </div>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="colleagues"
                  checked={privacySettings.profileVisibility === 'colleagues'}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Colleagues Only</span>
                  <p className="text-xs text-text-secondary">Only Microsoft employees can see your profile</p>
                </div>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="private"
                  checked={privacySettings.profileVisibility === 'private'}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Private</span>
                  <p className="text-xs text-text-secondary">Only you can see your profile</p>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Review Visibility</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="reviewVisibility"
                  value="public"
                  checked={privacySettings.reviewVisibility === 'public'}
                  onChange={(e) => handlePrivacyChange('reviewVisibility', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Public</span>
                  <p className="text-xs text-text-secondary">Your reviews are visible to everyone</p>
                </div>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="reviewVisibility"
                  value="colleagues"
                  checked={privacySettings.reviewVisibility === 'colleagues'}
                  onChange={(e) => handlePrivacyChange('reviewVisibility', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Colleagues Only</span>
                  <p className="text-xs text-text-secondary">Only Microsoft employees can see your reviews</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-text-primary">Show in Recommendations</h3>
              <p className="text-xs text-text-secondary">Allow your preferences to influence colleague recommendations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacySettings.showInRecommendations}
                onChange={(e) => handlePrivacyChange('showInRecommendations', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-text-primary">Allow Messages</h3>
              <p className="text-xs text-text-secondary">Let colleagues send you messages about restaurants</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacySettings.allowMessages}
                onChange={(e) => handlePrivacyChange('allowMessages', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Data Management</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border-light rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-text-primary">Export Your Data</h3>
              <p className="text-xs text-text-secondary">Download a copy of your reviews, favorites, and preferences</p>
            </div>
            <button
              onClick={() => setShowDataExportModal(true)}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Export Data
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border-light rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-text-primary">Clear Search History</h3>
              <p className="text-xs text-text-secondary">Remove all your search history and preferences</p>
            </div>
            <button className="px-4 py-2 text-text-secondary border border-border rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors duration-200">
              Clear History
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-error-100 bg-error-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-error">Delete Account</h3>
              <p className="text-xs text-error-600">Permanently delete your account and all associated data</p>
            </div>
            <button className="px-4 py-2 bg-error text-white text-sm font-medium rounded-lg hover:bg-error-600 transition-colors duration-200">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Send Feedback</h2>
        
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
            <select
              value={feedbackForm.category}
              onChange={(e) => setFeedbackForm(prev => ({ ...prev, category: e.target.value }))}
              className="input-field"
              required
            >
              <option value="">Select a category</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="improvement">Improvement Suggestion</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Message</label>
            <textarea
              value={feedbackForm.message}
              onChange={(e) => setFeedbackForm(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="input-field resize-none"
              placeholder="Tell us about your experience or suggestion..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Overall Rating</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFeedbackForm(prev => ({ ...prev, rating: star }))}
                  className={`transition-colors duration-200 ${
                    star <= feedbackForm.rating ? 'text-accent' : 'text-border-dark hover:text-accent'
                  }`}
                >
                  <Icon name="Star" size={20} fill={star <= feedbackForm.rating ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Send Feedback
          </button>
        </form>
      </div>

      {/* Account Actions */}
      <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Account Actions</h2>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center space-x-2 py-3 text-text-secondary border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200">
            <Icon name="HelpCircle" size={18} />
            <span>Help & Support</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 py-3 text-text-secondary border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200">
            <Icon name="FileText" size={18} />
            <span>Terms of Service</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 py-3 text-text-secondary border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200">
            <Icon name="Shield" size={18} />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center space-x-2 py-3 text-error border border-error rounded-lg hover:bg-error-50 transition-colors duration-200"
          >
            <Icon name="LogOut" size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Data Export Modal */}
      {showDataExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1002 p-4">
          <div className="bg-surface rounded-lg shadow-medium max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="Download" size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Export Your Data</h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              We'll prepare a download containing all your reviews, favorites, and preferences. This may take a few moments.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDataExport}
                disabled={isExporting}
                className="flex-1 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isExporting ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Download" size={16} />
                    <span>Export Data</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDataExportModal(false)}
                disabled={isExporting}
                className="flex-1 py-2 text-text-secondary border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1002 p-4">
          <div className="bg-surface rounded-lg shadow-medium max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center">
                <Icon name="LogOut" size={20} className="text-error" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Sign Out</h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              Are you sure you want to sign out? You'll need to sign in again to access your account.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleLogout}
                className="flex-1 py-2 bg-error text-white rounded-lg font-medium hover:bg-error-600 transition-colors duration-200"
              >
                Sign Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 text-text-secondary border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;