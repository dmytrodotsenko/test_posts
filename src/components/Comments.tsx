import * as React from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {NavigationProp, RoutesProp} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import Comment from '../ui/CommentBlock';
import {TextInput} from 'react-native-paper';
import {TApiResponse, useFetch} from '../hooks/useFetch';
import {BASE_URL} from '../config';

interface CommentsScreenProp {
  navigation: NavigationProp<'Comments'>;
  route: RoutesProp<'Comments'>;
}
interface CommentData {
  id: number;
  postId: number;
  text: string;
}
function CommentsScreen({navigation, route}: CommentsScreenProp): JSX.Element {
  const [comments, setComments] = React.useState<CommentData[]>([]);
  const [commentText, setCommentText] = React.useState<string>('');
  const params = route.params;
  const postID = params.id;
  const posts = useSelector((state: RootState) => state.main.posts);
  const response: TApiResponse = useFetch(
    `${BASE_URL}/comments?postId=${postID}`,
    'GET',
  );
  React.useEffect(() => {
    if (!response.loading) {
      setComments(response.data);
    }
  }, [response.data, response.loading]);
  // Знову ж таки додавання нового коментаря працює лиге на фронті і статично на цьому скріні.
  const createNewComment = () => {
    fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postID: postID,
        text: commentText,
      }),
    })
      .then(response => response.json())
      .then(newComment => {
        setComments([...comments, newComment]);
        setCommentText('');
      });
  };
  const deleteComment = (id: number) => {
    const deleted = comments.filter(el => el.id !== id);
    setComments(deleted);
  };

  return (
    <ScrollView>
      {comments?.map((el: CommentData, id: number) => (
        <Comment
          deleteComment={() => deleteComment(el.id)}
          key={id}
          author={'' + el.id}
          text={el.text}
        />
      ))}
      <View style={styles.commentInputContainer}>
        <TextInput
          placeholder="Add a new comment..."
          value={commentText}
          onChangeText={text => setCommentText(text)}
          style={styles.commentInput}
        />
        <Button title="Send" onPress={createNewComment} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    margin: 12,
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
export default CommentsScreen;
