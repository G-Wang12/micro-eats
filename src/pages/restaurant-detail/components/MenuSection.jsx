import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const MenuSection = ({ menu }) => {
  const [selectedCategory, setSelectedCategory] = useState('breakfast');

  const categories = Object.keys(menu);
  const categoryLabels = {
    breakfast: 'Breakfast',
    lunch: 'Lunch & Dinner',
    beverages: 'Beverages',
    desserts: 'Desserts'
  };

  const getDietaryIcon = (dietary) => {
    const icons = {
      'Vegetarian': 'Leaf',
      'Vegan': 'Sprout',
      'Gluten-Free': 'Shield',
      'Dairy-Free': 'Droplets'
    };
    return icons[dietary] || 'Info';
  };

  const getDietaryColor = (dietary) => {
    const colors = {
      'Vegetarian': 'text-green-600',
      'Vegan': 'text-emerald-600',
      'Gluten-Free': 'text-blue-600',
      'Dairy-Free': 'text-purple-600'
    };
    return colors[dietary] || 'text-text-secondary';
  };

  return (
    <div className="space-y-6">
      {/* Category Navigation */}
      <div className="flex space-x-1 bg-background p-1 rounded-lg overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-surface text-primary-600 shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {menu[selectedCategory]?.map((item) => (
          <div key={item.id} className="bg-surface rounded-lg border border-border-light p-4 hover:shadow-card transition-all duration-200">
            <div className="flex space-x-4">
              {/* Item Image */}
              {item.image && (
                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Item Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-text-primary">{item.name}</h3>
                  <span className="text-lg font-bold text-primary-600 ml-4 flex-shrink-0">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Dietary Icons */}
                {item.dietary && item.dietary.length > 0 && (
                  <div className="flex items-center space-x-3">
                    {item.dietary.map((dietary, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <Icon 
                          name={getDietaryIcon(dietary)} 
                          size={14} 
                          className={getDietaryColor(dietary)}
                        />
                        <span className={`text-xs font-medium ${getDietaryColor(dietary)}`}>
                          {dietary}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Disclaimer */}
      <div className="bg-background rounded-lg p-4 border border-border-light">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-text-secondary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-text-secondary">
            <p className="mb-2">
              <strong>Menu Disclaimer:</strong> Prices and availability subject to change. 
              Please inform staff of any allergies or dietary restrictions.
            </p>
            <p>
              Items marked with dietary icons indicate general suitability but may be prepared 
              in facilities that process allergens. Please consult with staff for detailed 
              ingredient information.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-50 rounded-lg p-6 text-center border border-primary-100">
        <h3 className="text-lg font-semibold text-primary-700 mb-2">
          Ready to Order?
        </h3>
        <p className="text-primary-600 mb-4">
          Visit us in person or call ahead for takeout orders
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200">
            <Icon name="MapPin" size={18} />
            <span>Get Directions</span>
          </button>
          <button className="inline-flex items-center space-x-2 bg-surface text-text-primary px-6 py-3 rounded-lg font-medium border border-border hover:bg-surface-hover transition-colors duration-200">
            <Icon name="Phone" size={18} />
            <span>Call Restaurant</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;