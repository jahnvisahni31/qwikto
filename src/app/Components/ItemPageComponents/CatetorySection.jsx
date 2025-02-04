import React from 'react';
import '../../Components/ItemPageComponents/categorySection.css'

const CategorySection = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="category_section">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategorySelect(category.name)}
          className={selectedCategory === category.name ? 'active' : ''}
        >
          <img src={category.image} alt={category.name} className="category_image" />
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySection;
