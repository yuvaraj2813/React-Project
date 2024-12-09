
import React from 'react';
import NavBar from '../Pages/Home/Nav';

const Layout = ({ children, userRole, handleLogout }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* NavBar */}
      <NavBar userRole={userRole} handleLogout={handleLogout} />
      {/* Safe area for content */}
      <div className="flex-1 overflow-auto pt-[60px]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
