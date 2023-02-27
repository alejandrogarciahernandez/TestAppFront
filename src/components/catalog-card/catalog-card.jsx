import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from '../../images/burguer1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

function CustomCard({cardData, onEdit}) {

    const cardStyle =  {
        boxShadow: "1px 3px 1px #9E9E9E",
        // minHeight: "320px",
        // height: "330px"
    }

    const divPrices = {
        float: "right",
        paddingTop: "7px"
    }

    return (
        <Col>
            <Card style={cardStyle}>
                <Card.Header>
                    <Button variant="light" onClick={event => onEdit(cardData)}><FontAwesomeIcon icon={faPencil} /></Button>
                    <Button variant="light"><FontAwesomeIcon icon={faTrash} /></Button>
                    <div style={divPrices}>{cardData.price + " " + cardData.currency}</div>
                </Card.Header>
                <Card.Img variant="top" src={cardData.imgRoute} />
                <Card.Body>
                    <Card.Title className="text-center">{cardData.title}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CustomCard;