import React, { useEffect, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from './../hooks/axiosHook';
import {
    Navbar,
    Container,
    Row,
    Col,
    Card,
    Pagination,
    Form,
} from 'react-bootstrap';
import { PaginationContext } from './../context/pagination';
import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = () => {
    const fetching = useAjax(todoAPI);
    const paginationContext = useContext(PaginationContext);

    useEffect(() => {
        document.title = `To Do List: incomplete ${paginationContext.items.filter((item) => item.complete).length
            }`;
    });
    // eslint-disable-next-line
    useEffect(fetching, []);

    return (
        <>
            <Navbar expand="lg" variant="dark" bg="dark"
                style={{ width: '80%', margin: '30px auto', padding: '20px' }}
            >
                <Navbar.Brand>
                    There are (
					{paginationContext.items.filter((item) => item.complete).length})
					Items To Complete
				</Navbar.Brand>
            </Navbar>

            <Form
                style={{
                    margin: '20px auto ', width: '500px', backgroundColor: '#bd2130',
                    padding: '20px 25px',
                }}
            >
                <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                        inline
                        label="completed To Do Item"
                        name="sort"
                        type="radio"
                        id={`inline-radio-1`}
                        onClick={() => {
                            paginationContext.setOffset(0);
                            paginationContext.setItems(
                                paginationContext.list.filter((item) => item.complete === true),
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
                            paginationContext.setOffset(0);
                            let sorted = paginationContext.list.sort(
                                (a, b) => a.difficulty - b.difficulty,
                            );
                            paginationContext.setItems([...sorted]);
                        }}
                    />
                    <Form.Check
                        inline
                        label="pending To Do Item"
                        name="sort"
                        type="radio"
                        id={`inline-radio-3`}
                        onClick={() => {
                            paginationContext.setOffset(0);
                            paginationContext.setItems(
                                paginationContext.list.filter(
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
                                    <TodoForm handleSubmit={fetching} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{ span: 5, offset: 1 }} style={{ height: '350px' }}>
                        <TodoList
                            list={paginationContext.items}
                            handleComplete={fetching}
                            handleDelete={fetching}
                        />
                    </Col>
                </Row>
                <Pagination style={{ margin: 'auto auto', width: '120px' }}>
                    <Pagination.Prev
                        onClick={() => {
                            let count = paginationContext.page;
                            if (count > 1) --count;

                            let arr = [];

                            for (
                                let index = paginationContext.offset;
                                index < paginationContext.itemsNum;
                                index++
                            ) {
                                arr.push(paginationContext.items[index]);
                            }

                            let offset = paginationContext.offset;
                            if (offset >= 3) offset -= 3;
                            if (paginationContext.offset < 3) {
                                paginationContext.setDisable(false);
                                offset = 0;
                            }

                            paginationContext.setOffset(offset);
                            paginationContext.setPage(count);
                        }}
                    />
                    <Pagination.Next
                        onClick={() => {
                            let count = paginationContext.page;
                            let arr = [];
                            if (
                                Math.ceil(
                                    paginationContext.items.length / paginationContext.itemsNum,
                                ) > count
                            ) {
                                ++count;
                            }

                            for (
                                let index = paginationContext.offset;
                                index < paginationContext.itemsNum;
                                index++
                            ) {
                                arr.push(paginationContext.items[index]);
                            }

                            let offset = paginationContext.offset;

                            if (offset < paginationContext.items.length) {
                                offset += 3;
                                paginationContext.setOffset(offset);
                                paginationContext.setPage(count);
                            }

                            if (offset > paginationContext.items.length) {
                                paginationContext.setDisable(true);
                                let rest = offset - paginationContext.items.length;
                                offset = offset - rest - 1;
                                paginationContext.setOffset(offset);
                                paginationContext.setPage(count);
                            }
                        }}
                    />
                </Pagination>
            </Container>
        </>
    );
};

export default ToDo;