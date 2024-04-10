import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup'; // Import the Signup component
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    setError('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin} />
        <Routes>
          <Route path="/home" element={isLoggedIn ? <Home username={username} /> : <Navigate to="/" />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} setError={setError} />} />
          <Route path="/signup" element={<Signup />} /> {/* Add Route for the Signup component */}
          <Route path="/" element={<Login handleLogin={handleLogin} setError={setError} />} />
        </Routes>
        {error && <div className="error">{error}</div>}
      </div>
    </Router>
  );
}

export default App;
