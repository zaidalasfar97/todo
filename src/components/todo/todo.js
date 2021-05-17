import React, { useEffect } from 'react';
import TodoForm from './form';
import TodoList from './list.js';
import Ajax from './../hooks/axiosHook';
import { Navbar, Container, Row, Col, Card } from 'react-bootstrap';

import './todo.scss';

const ToDo = () => {
    const [list, _addItem, _toggleComplete, _getTodoItems, _deleteTask] =
        Ajax();

    useEffect(() => {
        document.title = `To Do List: incomplete ${list.filter((item) => item.complete).length
            } `;
    });

    useEffect(_getTodoItems, [_getTodoItems]);

    return (
        <>
            <Navbar
                expand="lg"
                variant="dark"
                bg="dark"
                style={{ width: '80%', margin: '1rem auto 0', paddingLeft: '1rem' }}
            >
                <Navbar.Brand>
                    There are ({list.filter((item) => item.complete).length}) Items To
					Complete
				</Navbar.Brand>
            </Navbar>

            <Container fluid="md" style={{ marginTop: '5rem' }}>
                <Row className="justify-content-md-center">
                    <Col sm={4}>
                        <Card style={{ width: '80%', margin: '5px' }}>
                            <Card.Body>
                                <Card.Text>
                                    <TodoForm handleSubmit={_addItem} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{ span: 5, offset: 1 }}>
                        <TodoList
                            list={list}
                            handleComplete={_toggleComplete}
                            handleDelete={_deleteTask}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ToDo;