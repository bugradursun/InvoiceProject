// src/App.js
import React, { useEffect, useState } from 'react';
import AuthorizePage from './AuthorizePage';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    setIsAuthorized(true)
  },[])

  return (
    <div className="App">
      <h1>Welcome to Authorize App</h1>
      {isAuthorized ? (
        <AuthorizePage/>
      ) : (
        <p>Not authorized,log in </p>
      )}
    </div>
  );
}

export default App;
