import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../database/data.json';
import './home.css';
import Header from './header';

function Home() {
  const [isNavVisible, setNavVisible] = useState(false);
  const [randomProducts, setRandomProducts] = useState({ material: [], equipment: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // เพิ่ม state เพื่อเก็บประเภทของสินค้าที่เลือก

  useEffect(() => {
    setRandomProducts({
      material: getRandomProducts(data.material),
      equipment: getRandomProducts(data.equipment),
    });
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
    // Update random products when search term changes
    setRandomProducts({
      material: getRandomProducts(data.material),
      equipment: getRandomProducts(data.equipment),
    });
  }, [searchTerm]);

  function getRandomProducts(array, n) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  function truncate(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  // Filter products based on search term
  const filteredMaterial = randomProducts.material.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredEquipment = randomProducts.equipment.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // เพิ่มฟังก์ชั่นเพื่อเปลี่ยนแสดงประเภทของสินค้า
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  return (
    <div className='bk'>
      <Header />
      <div className="home-container">
        <h1>ยินดีต้อนรับสู่บริษัทขายวัสดุและอุปกรณ์ปะปา</h1>
        <p>เราคือบริษัทชั้นนำในการจำหน่ายวัสดุและอุปกรณ์ปะปาที่มีคุณภาพและความเชื่อถือได้</p>
        <p>เรามุ่งมั่นในการให้บริการที่ดีที่สุดแก่ลูกค้าทุกๆ ท่าน</p>
      </div>
      <h2>รูปตัวอย่างสินค้าทั้งหมดของเรา</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="ค้นหาสินค้า..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* ปุ่มสำหรับเปลี่ยนแสดงประเภทของสินค้า */}
      <div className="category-buttons">
        <button onClick={() => handleCategoryChange('all')}>All</button>
        <button onClick={() => handleCategoryChange('material')}>Material</button>
        <button onClick={() => handleCategoryChange('equipment')}>Equipment</button>
      </div>
      {/* แสดงสินค้าตามประเภทที่เลือก */}
      <div className="product-display">
        {selectedCategory === 'all' || selectedCategory === 'material' ?
          filteredMaterial.map((product, index) => (
            <div key={index} className="product-card">
              <Link to={`/product/${product.id}`}
                onClick={() => localStorage.setItem('product', JSON.stringify(product))}>
                <img src={product.image} alt={product.name} className="product-image-input" />
              </Link>
              <h3>{truncate(product.name, 100)}</h3>
              <h3 className="price">${product.price} บาท</h3>
            </div>
          )) : null
        }
        {selectedCategory === 'all' || selectedCategory === 'equipment' ?
          filteredEquipment.map((product, index) => (
            <div key={index} className="product-card">
              <Link to={`/product/${product.id}`}
                onClick={() => localStorage.setItem('product', JSON.stringify(product))}>
                <img src={product.image} alt={product.name} className="product-image-input" />
              </Link>
              <h3>{truncate(product.name, 100)}</h3>
              <h3 className="price">${product.price} บาท</h3>
            </div>
          )) : null
        }
      </div>
    </div>
  );
}

export default Home;
