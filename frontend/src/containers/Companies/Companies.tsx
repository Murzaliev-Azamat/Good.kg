import React from 'react';
import { selectCompanies, selectFetchAllLoading, selectHasMoreCompany } from '../../store/companiesSlice';
import { fetchCompanies, fetchCompaniesByCategory, fetchCompaniesBySearch } from '../../store/companiesThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CardForCompany from '../../components/UI/CardForCompany/CardForCompany';
import AdvBlock from '../../components/UI/AdvBlock/AdvBlock';
import InfiniteScroll from 'react-infinite-scroller';
import { selectFilterCategory, selectFilterSubCategory } from '../../store/filterSlice';
import { selectSearch } from '../../store/searchSlice';

const Companies = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(selectCompanies);
  const hasMoreCompany = useAppSelector(selectHasMoreCompany);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);
  const filterCategory = useAppSelector(selectFilterCategory);
  const filterSubcategory = useAppSelector(selectFilterSubCategory);
  const search = useAppSelector(selectSearch);

  const loadMore = async () => {
    if (fetchAllLoading) {
      return;
    } else {
      if (filterCategory !== '' && filterSubcategory === '') {
        await dispatch(fetchCompaniesByCategory({ category: filterCategory }));
      } else if (filterSubcategory !== '') {
        await dispatch(fetchCompaniesByCategory({ category: filterSubcategory }));
      } else if (search !== '') {
        await dispatch(fetchCompaniesBySearch({ search: search }));
      } else {
        await dispatch(fetchCompanies());
      }
    }
  };

  return (
    <AdvBlock urlImage="https://www.ts.kg/olol1/e6365698226d52c6d440fdac8cfa724a57dfa748.jpg">
      <InfiniteScroll
        // pageStart={0}
        loadMore={loadMore}
        hasMore={hasMoreCompany}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        // useWindow={false}
      >
        <div className="row p-2 gx-0 justify-content-evenly justify-content-sm-start">
          {companies.map((company) => (
            <CardForCompany
              key={company._id}
              title={company.title}
              link={company.link}
              image={company.image}
              id={company._id}
            />
          ))}
        </div>
      </InfiniteScroll>
    </AdvBlock>
  );
};

export default Companies;
