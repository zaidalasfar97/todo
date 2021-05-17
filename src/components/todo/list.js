import React from 'react';
import { ListGroup, Toast, Badge } from 'react-bootstrap';

const TodoList = (props) => {

    return (

        <ListGroup >
            {props.list.map(item => (
                <Toast
                    className={`complete-${item.complete.toString()}`}
                    key={item._id}
                    onClose={() => props.handleDelete(item._id)}
                >
                    <Toast.Header>
                        <Badge pill variant={item.complete ? "danger" : "success"}>{item.complete ? "Complete" : "Pending..."}</Badge>{" "}
                        <strong className="mr-auto" style={{ marginLeft: '20px' }}>{item.assignee}</strong>
                    </Toast.Header>
                    <Toast.Body onClick={() => props.handleComplete(item._id)}>
                        {item.text}
                        <div class="difficultly">difficulty:{item.difficulty}</div>
                    </Toast.Body>
                </Toast>
            ))}
        </ListGroup>
    );
}

export default TodoList;