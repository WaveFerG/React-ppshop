import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate()

  
    const handleLogin = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch('http://localhost:3000/users');
        
        if (response.ok) {
          const users = await response.json();
          const user = users.find(user => user.username === username && user.password === password);
          if (user) {
            console.log(user);
            alert('Login success');
    
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(user));
    
            // ทำการล็อคอินเสร็จแล้วไปที่หน้า Home และส่งข้อมูลผู้ใช้ไปที่หน้า Account
            navigate('/Home', { state: user });
          } else {
            alert('username or password is incorrect.');
          }
        } else {
          const errorMessage = await response.json();
          alert(errorMessage.message);
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
      }
    };


  return (
    <div className='bk'>
         <header className={`top-header : ''}`}>
        <div className="spacer"></div>
        <a href='/login' className = "pp-shop" >PP Shop</a>
      </header>
    <div className={'mainContainer'}>
    <div className={'titleContainer'}>
        <div>Welcome To PP SHOP </div>
    
      </div>
      <div className={'titleContainer'}>
        <div>Login</div>
    
      </div>
      <br />
      <form onSubmit={handleLogin}>
      <div className={'inputContainer'}>
        
        <input 
          type="text"
          value={username}
          placeholder="Enter your username here"
          onChange={(e) => setUsername(e.target.value)}
          className={'inputBox'}
        />
       
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(e) => setPassword(e.target.value)}
          className={'inputBox'}
        />
       
      </div>
      <br />

      <div className={'logreg'} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', justifyContent: 'center' }}>
      <input className={'inputButton'} type="button" onClick={handleLogin} value={'Log in'} />
     <Link to="/register">
      <button className={'inputButton'}>
        Register
      </button>
      </Link>
    </div>

         </form>
    </div>
    </div>
  );
};

export default Login;