import React from 'react';
import '../Header.css';

const Header = () => {
  const handleButtonClick = (feature) => {
    alert(`${feature} clicked!`);
  };

  return (
      <div className="main-content">
        <h1>Welcome to the Dashboard</h1>
        <p>Select an option from the sidebar to proceed.</p>
      </div>
  );
};

export default Header;
