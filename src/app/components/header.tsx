
'use client'
import React from 'react';
import '../style/header.css';

export const Header = () => {
  return <div className="header">
    <img src='https://placehold.co/50x50'/>
    <input type="text" placeholder="Search for unique items"/>
    <button>Cart</button>
    <div>
        <button>Login</button>
        <button>Profile</button>
    </div>
  </div>;
}