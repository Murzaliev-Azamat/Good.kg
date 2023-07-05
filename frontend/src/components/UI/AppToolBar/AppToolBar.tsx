import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MainFilter from '../MainFilter/MainFilter';
import { Button } from '@mui/material';
import Menu from '../Menu/Menu';
import { NavLink } from 'react-router-dom';
import FormForFilter from '../FormForFilter/FormForFilter';
import { setCategory, setSubCategory } from '../../../store/filterSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clearAllPromotions } from '../../../store/promotionsSlice';
import { clearAllCompanies } from '../../../store/companiesSlice';
import { selectSearch, setSearch } from '../../../store/searchSlice';
import AnonymousMenu from './AnonymousMenut';
import UserMenu from './UserMenu';
import { selectUser } from '../../../containers/users/usersSlise';

const Search = styled('div')(({ theme }) => ({
  flexGrow: 1,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#000'),
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
  },
  borderColor: '#fff',
}));

const Link = styled(NavLink)({
  color: 'inherit',
  marginRight: '15px',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

export default function SearchAppBar() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);
  const user = useAppSelector(selectUser);
  const [showMainFilter, setShowMainFilter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const cancelMainFilter = () => setShowMainFilter(false);

  const cancelMenu = () => setShowMenu(false);

  const getStartInfo = async () => {
    dispatch(setSearch(''));
    dispatch(setCategory(''));
    dispatch(setSubCategory(''));
    dispatch(clearAllPromotions());
    dispatch(clearAllCompanies());
    setShowMenu(false);
  };

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // const name = e.target.name;
    dispatch(setSearch(value));
    // setSearch(prev => (value));
  };

  const onKeyUpSearch = async () => {
    dispatch(setSearch(search));
    window.scrollTo(0, 0);
    await dispatch(clearAllPromotions());
    await dispatch(clearAllCompanies());
  };

  return (
    <Box>
      <MainFilter show={showMainFilter} title="Расширенный фильтр" onClose={cancelMainFilter}>
        <div className="modal-body">
          <FormForFilter />
        </div>
        {/*<div className="modal-footer">*/}
        {/*  <button className="btn btn-danger" onClick={cancelMainFilter}>Cancel</button>*/}
        {/*</div>*/}
      </MainFilter>
      <Menu show={showMenu} title="Меню" onClose={cancelMenu} getStartInfo={getStartInfo}></Menu>
      <AppBar sx={{ zIndex: 1 }}>
        <Toolbar>
          <Link to={'/'} onClick={getStartInfo}>
            LIROG.KG
          </Link>
          <Search sx={{ mr: 3 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase onKeyUp={onKeyUpSearch} placeholder="Search…" onChange={onTextFieldChange} />
          </Search>
          <ColorButton variant="outlined" onClick={() => setShowMainFilter(true)}>
            Filter
          </ColorButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 2 }}
            onClick={() => setShowMenu(true)}
          >
            <MenuIcon sx={{ fontSize: 40 }} />
          </IconButton>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
