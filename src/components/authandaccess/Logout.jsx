import React from 'react';

const Logout = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    // Revoke access token to log out
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out from Google');
      setIsLoggedIn(false);
    });
  };

  return (
    <div className="logout-container">
      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
