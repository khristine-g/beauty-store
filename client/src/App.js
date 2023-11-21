// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Category from './components/Category';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/signup';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart data from localStorage when the App component mounts
    const storedCart = localStorage.getItem('cart');
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  const removeFromCart = (productId) => {
    // Implement the logic to remove the product from the cart
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<ProductList cart={cart} setCart={setCart} removeFromCart={removeFromCart} />}
          />
          <Route path="/categories" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart cart={cart} onRemoveFromCart={removeFromCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import React, { useEffect, useState } from 'react';
// import Category from "./components/Category";
// import ProductList from "./components/ProductList";
// import Navbar from "./components/Navbar";
// import Login from "./components/Login";
// import Signup from "./components/signup";
// import Cart from "./components/Cart";
// import './App.css';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// function App() {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     // Load cart data from localStorage when the App component mounts
//     const storedCart = localStorage.getItem('cart');
//     setCart(storedCart ? JSON.parse(storedCart) : []);
//   }, []);

//   return (
//     <Router>
//       <Navbar />
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} />
//           <Route path="/categories" element={<Category />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
         
//           <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import Category from "./components/Category";
// import ProductList from "./components/ProductList";
// import Navbar from "./components/Navbar";
// import Login from "./components/Login";
// import Signup from "./components/signup";
// import Cart from "./components/Cart";
// import './App.css';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<ProductList />} />
//           <Route path="/categories" element={<Category />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/cart" element={<Cart />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


