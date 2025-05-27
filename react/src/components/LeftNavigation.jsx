import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css_files/nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse , faRightFromBracket  } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../context/authcontext';

const LeftNavigation = () => {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }); 
      await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
      console.log("Logged out successfully");
      logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err.response?.data || err.message);
    }
  };

  return (
    <div className='leftSide'>
      <ul className="navLink">
        <li className='dashboard'>
            <FontAwesomeIcon icon={faHouse} />
            <Link className='dashLink' to='/'>Dashboard</Link>
        </li>
        <li>
          <div className='logout' onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default LeftNavigation
