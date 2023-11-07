import React from 'react';
import AdvBlock from '../../components/UI/AdvBlock/AdvBlock';
import { useMediaQuery, useTheme } from '@mui/material';

const Contacts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const urlImage = isMobile
    ? '/mobile_banner.png'
    : 'https://www.ts.kg/olol1/eff4e81a43c9b9d4c206faa5533a8ccea9443597.jpg';

  return (
    <AdvBlock urlImage={urlImage}>
      <div
        style={{
          backgroundColor: 'white',
          marginBottom: '10px',
          boxShadow: '1px 1px 4px grey',
          borderRadius: '7px',
          padding: '16px',
          marginLeft: '10px',
          marginRight: '10px',
        }}
      >
        <h1>Контакты</h1>
        <p>Tel: +996556720128 (WhatsApp)</p>
        <p>Email: lirog.kg@gmail.com</p>
        <p>Кыргызстан г. Бишкек</p>
      </div>
    </AdvBlock>
  );
};

export default Contacts;
