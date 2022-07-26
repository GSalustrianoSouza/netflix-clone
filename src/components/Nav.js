import React, { useEffect } from 'react';
import './Nav.css';

function Nav() {

    const [show, setShow] = React.useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        setShow(window.scrollY > 100);
      })
    }, [])
    
  return (
    <div className={`nav-container ${show && 'nav-container-black'}`}>
        <img className='nav-logo' src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt='Netflix'></img>
        <div className='nav-menu-container'>
            <ul>
              <li><a href='#'>Início</a></li>
              <li><a href='#'>Séries</a></li>
              <li><a href='#'>Filmes</a></li>
              <li><a href='#'>Bombando</a></li>
              <li><a href='#'>Minha lista</a></li>
            </ul>
        </div>
        <div className='nav-search'><i className="fas fa-search"></i></div>
        <div className='nav-infantil'><p className='infantil'>Infantil</p></div>
        <div className='nav-notifications'><i className="fas fa-bell"></i></div>
        <img className='nav-avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt='User'></img>
        <div className='nav-setinha'><i className="fas fa-caret-down"></i></div>
    </div>
  )
}

export default Nav;