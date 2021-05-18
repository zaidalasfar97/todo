import React, { useContext } from 'react';
import { Toast, Badge, ListGroup } from 'react-bootstrap';
import { PaginationCreate } from './../context/pagination';

const TodoList = (props) => {
    const paginationCreate = useContext(PaginationCreate);

    return (
        <ListGroup>
            {paginationCreate.items
                .slice(paginationCreate.offset, paginationCreate.offset + 3)
                .map((item) => (
                    <Toast
                        className={`complete-${item.complete.toString()}`}
                        key={item._id}
                        onClose={() => {
                            props.handleDelete(item._id, 'delete');
                        }}
                    >
                        <Toast.Header>
                            <Badge
                                pill
                                variant={!item.complete ? 'success' : 'danger'}
                                onClick={() => {
                                    props.handleComplete(item._id, 'put');
                                }}
                            >
                                {!item.complete ? 'Pending' : 'Complete'}
                            </Badge>
                            <strong className="mr-auto" style={{ marginLeft: '20px' }}>
                                {item.assignee}
                            </strong>
                        </Toast.Header>
                        <Toast.Body>
                            {item.text}
                            <div className="difficulty">Difficulty: {item.difficulty}</div>
                        </Toast.Body>
                    </Toast>
                ))}
        </ListGroup>
    );
};

export default TodoList;