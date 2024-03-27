// Navbar.js

import React, { useState } from 'react';

const Navbar = ({ buttons, isOpen, toggleNavbar }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (index) => {
    setActiveButton(index);
    setTimeout(() => setActiveButton(null), 200);
  };

  return (
    <div className="fixed bottom-0 left-4 md:left-1/2 transform md:-translate-x-1/2 flex flex-row justify-center items-end space-x-4 p-4">
      <div className="md:hidden relative">
        <div className={`drawer-container ${isOpen ? 'open' : ''}`}>
          <button
            className="drawer-toggle-button flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 text-white"
            onClick={toggleNavbar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
          {isOpen && (
            <div className="drawer-menu bg-gray-900 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 absolute bottom-16 right-auto left-4 rounded-md overflow-hidden flex flex-col">
              {buttons.map((button, index) => (
                <React.Fragment key={index}>
                  {button.spacer ? <div className="spacer" /> : null}
                  <button
                    className={`drawer-button transition-colors duration-300 bg-gray-600 hover:bg-gray-700 text-white focus:outline-none focus:ring focus:ring-gray-300 text-lg font-medium rounded-full px-4 py-2 md:px-6 md:py-3 ${activeButton === index ? 'transform scale-105' : ''}`}
                    style={{
                      cursor: 'pointer',
                      transition: 'background-color 0.3s, transform 0.2s',
                      marginTop: '3px',
                      marginBottom: '3px',
                      width: 'calc(100% - 2px)', 
                      borderRadius: '5px', 
                    }}
                    onClick={() => {
                      button.onClick();
                      handleClick(index);
                    }}
                    aria-label={button.label}
                  >
                    {button.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:flex navbar-container md:rounded-full bg-gray-900 p-4 md:p-4 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
        {buttons.map((button, index) => (
          <React.Fragment key={index}>
            {button.spacer ? <div className="spacer" /> : null} {/* Transparent Spacer */}
            <button
              className={`navbar-button transition-colors duration-300 bg-gray-600 hover:bg-gray-700 text-white focus:outline-none focus:ring focus:ring-gray-300 text-lg font-medium rounded-full px-4 py-2 md:px-6 md:py-3 ${activeButton === index ? 'transform scale-105' : ''}`}
              style={{
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.2s',
                marginRight: '8px',
                flex: '1'
              }}
              onClick={() => {
                button.onClick();
                handleClick(index);
              }}
              aria-label={button.label}
            >
              {button.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
