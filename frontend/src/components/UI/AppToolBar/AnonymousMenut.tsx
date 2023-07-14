import React from 'react';
import { Button } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Button
        component={NavLink}
        to="/login"
        sx={{
          color: 'grey',
          '&:hover': {
            color: 'grey',
          },
          fontSize: '11px',
          padding: { xs: '3px 0px 0px 0px', web: '3px 0px' },
        }}
      >
        Вход
      </Button>
      <Button
        component={NavLink}
        to="/register"
        sx={{
          color: 'grey',
          '&:hover': {
            color: 'grey',
          },
          fontSize: '11px',
          padding: { xs: '3px 0px 1px 0px', web: '3px 0px' },
        }}
      >
        Регистрация
      </Button>
    </>
  );
};

export default AnonymousMenu;
