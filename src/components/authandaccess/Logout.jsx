import React from 'react';
import Cookies from 'js-cookie';

const Logout = ({ setIsLoggedIn , }) => {
  const handleLogout = () => {
    Cookies.remove('isLoggedIn');
    Cookies.remove('user');
    Cookies.remove('userImg');
    Cookies.remove("loginMethod"); // Remove login method cookie
    Cookies.remove("backendToken");
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2.isSignedIn.get()) {
      auth2.signOut().then(() => {
        console.log('User signed out from Google');
        setIsLoggedIn(false);
      });
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
