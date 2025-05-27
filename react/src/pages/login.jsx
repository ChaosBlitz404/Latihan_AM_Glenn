import React, { Component, useState } from 'react'
import CircularBox from '../components/CircularBox'
import CircularInput from '../components/CircularInput'
import '../css_files/login.css'
import FancyButton from '../components/FancyButton'
import profilePic from '../assets/PP 1.png'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import NormalButton from '../components/NormalButton'
import { useAuth } from '../context/authcontext'

const login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const goRegister = async (e) => {
    navigate('/register'); 
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try{
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true
      });
      
      const res = await axios.post(
        'http://127.0.0.1:8000/auth',
        { email, password },
        { withCredentials: true }
      );
      console.log('Login success:', res.data);
      setMsg('Login success!');
      login();
      if(res.data.user.role != 'Admin') navigate('/profile/' + res.data.user.id);
      else navigate('/');
    }
    catch(err){
      console.error('Login error:', err.response?.data);
      setMsg('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  }
  return (
    <>
      <div className='biggerPart'>

        <img src={profilePic} className='imageLogin'/>
          <CircularBox addClass='additionalCircular'>
            <h2>
              Login
            </h2>
            <hr className='shorterHr'/>
            <div className='loginForm' >
                <CircularInput 
                  name='Email' 
                  placeholder='Email Address' 
                  type='email'
                  value={email}
                  section='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  inputClass='widthMoment'
                />
                <CircularInput 
                  name='Password' 
                  section='Password'
                  placeholder='Password' 
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputClass='widthMoment'
                  />
                                
                             
                  <div className='bottomSection'>
                 
                  
          
      
                  <NormalButton section='Register' className='registerButton' onClick={goRegister}/>  

                  <p className='orTxt'>OR</p>

                  <FancyButton section='Login' className='loginButton' onClick={handleLogin}/>
                </div>
            </div>
            
            {msg && <p style={{ color: 'red', marginTop: '10px' }}>{msg}</p>}
            </CircularBox>
              
      </div>
    </>
  )
}

export default login
