import { Button, Form } from 'react-bootstrap';
import useForm from './../hooks/formHook';


const TodoForm = (props) => {
    // eslint-disable-next-line
    const [item, handleInputChange, handleSubmit] = useForm(props);

    return (
        <>
            <h3>Add Item</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        <Form.Text>To Do Item</Form.Text>
                        <Form.Control
                            type="text"
                            name="text"
                            placeholder="Add To Do List Item"
                            onChange={handleInputChange}
                        />
                    </Form.Label>
                    <Form.Label>
                        <Form.Text>Difficulty Rating</Form.Text>
                        <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
                    </Form.Label>
                    <Form.Label>
                        <Form.Text>Assigned To</Form.Text>
                        <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
                    </Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Item
				</Button>
            </Form>
        </>
    );
};

export default TodoForm;