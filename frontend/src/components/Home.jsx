import React from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='home-container'>
        <div className="home-card">
             <h2>Password Reset Application</h2>
                <div className="button">
                     <button className='register' onClick={()=>navigate('/register')}>Sign in</button>
                     <button className='login' onClick={()=>navigate('/login')}>Sign up</button>
                </div>
        </div>
    </div>
  )
}

export default Home