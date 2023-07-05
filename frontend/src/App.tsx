import React, { useEffect } from 'react';
import './App.css';
import { Box } from '@mui/material';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Home from './containers/Home/Home';
import { Route, Routes } from 'react-router-dom';
import AboutCompany from './containers/AboutCompany/AboutCompany';
import Companies from './containers/Companies/Companies';
import { useLocation } from 'react-router-dom';
import Admin from './containers/Admin/Admin';
import Register from './containers/users/Register';
import Login from './containers/users/Login';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Box>
        <AppToolBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/about-company" element={<AboutCompany />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<span>Такой страницы не существует</span>} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
