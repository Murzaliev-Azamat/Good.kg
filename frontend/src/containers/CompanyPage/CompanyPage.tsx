import React, { useEffect } from 'react';
import AdvBlock from '../../components/UI/AdvBlock/AdvBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePromotion, fetchPromotionsByCompanyId } from '../../store/promotionsThunks';
import { useNavigate, useParams } from 'react-router-dom';
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
    <AdvBlock urlImage="https://www.ts.kg/olol1/eff4e81a43c9b9d4c206faa5533a8ccea9443597.jpg">
      <div>
        {promotions.map((promotion) => (
          <div
            key={promotion._id}
            style={{
              backgroundColor: 'white',
              marginBottom: '10px',
              boxShadow: '1px 1px 4px grey',
              borderRadius: '7px',
              padding: '3px 10px 10px 10px',
              marginLeft: '10px',
              marginRight: '10px',
            }}
          >
            <h2>{promotion.title}</h2>
            <p style={{ wordWrap: 'break-word' }}>{promotion.description}</p>
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
