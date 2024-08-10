import './home.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './material.css';
import Header from './header';


function Equipment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isNavVisible, setNavVisible] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [products, setProducts] = useState([]);


  const [editedProduct, setEditedProduct] = useState(null);
  const [editedProductName, setEditedProductName] = useState('');
  const [editedProductDescription, setEditedProductDescription] = useState('');
  const [editedProductPrice, setEditedProductPrice] = useState('');
  const [editedProductImage, setEditedProductImage] = useState('');

  const handleEditProduct = (product) => {
    setEditedProduct(product);
    setEditedProductName(product.name);
    setEditedProductDescription(product.description);
    setEditedProductPrice(product.price);
    setEditedProductImage(product.image);
  };

  const handleEditConfirmation = () => {
    const updatedProduct = {
      ...editedProduct,
      name: editedProductName,
      description: editedProductDescription,
      price: editedProductPrice,
      image: editedProductImage,
    };

    fetch(`http://localhost:3000/equipment/${editedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      console.log('Product updated successfully');
      setEditedProduct(null);
      setEditedProductName('');
      setEditedProductDescription('');
      setEditedProductPrice('');
      setEditedProductImage('');
    })
    .catch(error => {
      console.error('Error updating product:', error);
    });
  };

  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:3000/equipment/${productId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      console.log('Product deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
  };

  const toggleAddProductModal = () => {
    setShowAddProductModal(!showAddProductModal);
  };

  const handleAddProduct = () => {
    if (isNaN(productPrice)) {
      alert('โปรดใส่ราคาเป็นตัวเลข');
      return; // ไม่ต้องดำเนินการต่อในกรณีที่ price ไม่ใช่ตัวเลข
    }
    fetch('http://localhost:3000/equipment')
      .then((response) => response.json())
      .then((data) => {
        const highestId = data.reduce((maxId, product) => {
          const productIdNumber = Number(product.id.replace('C', ''));
          return productIdNumber > maxId ? productIdNumber : maxId;
        }, 0);

        const product = {
          id: `C${String(highestId + 1).padStart(2, '0')}`,
          name: productName,
          description: productDescription,
          price: productPrice,
          image: productImage,
        };

        return fetch('http://localhost:3000/equipment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductImage('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    const closeNavOnOutsideClick = (event) => {
      fetch('http://localhost:3000/equipment')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error:', error));
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


  function truncate(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

 

  const handleSearch = () => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };
  
    return (
      <div className='bk'>
        <Header/>
        <button className="addproductbt" onClick={toggleAddProductModal}>Add Product</button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
        />
        <button onClick={handleSearch}>Search</button>
        <div className="product-container">
          {(searchResults.length > 0 ? searchResults : products).map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}
              onClick={() => localStorage.setItem('product', JSON.stringify(product))}>
              <img src={product.image} alt={product.name} className="product-image-input" />
            </Link>
              <h3 className="product-name">
                {truncate(product.name, 100)}
              </h3>
              <p className="product-description">{truncate(product.description, 100)}</p>
              <h3>${product.price}</h3>
              <div className="edit-button-container">
                <br></br> <br></br>
                <button className="edit-button" onClick={() => handleEditProduct(product)}>Edit</button>
                <button className="edit-button2" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
  

      {editedProduct && (
        <div className="edit-product-modal">
          <h2>Edit Product</h2>
          <label htmlFor="editedProductName">Product Name:</label> <br />
          <input
            type="text"
            id="editedProductName"
            value={editedProductName}
            onChange={(e) => setEditedProductName(e.target.value)}
          /> <br /> <br />
          <label htmlFor="editedProductName">Product Description </label> <br />
          <input
            type="text"
            id="editedProductName"
            value={editedProductDescription}
            onChange={(e) => setEditedProductDescription(e.target.value)}
          /> <br /> <br />
          <label htmlFor="editedProductName">Product Price:</label> <br />
          <input
            type="text"
            id="editedProductName"
            value={editedProductPrice}
            onChange={(e) => setEditedProductPrice(e.target.value)}
          /> <br /> <br />
          <label htmlFor="editedProductName">Product Image URL:</label> <br />
          <input
            type="text"
            id="editedProductName"
            value={editedProductImage}
            onChange={(e) => setEditedProductImage(e.target.value)}
          /> <br /> <br />
          <button onClick={handleEditConfirmation}>Confirm</button>
          <button onClick={() => setEditedProduct(null)}>Cancel</button>
        </div>
      )}

      {showAddProductModal && (
        <div className="edit-product-modal">
          <h2>Add Product Equipment</h2>
          <label htmlFor="productName">Product Name:</label> <br />
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          /> <br /> <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <label htmlFor="productDescription">Product Description:</label> <br />
              <textarea
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
          </div>
          <br /> <br />
          <label htmlFor="productPrice">Product Price:</label> <br />
          <input
            type="text"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          /><br /> <br />
          <label htmlFor="productImage">Product Image URL:</label>
          <input
            type="text"
            id="productImage"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            className="product-image-input"
          /> <br /> <br />
          <div>
            <button onClick={handleAddProduct} style={{ marginRight: '10px' }}>Add Product</button>
            <button onClick={toggleAddProductModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Equipment;
