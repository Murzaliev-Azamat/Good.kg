import React, { useEffect } from 'react';
import AdvBlock from '../../components/UI/AdvBlock/AdvBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePromotion, fetchPromotionsByCompanyId } from '../../store/promotionsThunks';
import { useParams } from 'react-router-dom';
import { selectPromotions } from '../../store/promotionsSlice';
import { selectUser } from '../users/usersSlise';

const CompanyPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const promotions = useAppSelector(selectPromotions);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchPromotionsByCompanyId(params.id));
    }
  }, [dispatch, params.id]);

  const removePromotion = async (id: string) => {
    await dispatch(deletePromotion(id));
    if (params.id) {
      await dispatch(fetchPromotionsByCompanyId(params.id));
    }
  };
  return (
    <AdvBlock urlImage="https://www.ts.kg/olol1/11f38a1745ae9dca634396d8373980303a9dbd56.jpg">
      <div>
        {promotions.map((promotion) => (
          <div key={promotion._id} style={{ borderBottom: '1px solid black', paddingBottom: '10px' }}>
            <h2>{promotion.title}</h2>
            <p>{promotion.description}</p>
            {user && user.role === 'admin' && (
              <button onClick={() => removePromotion(promotion._id)} className="btn btn-danger btn-sm">
                delete
              </button>
            )}
          </div>
        ))}
      </div>
    </AdvBlock>
  );
};

export default CompanyPage;
