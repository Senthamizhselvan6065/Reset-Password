import React from 'react';
import '../styles/pagenot.css';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

  const navigate = useNavigate();

  return (
    <div className='page-not-found-container'>
        <div className="page-not-found-card">
            <div className="name">
               <h3>O</h3>
               <h4>o</h4>
               <h4>p</h4>
               <h4>s</h4>
               <h4>!</h4>
            </div>
            <p>404 - PAGE NOT FOUND...</p>
            <button onClick={()=>navigate('/')}>GO TO HOMEPAGE</button>
        </div>
    </div>
  )
}

export default PageNotFound