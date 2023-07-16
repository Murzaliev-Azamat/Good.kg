import React from 'react';
import CardForPromotion from '../../components/UI/CardForPromotion/CardForPromotion';
import {
  clearAllPromotions,
  selectFetchAllLoading,
  selectHasMorePromotion,
  selectPromotions,
} from '../../store/promotionsSlice';
import { fetchPromotions, fetchPromotionsByCategory, fetchPromotionsBySearch } from '../../store/promotionsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import InfiniteScroll from 'react-infinite-scroller';
import { selectFilterCategory, selectFilterSubCategory } from '../../store/filterSlice';
import { selectSearch, setSearch } from '../../store/searchSlice';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box } from '@mui/material';
import { clearAllCompanies } from '../../store/companiesSlice';

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'black',
  opacity: '0.3',
  flexGrow: 1,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    opacity: '0.5',
    backgroundColor: 'black',
  },
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: 'white',
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
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const Promotions = () => {
  const dispatch = useAppDispatch();
  const promotions = useAppSelector(selectPromotions);
  const hasMorePromotion = useAppSelector(selectHasMorePromotion);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);
  const filterCategory = useAppSelector(selectFilterCategory);
  const filterSubcategory = useAppSelector(selectFilterSubCategory);
  const search = useAppSelector(selectSearch);

  // console.log(search);
  console.log(promotions);

  const loadMore = async () => {
    if (fetchAllLoading) {
      return;
    } else {
      if (filterCategory !== '' && filterSubcategory === '') {
        await dispatch(fetchPromotionsByCategory({ category: filterCategory }));
      } else if (filterSubcategory !== '') {
        await dispatch(fetchPromotionsByCategory({ category: filterSubcategory }));
      } else if (search !== '') {
        await dispatch(fetchPromotionsBySearch({ search: search }));
      } else {
        await dispatch(fetchPromotions());
      }
    }
  };

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearch(value));
  };

  const onKeyUpSearch = async () => {
    dispatch(setSearch(search));
    window.scrollTo(0, 0);
    await dispatch(clearAllPromotions());
  };

  return (
    <>
      <Box sx={{ display: { xs: 'block', web: 'none' }, width: '17.95rem', margin: '0px auto' }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase onKeyUp={onKeyUpSearch} placeholder="Search…" onChange={onTextFieldChange} />
        </Search>
      </Box>
      <InfiniteScroll
        // pageStart={0}
        loadMore={loadMore}
        hasMore={hasMorePromotion}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        // initialLoad={true}
        // useWindow={true}
      >
        <div className="row p-2 gx-0 justify-content-evenly justify-content-sm-start">
          {promotions.map((promotion) => (
            <CardForPromotion
              key={promotion._id}
              title={promotion.title}
              description={promotion.description}
              company_name={promotion.company.title}
              promotion_image={promotion.image}
              id={promotion._id}
              rating={promotion.rating}
              userLikes={promotion.userLikes}
              isAlways={promotion.isAlways}
              isFresh={promotion.isFresh}
              companyLink={promotion.company.link}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Promotions;
