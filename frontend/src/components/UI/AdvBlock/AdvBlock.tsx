import React from 'react';
import { styled } from '@mui/material/styles';

interface Props extends React.PropsWithChildren {
  urlImage: string;
}

const AdvBlock: React.FC<Props> = ({ urlImage, children }) => {
  const MyBlock = styled('div')({
    height: '100%',
    backgroundImage: 'url(' + urlImage + ')',
    // backgroundPosition: "center",
    backgroundPosition: '50% 63px',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    paddingTop: 230,
  });

  return (
    <MyBlock>
      <div style={{ maxWidth: '1200px', margin: '0 auto', overflow: 'hidden', minHeight: '100vh' }}>{children}</div>
    </MyBlock>
  );
};

export default AdvBlock;
