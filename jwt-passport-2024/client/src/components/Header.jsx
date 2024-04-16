import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
      
        
         <div className='flex justify-between'>
           <div>
           <Link to ="/" className='text-2xl font-bold'>Authentication</Link>
           </div>
           <div className='flex gap-5 font-bold'>
           <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link>
           </div>
        </div>
        
      
    );
};

export default Header;