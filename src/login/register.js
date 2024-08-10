import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !firstName || !lastName || !address || !phonenumber) {
      setError('โปรดใส่ข้อมูลให้ครบถ้วน');
      return;
    }

    const newUser = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phonenumber: phonenumber
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        alert('Registration successful');
        window.location.href = '/'; 
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='bk'>
         <header className={`top-header : ''}`}>
        <div className="spacer"></div>
        <a href='/login' className = "pp-shop" >PP Shop</a>
      </header>
      <div className="register-container">
        <h2>Welcome To Register Page</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
            <div className="password-field">
  <input
    type={showPassword ? "text" : "password"} 
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="input-field"
    
  />
  
</div>
<button
    type="button" 
    onClick={() => setShowPassword(!showPassword)} 
    className="toggle-password-button"
  >
    {showPassword ? "HidePassword" : "ShowPassword"} {/* เปลี่ยนข้อความบนปุ่มโดยดูจากสถานะของ showPassword */}
  </button>
            {/* ส่วนอื่นๆเหมือนเดิม */}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="input-field"
              pattern="\d*"
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <div className={'logreg'} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', justifyContent: 'center' }}>
          <Link to="/" className="register-button">Back to Login</Link>
          <button type="submit" className="register-button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
