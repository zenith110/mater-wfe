import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import AssetAddModal from './components/add-assets/AssetAddModal';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

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

  const openAddAssetModal = () => {
    setModalOpen(true);
  };

  const closeAddAssetModal = () => {
    setModalOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} openAddAssetModal={openAddAssetModal} />
        <Routes>
          <Route path="/home" element={isLoggedIn ? <Home username={username} /> : <Navigate to="/" />} />
          <Route path="/add-asset" element={<AssetAddModal onClose={closeAddAssetModal} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} setError={setError} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login handleLogin={handleLogin} setError={setError} />} />
        </Routes>
        {isModalOpen && <AssetAddModal onClose={closeAddAssetModal} />}
        {error && <div className="error">{error}</div>}
      </div>
    </Router>
  );
}

export default App;
