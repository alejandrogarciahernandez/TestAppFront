import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';

function EditModal({ show, selectedEditCard, onClose, reloadItems }) {

    // Clone original card
    const originalCard = {...selectedEditCard};

    const styles = {
        height: "200px",
        maxHeight: "200px",
        minHeight: "200px"
    };

    const [card, setCard] = useState(
        { id: "", currency: "", price: "", imgRoute: "", title: "", description: "", categoryId: 0 }
    );
    useEffect(() => { setCard(selectedEditCard) }, [selectedEditCard])


    const { data, isLoading } = useCategories();
    const [errors, setErrors] = useState({})


    const validate = () => {
        const { price } = card;
        const errors = {};

        if (!price.match(/^[1-9]\d*(\.\d+)?$/)) errors.price = 'Solo se permiten números.';
        return errors;
    }

    const updateItem = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(card)
        };
        return fetch(process.env.REACT_APP_BACKEND_HOST + `/item/${card.id}`, requestOptions)
            .then(response => response.json());
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        // get our new errors
        const newErrors = validate();
        console.log(newErrors);
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            updateItem()
                .then(item => {
                    console.log("Item updated. ");
                    onClose();
                    reloadItems();
                })
                .catch(error => {
                    console.error(error);
                })
        }
        console.log(card)
    };

    const cancelChangesAndClose = () => {
        setCard(originalCard);
        onClose();
    }

    return (
        <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Form>
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                <Form.Group className="mb-3" controlId="id">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control value={card.id} type="text" disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="fromCardId">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control value={card.title} type="text" onChange={(e) => setCard({ ...card, title: e.target.value })} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="fromCardId">
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control style={styles} as="textarea" value={card.description} type="text" onChange={(e) => setCard({ ...card, description: e.target.value })} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="fromCardId">
                                    <Form.Label>Divisa</Form.Label>
                                    <Form.Control value={card.currency} type="text" onChange={(e) => setCard({ ...card, currency: e.target.value })} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="fromCardId">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control isInvalid={ !!errors.price } value={card.price} type="text" onChange={(e) => setCard({ ...card, price: e.target.value })} />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select value={card.categoryId} onChange={(e) => { setCard({ ...card, categoryId: e.target.value }); console.log(e.target.value) }} aria-label="Default select example">
                                    {data?.map((value) => {
                                        return <option key={value.categoryId} value={value.categoryId}>{value.categoryName}</option>;
                                    })}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={cancelChangesAndClose}>Close</Button>
                <Button onClick={handleSubmit} type="submit">Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
}

EditModal.defaultProps = {
    selectedEditCard: { id: "", currency: "", price: "", imgRoute: "", title: "", description: "", category: "", categoryId: "" }
}

export default EditModal;