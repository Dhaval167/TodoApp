import React, {useState} from 'react';
import {Button, Input, Center, Modal} from 'native-base';
import {useDispatch} from 'react-redux';
import {todoActions} from '../Store/Actions/TodoActions';

const AddModel = props => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [todoValue, setTodoValue] = useState('');

  const dispatch = useDispatch();

  const onChangeTextHandler = text => {
    setTodoValue(text);
  };

  const onSaveButtonHandler = () => {
    var todoList = {
      title: todoValue,
      isCompleted: false,
    };
    dispatch(todoActions(todoList));
    props.onClose();
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Want to Add some notes?</Modal.Header>
          <Modal.Body>
            Add some notes title here:
            <Input
              mt={4}
              ref={initialRef}
              placeholder="Todo"
              onChangeText={onChangeTextHandler}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button onPress={onSaveButtonHandler}>SAVE</Button>
              <Button onPress={props.onCloseButton} colorScheme="secondary">
                CLOSE
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AddModel;
