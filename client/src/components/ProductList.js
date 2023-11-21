import React, { useEffect, useState } from 'react';
import '../ProductList.css';
import Category from './Category';
import ProductInfo from './ProductInfo';
import Cart from './Cart';

function ProductList({ cart: propCart, addToCart, removeFromCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [localCart, setLocalCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Fetch categories and products here
    // Replace the URLs with your actual API endpoints
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
    fetchProducts();

    // Load cart data from localStorage when the component mounts
    const storedCart = localStorage.getItem('cart');
    setLocalCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  const handleSelectProduct = (productId) => {
    const product = products.find((product) => product.id === productId);
    setSelectedProduct(product);
  };

  const handleSelectCategory = async (categoryId) => {
    try {
      console.log('Selected Category ID:', categoryId);

      // Fetch products based on the selected category
      const response = await fetch(`http://localhost:3000/categories/${categoryId}`);
      const data = await response.json();

      console.log('Category Products:', data);

      setCategoryProducts(data);
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error('Error fetching category products:', error);
    }
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = localCart.filter((cartProduct) => cartProduct.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setLocalCart(updatedCart);
  };

  const handleGoBack = () => {
    setSelectedProduct(null);
    setSelectedCategory(null);
  };

  return (
    <div className='ProductList'>
      <div>
        {selectedProduct ? (
          <ProductInfo product={selectedProduct} onGoBack={handleGoBack} onAddToCart={setLocalCart} />
        ) : (
          <>
            <Category categories={categories} onSelectCategory={handleSelectCategory} />
            {selectedCategory ? (
              <div>
                <h2>Products in Category</h2>
                <div className="product-list">
                  {categoryProducts.map((product) => (
                    <div key={product.id} className="product-card" onClick={() => handleSelectProduct(product.id)}>
                      <img className='product-img' src={product.image} alt={product.name} />
                      <h4 className='product-name'>{product.name}</h4>
                      <p className='price'>${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <h2>Top Products</h2>
                <div className="product-list">
                  {products.map((product) => (
                    <div key={product.id} className="product-card" onClick={() => handleSelectProduct(product.id)}>
                      <img className='product-img' src={product.image} alt={product.name} />
                      <h4 className='product-name'>{product.name}</h4>
                      <p className='price'>${product.price}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      {selectedProduct ? null : <Cart cart={localCart} onRemoveFromCart={handleRemoveFromCart} />}
    </div>
  );
}

export default ProductList;


// // ProductList.js
// import React, { useEffect, useState } from 'react';
// import '../ProductList.css';
// import Category from './Category';
// import ProductInfo from './ProductInfo';
// import Cart from './Cart';

// function ProductList({ cart: propCart, addToCart, removeFromCart }) {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [localCart, setLocalCart] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [categoryProducts, setCategoryProducts] = useState([]);

//   useEffect(() => {
//     // Fetch categories and products here
//     // Replace the URLs with your actual API endpoints
//     fetch('http://localhost:3000/categories')
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error('Error fetching categories:', error));

//     fetch('http://localhost:3000/products')
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error('Error fetching products:', error));

//     // Load cart data from localStorage when the component mounts
//     const storedCart = localStorage.getItem('cart');
//     setLocalCart(storedCart ? JSON.parse(storedCart) : []);
//   }, []);

//   const handleSelectProduct = (productId) => {
//     const product = products.find((product) => product.id === productId);
//     setSelectedProduct(product);
//   };

//   const handleSelectCategory = async (categoryId) => {
//     try {
//       // Fetch products based on the selected category
//       const response = await fetch(`http://localhost:3000/categories/${categoryId}/products`);
//       const data = await response.json();
//       setCategoryProducts(data);
//     } catch (error) {
//       console.log('Error fetching category products:')
//     }
//   };

//   const handleRemoveFromCart = (productId) => {
//     const updatedCart = localCart.filter((cartProduct) => cartProduct.id !== productId);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     setLocalCart(updatedCart);
//   };

//   const handleGoBack = () => {
//     setSelectedProduct(null);
//     setSelectedCategory(null);
//   };

//   return (
//     <div className='ProductList'>
//       <div>
//         {selectedProduct ? (
//           <ProductInfo product={selectedProduct} onGoBack={handleGoBack} onAddToCart={setLocalCart} />
//         ) : (
//           <>
//             <Category categories={categories} onSelectCategory={handleSelectCategory} />
//             {selectedCategory ? (
//               <div>
//                 <h2>Products in Category</h2>
//                 <div className="product-list">
//                   {categoryProducts.map((product) => (
//                     <div key={product.id} className="product-card" onClick={() => handleSelectProduct(product.id)}>
//                       <img className='product-img' src={product.image} alt={product.name} />
//                       <h4 className='product-name'>{product.name}</h4>
//                       <p className='price'>${product.price}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <h2>Top Products</h2>
//                 <div className="product-list">
//                   {products.map((product) => (
//                     <div key={product.id} className="product-card" onClick={() => handleSelectProduct(product.id)}>
//                       <img className='product-img' src={product.image} alt={product.name} />
//                       <h4 className='product-name'>{product.name}</h4>
//                       <p className='price'>${product.price}</p>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//       {selectedProduct ? null : <Cart cart={localCart} onRemoveFromCart={handleRemoveFromCart} />}
//     </div>
//   );
// }

// export default ProductList;

// // ProductList.js
// import React, { useEffect, useState } from 'react';
// import '../ProductList.css';
// import Category from './Category';
// import ProductInfo from './ProductInfo';
// import Cart from './Cart';

// function ProductList({ cart: propCart, addToCart, removeFromCart }) {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [localCart, setLocalCart] = useState([]);

//   useEffect(() => {
//     // Fetch categories and products here
//     // Replace the URLs with your actual API endpoints
//     fetch('http://localhost:3000/categories')
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error('Error fetching categories:', error));

//     fetch('http://localhost:3000/products')
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error('Error fetching products:', error));

//     // Load cart data from localStorage when the component mounts
//     const storedCart = localStorage.getItem('cart');
//     setLocalCart(storedCart ? JSON.parse(storedCart) : []);
//   }, []);

//   const handleSelectProduct = (productId) => {
//     const product = products.find((product) => product.id === productId);
//     setSelectedProduct(product);
//   };

//   const handleRemoveFromCart = (productId) => {
//     const updatedCart = localCart.filter((cartProduct) => cartProduct.id !== productId);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     setLocalCart(updatedCart);
//   };

//   const handleGoBack = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div className='ProductList'>
//       <div>
//         {selectedProduct ? (
//           <ProductInfo product={selectedProduct} onGoBack={handleGoBack} onAddToCart={setLocalCart} />
//         ) : (
//           <>
//             <Category categories={categories} onSelectCategory={() => {}} />
//             <h2>Top Products</h2>
//             <div className="product-list">
//               {products.map((product) => (
//                 <div key={product.id} className="product-card" onClick={() => handleSelectProduct(product.id)}>
//                   <img className='product-img' src={product.image} alt={product.name} />
//                   <h4 className='product-name'>{product.name}</h4>
//                   <p className='price'>${product.price}</p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//       {selectedProduct ? null : <Cart cart={localCart} onRemoveFromCart={handleRemoveFromCart} />}
//     </div>
//   );
// }

// export default ProductList;


