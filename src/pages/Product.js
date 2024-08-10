import React, { useEffect, useState } from 'react';
import './Product.css';
import Header from './header';
import { Link } from 'react-router-dom';

function Product() {
  const [productQuantities, setProductQuantities] = useState({});
  const [product, setProduct] = useState({});
  const [isNavVisible, setNavVisible] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const storedProduct = localStorage.getItem('product');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
    const closeNavOnOutsideClick = (event) => {
      if (isNavVisible) {
        const header = document.querySelector('.red-header');
        if (header && !header.contains(event.target)) {
          setNavVisible(false);
        }
      }
    };

    document.addEventListener('click', closeNavOnOutsideClick);
    return () => {
      document.removeEventListener('click', closeNavOnOutsideClick);
    };
  }, [isNavVisible]);

  useEffect(() => {
    const storedCartProducts = localStorage.getItem('cartProducts');
    if (storedCartProducts) {
      setCartProducts(JSON.parse(storedCartProducts));
    }
  }, [cartProducts]);

  const handleOrderProduct = (product) => {
    const quantity = productQuantities[product.id] || 0;
    if (quantity > 0) { // เพิ่มเงื่อนไขตรวจสอบว่าจำนวนสินค้ามากกว่า 0
      const total = (product.price * quantity).toFixed(2);
      const updatedCartProducts = [...cartProducts, { ...product, quantity, total }];
      setCartProducts(updatedCartProducts);
      setProductQuantities(prevQuantities => ({
        ...prevQuantities,
        [product.id]: 0
      }));
  
      localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
    }
  };

  const handleQuantityChange = (productId, amount) => {
    if ((productQuantities[productId] || 0) > 0 || amount > 0) {
      setProductQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 0) + amount
      }));
    }
  };
  

  const calculateTotal = (product) => {
    const quantity = productQuantities[product.id] || 0;
    return (product.price * quantity);
  };

  return (
    <div className='bkk'>
      <Header/>
      <br /><br /><br /><br />
      <div className="product-header" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={product.image} alt={product.name} className="product-image-productpage margin-left" />
        <div style={{ marginLeft: '20px' }}>
          <h1 className="product-name-productpage margin-left-name">{product.name}</h1>
          <hr style={{ width: 'auto', margin: '0 auto' }} />
          <p className="product-name-productpage margin-left-name product-description-productpage">{product.description}</p>
          <hr style={{ width: 'auto', margin: '0 auto' }} />
          <h1 className="product-price product-name-productpage margin-left-name" style={{ color: 'red' }}>${product.price}</h1>
          <div className="green-button">
            <div className="quantity-container">
              <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
              <span>{productQuantities[product.id] || 0}</span>
              <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
            </div>
            <h3>Total: ${calculateTotal(product)}</h3>
            <Link to="/cart">
              <button className="edit-button3" onClick={() => handleOrderProduct(product)}>สั่งซื้อสินค้า</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
