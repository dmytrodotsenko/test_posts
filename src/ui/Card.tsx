import React, {useState} from 'react';
import {Button, Card, Text, TextInput} from 'react-native-paper';
import {submitingAlert} from './Alerts';
import {DataItem} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {deletePost} from '../store/MainSlice';
interface PostProps {
  onPress(): void;
  item: DataItem;
}
function Post({onPress, item}: PostProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [titleText, setTitleText] = useState<string>(item.title);
  const [bodyText, setBodyText] = useState(item.body);
  const dispatch = useDispatch();
  // В цій компоненті я не бачу сенсу трігерити фейковий сервер, адже воно нічого не змінить в самих записах на сервері, тому змінив поведінку лише на фронті.
  // Я би міг додати додатково у кожну з операцій виклик fetch, але дійсно не бачу в цьому сенсу))
  const saveChanges = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setIsEditing(false);
  };

  const confirmDelete = () => {
    dispatch(deletePost(item.id));
  };
  return (
    <Card style={{margin: 16}}>
      {!isEditing ? (
        <Card.Content>
          <Text variant="titleLarge">{titleText}</Text>
          <Text variant="bodyMedium">{bodyText}</Text>
        </Card.Content>
      ) : (
        <Card.Content>
          <TextInput
            label="Title"
            value={titleText}
            onChangeText={text => setTitleText(text)}
          />
          <TextInput
            label="Body"
            value={bodyText}
            onChangeText={text => setBodyText(text)}
          />
        </Card.Content>
      )}
      <Card.Actions>
        <Button onPress={saveChanges}>{isEditing ? 'Save' : 'Edit'}</Button>
        <Button
          disabled={isEditing}
          onPress={() =>
            submitingAlert(
              'Delete post',
              'Are you sure to delete this post?',
              confirmDelete,
            )
          }>
          Delete
        </Button>
        <Button disabled={isEditing} onPress={onPress}>
          Comments
        </Button>
      </Card.Actions>
    </Card>
  );
}

export default Post;
