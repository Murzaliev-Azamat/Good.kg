import React from 'react';
import CardForPromotion from '../../components/UI/CardForPromotion/CardForPromotion';
import { selectFetchAllLoading, selectHasMorePromotion, selectPromotions } from '../../store/promotionsSlice';
import { fetchPromotions, fetchPromotionsByCategory, fetchPromotionsBySearch } from '../../store/promotionsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import InfiniteScroll from 'react-infinite-scroller';
import { selectFilterCategory, selectFilterSubCategory } from '../../store/filterSlice';
import { selectSearch } from '../../store/searchSlice';

const Promotions = () => {
  const dispatch = useAppDispatch();
  const promotions = useAppSelector(selectPromotions);
  const hasMorePromotion = useAppSelector(selectHasMorePromotion);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);
  const filterCategory = useAppSelector(selectFilterCategory);
  const filterSubcategory = useAppSelector(selectFilterSubCategory);
  const search = useAppSelector(selectSearch);

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

  return (
    <>
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
              company_image={promotion.company.image}
              id={promotion._id}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Promotions;
