import React from 'react';

const Navbar = ({ buttons }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-4">
      <div className="navbar-container rounded-full bg-gray-900 p-2 shadow-lg" style={{ backgroundColor: '#374151' }}>
        {buttons.map((button, index) => (
          <button
            key={index}
            className="navbar-button transition-colors duration-300 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring focus:ring-gray-300 text-lg" 
            style={{
              backgroundColor: button.color === 'white' ? '#1F2937' : '#1F2937',
              color: 'white',
              padding: '10px 18px',
              borderRadius: '999px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              margin: '0 4px',
            }}
            onClick={button.onClick}
            aria-label={button.label}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
