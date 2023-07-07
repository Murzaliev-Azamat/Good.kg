import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearAllPromotions, selectPromotions } from '../../store/promotionsSlice';
import { NavLink } from 'react-router-dom';
import { deletePromotion, fetchPromotions } from '../../store/promotionsThunks';
import { apiUrl } from '../../constants';

const AdminPromotion = () => {
  const promotions = useAppSelector(selectPromotions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromotions());
  }, [dispatch]);

  const removePromotion = async (id: string) => {
    await dispatch(deletePromotion(id));
    await dispatch(clearAllPromotions());
    await dispatch(fetchPromotions());
  };

  return (
    <div>
      <h2>Promotion</h2>
      <NavLink to={'/add-promotion'} type="button" className="btn btn-primary btn-sm">
        Добавить акцию
      </NavLink>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <h3 style={{ marginRight: '122px', fontSize: '20px' }}>Название акции</h3>
        <h3 style={{ marginRight: '183px', fontSize: '20px' }}>Компания</h3>
        <h3 style={{ marginRight: '187px', fontSize: '20px' }}>Описание</h3>
        <h3 style={{ marginRight: '50px', fontSize: '20px' }}>Картинки</h3>
      </div>
      {promotions.map((promotion) => {
        return (
          <div
            key={promotion._id}
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
            <div style={{ width: '200px' }}>
              <p style={{ margin: '0', wordWrap: 'break-word' }}>{promotion.title}</p>
            </div>
            <div style={{ width: '200px' }}>
              <p style={{ margin: '0', wordWrap: 'break-word' }}>{promotion.company.title}</p>
            </div>
            <div style={{ width: '200px' }}>
              <p style={{ margin: '0', wordWrap: 'break-word' }}>{promotion.description}</p>
            </div>
            <div style={{ width: '100px' }}>
              <img src={apiUrl + '/' + promotion.image} style={{ width: '100px' }} alt="image"></img>
            </div>
            <button onClick={() => removePromotion(promotion._id)} className="btn btn-danger btn-sm">
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AdminPromotion;
