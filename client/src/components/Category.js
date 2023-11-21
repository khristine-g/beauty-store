
import React from 'react';
import '../Category.css'; // Import your CSS file for styling

function Category({ categories = [], onSelectCategory }) {
  console.log('Categories:', categories);

  return (
    <div className='Category' > 
     
    <div className="category-list">
    <h2>Categories</h2>
     
      <div className="card-container">
        {categories.map((category) => (
          <div key={category.id} className="category-card" onClick={() => onSelectCategory(category.id)}>
            <img src={category.image} alt={category.name} />
            <p className='category-name'>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div> 
  );
}

export default Category;
