import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import mockDataCards from '../../utils/mockData';
import CustomCard from '../catalog-card/catalog-card';

function CustomCardGroup({data, onEdit}) {
    return (
        <Row xs={1} md={4} className="g-4">
            {data.map((cardData) => {
                return <CustomCard onEdit={onEdit} key={cardData.id} cardData={cardData}/>
            })}
        </Row>
    );
}

CustomCardGroup.defaultProps = {
    data: mockDataCards
  }

export default CustomCardGroup;