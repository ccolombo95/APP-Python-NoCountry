import React, { useState} from 'react';

import "./NavBar.css";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div id='NavBarContainer'>
      <nav>
        <div id='NavBarSpanContainer'> 
          <a href="/">
            <img id='NavBarlogo' src="./Assets/AdoptAppLogo.png" alt="" />
          </a>
          

          <span id="NavBarMenu" onClick={toggleMenu}>
            <span className={`Line1Menu ${menuOpen ? 'active' : ''}`}></span>
            <span className={`Line2Menu ${menuOpen ? 'active' : ''}`}></span>
            <span className={`Line3Menu ${menuOpen ? 'active' : ''}`}></span>
          </span>
        </div>
        
        <ul id='NavBarList' className={menuOpen ? 'show' : ''}>
          <li className="NavBarListItem"><a href="/" className='NavBarLinks'>Inicio</a></li>
          <li className="NavBarListItem"><a href="/Mascotas" className='NavBarLinks'>Mascotas</a></li>
          <li className="NavBarListItem"><a href="/SobreNosotros" className='NavBarLinks'>Sobre Nosotros</a></li>
          <li className="NavBarListItem"><a href="#LadingPageSection6Container" className='NavBarLinks' id='NavBarLinksContactanos'>Contactanos</a></li>
        </ul>
      
      </nav>
    </div>
  );
}

export default NavBar;
