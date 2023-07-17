import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearAllCompanies, selectCompanies, selectHasMoreCompany } from '../../store/companiesSlice';
import { NavLink } from 'react-router-dom';
import { deleteCompany, fetchCompanies, fetchCompaniesBySearch } from '../../store/companiesThunks';
import { apiUrl } from '../../constants';
import { selectFetchAllLoading } from '../../store/companiesSlice';
import InfiniteScroll from 'react-infinite-scroller';
import { selectSearch } from '../../store/searchSlice';

const AdminCompany = () => {
  const companies = useAppSelector(selectCompanies);
  const dispatch = useAppDispatch();
  const hasMorePromotion = useAppSelector(selectHasMoreCompany);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);
  const search = useAppSelector(selectSearch);

  const loadMore = async () => {
    if (fetchAllLoading) {
      return;
    } else if (search !== '') {
      await dispatch(fetchCompaniesBySearch({ search: search }));
    } else {
      await dispatch(fetchCompanies());
    }
  };

  const removeCompany = async (id: string) => {
    await dispatch(deleteCompany(id));
    await dispatch(clearAllCompanies());
    await dispatch(fetchCompanies());
  };

  return (
    <div>
      <h2>Company</h2>
      <NavLink to={'/add-company'} type="button" className="btn btn-primary btn-sm">
        Добавить компанию
      </NavLink>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <h3 style={{ marginRight: '13px', fontSize: '20px' }}>Название компании</h3>
        <h3 style={{ marginRight: '130px', fontSize: '20px' }}>Описание</h3>
        <h3 style={{ marginRight: '46px', fontSize: '20px' }}>Категории</h3>
        <h3 style={{ marginRight: '83px', fontSize: '20px' }}>Акции</h3>
        <h3 style={{ marginRight: '30px', fontSize: '20px' }}>Картинки</h3>
        <h3 style={{ fontSize: '20px' }}>Ссылка</h3>
      </div>
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
        {companies.map((company) => {
          return (
            <div
              key={company._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px',
                marginTop: '5px',
                borderBottom: '1px solid grey',
                borderTop: '1px solid grey',
                paddingTop: '5px',
                paddingBottom: '5px',
              }}
            >
              <div style={{ width: '180px' }}>
                <p style={{ margin: '0', wordWrap: 'break-word' }}>{company.title}</p>
              </div>
              <div style={{ width: '200px' }}>
                <p style={{ margin: '0', wordWrap: 'break-word' }}>{company.description}</p>
              </div>
              <div style={{ width: '120px', overflow: 'hidden' }}>
                {company.categories.map((companyCategory) => {
                  return (
                    <p style={{ margin: '0' }} key={companyCategory._id}>
                      {companyCategory.title}
                    </p>
                  );
                })}
              </div>
              <div style={{ width: '120px', overflow: 'hidden' }}>
                <NavLink
                  to={'/company-page/' + company._id}
                  className="btn btn-primary btn-sm"
                  style={{ marginBottom: '5px' }}
                >
                  Подробнее
                </NavLink>
              </div>
              <div style={{ width: '100px', overflow: 'hidden' }}>
                <img src={apiUrl + '/' + company.image} style={{ width: '100px' }} alt="image"></img>
              </div>
              <div style={{ width: '100px', overflow: 'hidden' }}>
                <a href={company.link}>На сайт</a>
              </div>
              <div>
                <NavLink
                  type="button"
                  className="btn btn-warning btn-sm"
                  to={'/edit-company/' + company._id}
                  style={{ marginRight: '10px' }}
                  color="info"
                >
                  Edit
                </NavLink>
                <button onClick={() => removeCompany(company._id)} className="btn btn-danger btn-sm">
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default AdminCompany;
