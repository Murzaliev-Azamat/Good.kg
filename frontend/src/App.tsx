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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './containers/users/usersSlise';
import AdminCategory from './containers/Admin/AdminCategory';
import AdminCompany from './containers/Admin/AdminCompany';
import AdminPromotion from './containers/Admin/AdminPromotion';
import FormForCategory from './components/UI/FormForCategory/FormForCategory';
import FormForCompany from './components/UI/FormForCompany/FormFormCompany';
import FormForPromotion from './components/UI/FormForPromotion/FormForPromotion';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const user = useAppSelector(selectUser);

  return (
    <div className="App">
      <Box>
        <AppToolBar />
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route path="admin-category" element={<AdminCategory />} />
            <Route path="admin-company" element={<AdminCompany />} />
            <Route path="admin-promotion" element={<AdminPromotion />} />
          </Route>
          <Route
            path="/add-category"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <FormForCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-company"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <FormForCompany />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-promotion"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <FormForPromotion />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
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
