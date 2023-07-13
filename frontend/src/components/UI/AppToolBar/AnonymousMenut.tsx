import React from 'react';
import { Button } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Button
        component={NavLink}
        to="/register"
        sx={{
          color: 'orange',
          '&:hover': {
            color: 'grey',
          },
        }}
      >
        Sign up
      </Button>
      <Button
        component={NavLink}
        to="/login"
        sx={{
          color: 'orange',
          '&:hover': {
            color: 'grey',
          },
        }}
      >
        Sign in
      </Button>
    </>
  );
};

export default AnonymousMenu;
