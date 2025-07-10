
import  { useState } from 'react';
import './App.css';


function Header() {
  return (
    <header className="app-header">
      <div className="app-header-icon"></div>
      <h1 className="app-title-gradient">BookFinder Pro</h1>
      <p className="app-subtitle">
        Discover millions of books from OpenLibrary's vast collection.
      </p>
    </header>
  );
}

export default Header;
