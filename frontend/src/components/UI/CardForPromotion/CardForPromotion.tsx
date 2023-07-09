import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';
import { apiUrl } from '../../../constants';

const CustomAccordion = styled(Accordion)`
  --bs-accordion-active-bg: green;
  --bs-accordion-active-color: #fff;
  --bs-accordion-border-radius: 0;
  --bs-accordion-inner-border-radius: 0;
  --bs-accordion-btn-icon: none;
  --bs-accordion-btn-active-icon: none;
  --bs-accordion-btn-focus-box-shadow: none;
  --bs-accordion-btn-padding-y: 10px;
  //--bs-accordion-btn-focus-border-color: red;
  //--bs-accordion-btn-icon: url();
  //margin-top: auto;
  //&:active {
  //  background-color: red;
  //}
  //background-color: green;
  //--bs-accordion-bg: blue;
  //--bs-accordion-btn-bg: blue;
  //--bs-accordion-btn-color: white;
  //--bs-accordion-active-color: white;
  //margin-top: 10px;
`;

const CustomAccordionHeader = styled(Accordion.Header)`
  //background-color: green;
  //--bs-accordion-bg: blue;
  //--bs-accordion-btn-bg: blue;
  //--bs-accordion-active-bg: red ;
  //--bs-accordion-btn-color: white;
  //--bs-accordion-active-color: whitel;
  margin-top: 0;
`;

interface Props {
  id: string;
  title: string;
  description: string;
  company_name: string;
  promotion_image: string | null;
}

const CardForPromotion: React.FC<Props> = ({ id, title, description, company_name, promotion_image }) => {
  let cardImage =
    'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=';
  let infoImage = (
    <img src={cardImage} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt="image" />
  );

  if (promotion_image) {
    cardImage = apiUrl + '/' + promotion_image;
    infoImage = (
      <img src={cardImage} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt="image" />
    );
  }

  return (
    <div className="card col col-2 p-0 mb-2 me-1 ms-1" style={{ width: '17.95rem' }}>
      {infoImage}
      <div className="card-body d-flex flex-column justify-content-between">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px', marginLeft: '4px' }}>
            <svg className="icon" style={{ marginRight: '5px' }}>
              <use xlinkHref="sprite.svg#icon-heart-fill"></use>
            </svg>
            <span style={{ display: 'block', color: 'grey', fontSize: '15px', lineHeight: '1' }}>88</span>
          </div>
          <div style={{ display: 'flex' }}>
            <svg className="icon">
              <use xlinkHref="sprite.svg#icon-more"></use>
            </svg>
          </div>
        </div>
        <h5 className="card-title text-center">{title}</h5>
        {/*<p className="card-text">{description}</p>*/}
        <div>
          <a href="#" className="btn btn-primary mb-2 w-100 rounded-0">
            {company_name}
          </a>
          <CustomAccordion>
            <Accordion.Item eventKey="0">
              <CustomAccordionHeader>Подробнее</CustomAccordionHeader>
              <Accordion.Body>{description}</Accordion.Body>
            </Accordion.Item>
          </CustomAccordion>
        </div>
      </div>
    </div>
  );
};

export default CardForPromotion;
