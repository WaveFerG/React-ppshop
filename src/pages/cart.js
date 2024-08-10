import React, { useState, useEffect } from 'react';
import Header from './header';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const storedCartProducts = localStorage.getItem('cartProducts');
    if (storedCartProducts) {
      setCartProducts(JSON.parse(storedCartProducts));
    }
  }, []);

  const handleDeleteProduct = (index) => {
    const updatedCart = [...cartProducts];
    updatedCart.splice(index, 1);
    setCartProducts(updatedCart);
    localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
        <Header/>
      <h1>Cart</h1>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartProducts.map((product, index) => (
            <div className="cart-item" key={index}>
              <img src={product.image} alt={product.name} className="imagecart" />
              <div>
                <h2>{product.name}</h2>
                <p>จำนวน: {product.quantity}</p>
                <p>Total: ${product.total}</p>
                <h1>
                <img src="https://cdn.discordapp.com/attachments/1213814535220105268/1214210898567233617/image.png?ex=65f84905&is=65e5d405&hm=a8016c942366f448bca03218e30d7f95dca7c3fefd72a2f7e6c3a2afdef9698f&" alt="Descriptive text" className="logo-image" />
                </h1>
              </div>
              <button onClick={() => handleDeleteProduct(index)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;