import React from 'react';
import Promotions from '../Promotions/Promotions';
import AdvBlock from '../../components/UI/AdvBlock/AdvBlock';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlise';

const Home = () => {
  const user = useAppSelector(selectUser);
  return (
    <AdvBlock urlImage="https://www.ts.kg/olol1/2a25d56d3a6dc096b1a4fd06b392bc4db70149f2.jpg">
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
