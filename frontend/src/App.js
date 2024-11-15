// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EventPage from './pages/EventPage';
import AboutPage from './pages/AboutPage';
import Community from './pages/Community';
import RedeemPage from './pages/RedeemPage';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div>
      <NavigationBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/redeem" element={<RedeemPage />} />
        </Routes>
        {/* <Footer/> */}
      </div>
    </Router>
  );
}

export default App;
