import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './account.css';

import Header from './header';



const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isNavVisible ] = useState(false);

  

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  
    
  }, [isNavVisible, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className='bk'>
      <Header/>
    <div className="account-container">
      <div className="account-container1">
        <h2 className="welcome-message">USER</h2>
        {user ? (
          <div className="user-info">
            <p>Username: {user && user.username}</p>
            <p>Password: {user && "*".repeat(user.password.length)}</p>
            <p>FirstName: {user && user.firstName}</p>
            <p>LastName: {user && user.lastName}</p>
            <p>Address: {user && user.address}</p>
            <p>PhoneNumber: {user && user.phonenumber}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
    </div>
  );
};

export default Account;