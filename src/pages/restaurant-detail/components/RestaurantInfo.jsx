import React from 'react';
import Icon from 'components/AppIcon';

const RestaurantInfo = ({ restaurant }) => {
  const getDayName = (dayKey) => {
    const days = {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    };
    return days[dayKey] || dayKey;
  };

  return (
    <div className="space-y-8">
      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">About</h2>
        <div className="prose max-w-none text-text-secondary">
          <p className="mb-4">{restaurant.description}</p>
        </div>
      </div>

      {/* Key Features */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Features & Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {restaurant.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-surface rounded-lg border border-border-light">
              <Icon name="Check" size={16} className="text-success-500 flex-shrink-0" />
              <span className="text-sm text-text-primary">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dietary Options */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Dietary Options</h2>
        <div className="flex flex-wrap gap-2">
          {restaurant.dietaryOptions.map((option, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-secondary-100 text-secondary-600 rounded-full text-sm font-medium"
            >
              {option}
            </span>
          ))}
        </div>
      </div>

      {/* Location Details */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Location & Contact</h2>
        <div className="bg-surface rounded-lg border border-border-light p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={20} className="text-text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-text-primary">{restaurant.location.building}</p>
              <p className="text-text-secondary">{restaurant.location.floor}</p>
              <p className="text-text-secondary text-sm">{restaurant.location.address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="Phone" size={20} className="text-text-secondary flex-shrink-0" />
            <a 
              href={`tel:${restaurant.contact.phone}`}
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              {restaurant.contact.phone}
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={20} className="text-text-secondary flex-shrink-0" />
            <a 
              href={`mailto:${restaurant.contact.email}`}
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              {restaurant.contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Hours */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Hours</h2>
        <div className="bg-surface rounded-lg border border-border-light p-6">
          <div className="space-y-3">
            {Object.entries(restaurant.hours).map(([day, hours]) => {
              const isToday = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' }) === day;
              return (
                <div key={day} className={`flex justify-between items-center py-2 ${
                  isToday ? 'bg-primary-50 -mx-3 px-3 rounded-lg' : ''
                }`}>
                  <span className={`font-medium ${
                    isToday ? 'text-primary-600' : 'text-text-primary'
                  }`}>
                    {getDayName(day)}
                  </span>
                  <span className={`${
                    isToday ? 'text-primary-600 font-medium' : 'text-text-secondary'
                  }`}>
                    {hours}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Location Map</h2>
        <div className="bg-surface rounded-lg border border-border-light overflow-hidden">
          <div className="h-64 relative">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={restaurant.name}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${restaurant.location.coordinates.lat},${restaurant.location.coordinates.lng}&z=16&output=embed`}
              className="border-0"
            />
          </div>
          <div className="p-4 bg-background border-t border-border-light">
            <p className="text-sm text-text-secondary">
              Located in {restaurant.location.building}, {restaurant.location.floor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;