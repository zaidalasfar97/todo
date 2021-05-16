import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { Navbar } from 'react-bootstrap';
import { Container, Col, Row, Card } from 'react-bootstrap';

import './todo.scss';

const ToDo = (props) => {

    const [list, setList] = useState([])

    const addItem = (item) => {
        item._id = Math.random();
        item.complete = false;

        setList([...list, item]);
    };

    const toggleComplete = (id) => {

        let item = list.filter(i => i._id === id)[0] || {};

        if (item._id) {
            item.complete = !item.complete;
            let listDetails = list.map(listItem => listItem._id === item._id ? item : listItem);
            setList(listDetails);
        }
    };

    useEffect(() => {
        let lists = [
            { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
            { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
            { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
            { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
            { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
        ];

        setList(lists);
    }, [])

    useEffect(() => {
        document.title = `To Do List : incomplete ${list.filter(item => !item.complete).length} / complete ${list.filter(item => item.complete).length} `;
    })

    return (
        <>
            <header>
                <Navbar className="CountBar" bg="dark" variant="dark" style={{ marginTop: '40px', width: '80%', marginLeft: '10%' }} >
                    <Navbar.Brand>
                        To Do List Manger {list.filter(item => !item.complete).length}
                    </Navbar.Brand>
                </Navbar >
            </header>

            <Container fluid='md' style={{ marginTop: '30px' }}>
                <Row className='justify-content-md-center'>
                    <Card style={{ width: '400px' }}>
                        <Card.Body>
                            <Card.Text>
                                <Col><TodoForm handleSubmit={addItem} /></Col>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Col sm={4} md={{ span: 4, offset: 1 }}> <TodoList
                        list={list}
                        handleComplete={toggleComplete} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ToDo;