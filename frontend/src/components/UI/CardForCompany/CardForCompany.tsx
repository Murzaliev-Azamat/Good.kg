import React from 'react';
import { apiUrl } from '../../../constants';

// const CustomAccordionHeader = styled(Accordion.Header)`
//   background-color: green;
//   //--bs-accordion-bg: blue;
//   //--bs-accordion-btn-bg: blue;
//   //--bs-accordion-active-bg: red ;
//   //--bs-accordion-btn-color: white;
//   //--bs-accordion-active-color: whitel;
//   margin-top: 10px;
// `;

interface Props {
  id: number;
  title: string;
  link: string;
  image: string | null;
}

const CardForCompany: React.FC<Props> = ({ id, title, link, image }) => {
  let cardImage =
    'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=';
  let infoImage = (
    <img src={cardImage} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt="image" />
  );

  if (image) {
    cardImage = apiUrl + '/uploads/images/' + image;
    infoImage = (
      <img src={cardImage} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt="image" />
    );
  }

  return (
    <div className="card text-center col col-2 p-0 mb-2 me-1 ms-1" style={{ width: '17.95rem' }}>
      {infoImage}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <a href={link} target="_blank" className="btn btn-primary" rel="noreferrer">
          Страница компании
        </a>
      </div>
    </div>
  );
};

export default CardForCompany;
