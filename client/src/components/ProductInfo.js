


//ProductInfo.js
import React from 'react';
import '../ProductInfo.css';


function ProductInfo({ product, onGoBack, onAddToCart }) {
  // Ensure that a product is selected before rendering
  if (!product) {
    return <p>Please select a product to view details.</p>;
  }


  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
  
    try {
      // Get the current cart from localStorage
      const storedCart = localStorage.getItem('cart');
  
      // Try to parse the storedCart, if it's not present or not a valid JSON string, set an empty array
      const parsedCart = (storedCart && JSON.parse(storedCart)) || [];
  
      // Check if the product is already in the cart
      const existingProductIndex = parsedCart.findIndex((cartProduct) => cartProduct.id === product.id);
  
      if (existingProductIndex !== -1) {
        // Product is already in the cart, update the quantity
        parsedCart[existingProductIndex].quantity += 1;
      } else {
        // Product is not in the cart, add a new entry
        parsedCart.push({ ...product, quantity: 1 });
      }
  
      // Update local storage with the new cart data
      localStorage.setItem('cart', JSON.stringify(parsedCart));
  
      // Log the new cart to verify it's correct
      console.log('New Cart:', parsedCart);
      alert('product added successfully')
  
      // Update the state with the new cart
      onAddToCart(parsedCart);
    } catch (error) {
      console.error('Error parsing or updating cart:', error);
    }
  };
  
  

  return (
    <div className="product-info">
      <div className="card">
        <img className='product-img' src={product.image} alt={product.name} />
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p className='price'>${product.price}</p>
          <p className='description'>{product.description}</p>
          <button className="cart-btn" onClick={handleAddToCart}>Add to cart</button>
          
          {/* You can add more details here based on your product model */}
        </div>
      </div>
      <button className='back-btn' onClick={onGoBack}>Go Back</button>
    </div>
  );
}

export default ProductInfo;
