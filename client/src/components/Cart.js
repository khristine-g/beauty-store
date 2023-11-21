

// Cart.js
import React from 'react';
import '../Cart.css';

const Cart = ({ cart, onRemoveFromCart }) => {
  const calculateTotalPrice = () => {
    if (!cart || !Array.isArray(cart)) {
      return 0;
    }

    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };
 
  

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {!cart || cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className='cart-product'>
  {cart.map((product) => (
    <li key={product.id}>
      <img className='product-img' src={product.image} alt={product.name} />
      <h4 className='product-name'>{product.name}</h4>
      <p className='price'>${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <button onClick={() => onRemoveFromCart(product.id)}>Remove</button>
    </li>
  ))}
</ul>


          <p>Total Price: ${calculateTotalPrice()}</p>
        </>
      )}
      
    </div>
  );
};

export default Cart;

