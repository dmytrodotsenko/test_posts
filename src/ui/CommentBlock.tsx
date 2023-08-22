import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {submitingAlert} from './Alerts';

interface CommentProps {
  author: string;
  text: string;
  deleteComment: () => void;
}

const Comment: React.FC<CommentProps> = ({author, text, deleteComment}) => {
  const [commentText, setCommentText] = useState(text);
  const [edit, setEdit] = useState(false);
  const editComment = () => {
    if (!edit) {
      setEdit(true);
      return;
    }
    setEdit(false);
  };
  const cancelEdit = () => {
    setCommentText(text);
    setEdit(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.author}>{author}</Text>
      {edit ? (
        <TextInput
          label="Text"
          value={commentText}
          onChangeText={text => setCommentText(text)}></TextInput>
      ) : (
        <Text style={styles.text}>{commentText}</Text>
      )}
      <View style={styles.buttons}>
        <Button onPress={editComment}>{edit ? 'Save' : 'Edit'}</Button>
        <Button
          onPress={
            !edit
              ? () =>
                  submitingAlert(
                    'Delete comment',
                    'Are you sure to delete this comment?',
                    deleteComment,
                  )
              : cancelEdit
          }
          textColor="red">
          {edit ? 'Cancel' : 'Delete'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Comment;
