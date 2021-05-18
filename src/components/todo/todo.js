import React, { useEffect, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from './../hooks/axiosHook';
import { Navbar, Container, Row, Col, Card, Pagination, Form } from 'react-bootstrap';
import { PaginationCreate } from './../context/pagination';
import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = () => {
    const fetchingData = useAjax(todoAPI);
    const paginationCreate = useContext(PaginationCreate);

    useEffect(() => {
        document.title = `To Do List: incomplete ${paginationCreate.items.filter((item) => item.complete).length
            }`;
    });

    useEffect(fetchingData, []);

    return (
        <>
            <Navbar
                expand="lg"
                variant="dark"
                bg="dark"
                style={{ width: '80%', margin: '40px auto 20px', padding: '20px' }}
            >
                <Navbar.Brand>
                    There are (
					{paginationCreate.items.filter((item) => item.complete).length})
					Items To Complete
				</Navbar.Brand>
            </Navbar>

            <Form
                style={{ margin: '50px auto 0', width: '500px', backgroundColor: '#b00a1a', padding: '20px 20px 5px 20px', }}
            >
                <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                        inline
                        label="completed To Do Item"
                        name="sort"
                        type="radio"
                        id={`inline-radio-1`}
                        onClick={() => {
                            paginationCreate.setOffset(0);
                            paginationCreate.setItems(
                                paginationCreate.list.filter((item) => item.complete === true),
                            );
                        }}
                    />
                    <Form.Check
                        inline
                        label="difficulty"
                        name="sort"
                        type="radio"
                        id={`inline-radio-2`}
                        onClick={() => {
                            paginationCreate.setOffset(0);
                            let sorted = paginationCreate.list.sort(
                                (a, b) => a.difficulty - b.difficulty,
                            );
                            paginationCreate.setItems([...sorted]);
                        }}
                    />
                    <Form.Check
                        inline
                        label="pending To Do Item"
                        name="sort"
                        type="radio"
                        id={`inline-radio-3`}
                        onClick={() => {
                            paginationCreate.setOffset(0);
                            paginationCreate.setItems(
                                paginationCreate.list.filter(
                                    (item) => item.complete === false,
                                ),
                            );
                        }}
                    />
                </div>
            </Form>

            <Container fluid="md" style={{ marginTop: '5rem' }}>
                <Row className="justify-content-md-center">
                    <Col sm={4} style={{ height: '350px' }}>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <TodoForm handleSubmit={fetchingData} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{ span: 5, offset: 1 }} style={{ height: '350px' }}>
                        <TodoList
                            list={paginationCreate.items}
                            handleComplete={fetchingData}
                            handleDelete={fetchingData}
                        />
                    </Col>
                </Row>
                <Pagination style={{ margin: '1rem auto 0', width: '120px' }}>
                    <Pagination.Prev
                        disabled={!paginationCreate.disable}
                        onClick={() => {
                            let count = paginationCreate.page;
                            if (count > 1) --count;

                            let arr = [];

                            for (
                                let index = paginationCreate.offset;
                                index < paginationCreate.itemsNum;
                                index++
                            ) {
                                arr.push(paginationCreate.items[index]);
                            }

                            let offset = paginationCreate.offset;
                            if (offset >= 3) offset -= 3;
                            if (paginationCreate.offset < 3) {
                                paginationCreate.setDisable(false);
                                offset = 0;
                            }

                            paginationCreate.setOffset(offset);
                            paginationCreate.setPage(count);
                        }}
                    />
                    <Pagination.Next
                        disabled={paginationCreate.disable}
                        onClick={() => {
                            let count = paginationCreate.page;
                            let arr = [];
                            if (
                                Math.ceil(
                                    paginationCreate.items.length / paginationCreate.itemsNum,
                                ) > count
                            ) {
                                ++count;
                            }

                            for (
                                let index = paginationCreate.offset;
                                index < paginationCreate.itemsNum;
                                index++
                            ) {
                                arr.push(paginationCreate.items[index]);
                            }

                            let offset = paginationCreate.offset;

                            if (offset < paginationCreate.items.length) {
                                offset += 3;
                                paginationCreate.setOffset(offset);
                                paginationCreate.setPage(count);
                            }

                            if (offset > paginationCreate.items.length) {
                                paginationCreate.setDisable(true);
                                let rest = offset - paginationCreate.items.length;
                                offset = offset - rest - 1;
                                paginationCreate.setOffset(offset);
                                paginationCreate.setPage(count);
                            }
                        }}
                    />
                </Pagination>
            </Container>
        </>
    );
};

export default ToDo;