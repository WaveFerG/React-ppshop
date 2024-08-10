import React ,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import './header.css';

export function Header() {
    const [isNavVisible, setNavVisible] = useState(false);
    const toggleNav = () => {
        setNavVisible(!isNavVisible);
      };
      const location = useLocation();
      const user = location.state;
    

  return (

    <div>
        
    <header className={`header-nav ${isNavVisible ? 'nav-open' : ''}`}>
    <div className="menu" onClick={toggleNav}>
 
      <span className="menu-icon">☰▶Menu</span>
     
    </div>
    <div className="spacer"></div>
    <a href='/home' className = "pp-shop" >PP Shop</a>
    
    <div className="header-icons">
      <div className="spacer"></div>
      <Link to="/account" state={{ user }}>
        <FontAwesomeIcon icon={faUser} className="fa-icon" />
      </Link>
    </div>


    
  </header>
  
  <nav className={`navbar ${isNavVisible ? 'nav-open' : 'nav-close'}`}>
  <ul>
    <li>
      <Link to="/material">Material</Link>
    </li>
    <li>
      <Link to="/equipment">Equipment</Link>
    </li>
  </ul>

</nav>
  
</div>
    
  );
};

export default Header;