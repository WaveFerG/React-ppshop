import React from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import Home from './pages/home';
import { Header } from './pages/header';
import Login from './login/login';
import Register from './login/register';
import Material from './pages/material';
import Equipment from './pages/equipment';
import Account from './pages/account';
import Footer from './pages/footer';
import Product from './pages/Product';
import Cart from './pages/cart';




const App = () => {
  return (

     <Router>
      
      <Routes>
       
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/header" element={<Header />} />
        <Route path="/register" element={<Register />} />
        <Route path="/material" element={<Material />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/account" element={<Account />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      
        
        
     </Routes>
     <Footer/>
    
     </Router>
    
  );
};

export default App;