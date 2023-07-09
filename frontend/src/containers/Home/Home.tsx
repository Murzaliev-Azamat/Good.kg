import React from 'react';
import Promotions from '../Promotions/Promotions';
import AdvBlock from '../../components/UI/AdvBlock/AdvBlock';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlise';

const Home = () => {
  const user = useAppSelector(selectUser);
  return (
    <AdvBlock urlImage="https://www.ts.kg/olol1/503aa7fbe57361e3f426bbc39de7180e7ee256f3.jpg">
      {user && user.role === 'admin' && (
        <NavLink to={'/admin'} type="button" className="btn btn-primary btn-sm">
          Админка
        </NavLink>
      )}
      <Promotions />
    </AdvBlock>
  );
};

export default Home;
