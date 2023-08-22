import * as React from 'react';
import {Modal, Portal, Text, Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {addNewPost, hideModal} from '../store/MainSlice';
import {StyleSheet} from 'react-native';
import {TApiResponse, useFetch} from '../hooks/useFetch';
import {BASE_URL} from '../config';
const AddingModal = () => {
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.main.modalVisible);

  //тут емуляція POST запиту на сервер.
  const createPost = async () => {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify({title, body}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    dispatch(addNewPost(json));
    dispatch(hideModal());
  };
  return (
    <Modal
      visible={modal}
      onDismiss={() => dispatch(hideModal())}
      contentContainerStyle={styles.container}>
      <Text>Add new Post</Text>
      <TextInput
        label="Title"
        value={title}
        onChangeText={text => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={body}
        onChangeText={text => setBody(text)}
        style={styles.input}
      />
      <Button onPress={createPost}>Create new post</Button>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    minHeight: 200,
    borderRadius: 8,
  },
  input: {
    width: '90%',
    height: 50,
    marginTop: 15,
  },
});

export default AddingModal;
