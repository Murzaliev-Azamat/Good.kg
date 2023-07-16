import React, { useState } from 'react';
import { Avatar, Button, Grid, Menu, MenuItem } from '@mui/material';
import { User } from '../../../../types';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../containers/users/usersThunks';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <>
      {/*<Grid container justifyContent="space-between" alignItems="center">*/}
      {/*<Grid item>*/}
      <Button onClick={handleClick} sx={{ color: 'grey', padding: { xs: '6px 0px 4px 8px', web: '6px 8px' } }}>
        Привет, {user.displayName}
      </Button>
      {/*</Grid>*/}
      {/*<Grid item>*/}
      {/*<Avatar alt="Avatar" src={user.image} />*/}
      {/*</Grid>*/}
      {/*</Grid>*/}
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Профиль</MenuItem>
        {/*<MenuItem component={Link} to={'/tracks_history'}>*/}
        {/*  Track History*/}
        {/*</MenuItem>*/}
        <MenuItem onClick={handleLogout}>Выход</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
