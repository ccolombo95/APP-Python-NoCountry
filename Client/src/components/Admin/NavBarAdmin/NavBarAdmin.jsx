import React, { useState } from 'react';
import "./NavBarAdmin.css";
import logo from "../../../../public/Assets/AdoptAppLogo.png"; // Importa la imagen usando una ruta relativa

function NavBarAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpenUser, setMenuUserOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleMenuUser = () => {
    setMenuUserOpen(!menuOpenUser);
  };

  return (
    <div id='NavBarAdminContainer'>

      <div id='AsideBarContainer'>
        <span id="NavBarAdminMenu" onClick={toggleMenu}>
          <span className={`Line1Menu ${menuOpen ? 'active' : ''}`}></span>
          <span className={`Line2Menu ${menuOpen ? 'active' : ''}`}></span>
          <span className={`Line3Menu ${menuOpen ? 'active' : ''}`}></span>
        </span>

        <ul id="Links"  className={` ${menuOpen ? 'show' : ''}`}  >
          <li><a href="/Admin/Posts">Mascotas</a></li>
          <li><a href="/Admin/Bookings">Solicitantes</a></li>
          <li><a href="/Admin/News">Noticias</a></li>
        </ul>
      </div>

      <a href="/">
        <img id='NavBarAdminlogo' src={logo} alt="Logo" />
      </a>

      <div id="UserContainer">
        <span className="User">
          <p>User</p>
          <p className={`flecha ${menuOpenUser ? 'active' : ''}`} onClick={toggleMenuUser}>&#94;</p>
        </span>  
        <ul id='NavBarAdminList' className={menuOpenUser ? 'show' : ''}>
          <li className="NavBarAdminListItem"><a href="/" className='NavBarAdminLinks'>CERRAR SESIÓN</a></li>
        </ul>
      </div>

    </div>
  );
}

export default NavBarAdmin;
