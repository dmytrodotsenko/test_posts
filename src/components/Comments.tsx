import * as React from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {NavigationProp, RoutesProp} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import Comment from '../ui/CommentBlock';
import {TextInput} from 'react-native-paper';

interface CommentsScreenProp {
  navigation: NavigationProp<'Comments'>;
  route: RoutesProp<'Comments'>;
}
function CommentsScreen({navigation, route}: CommentsScreenProp): JSX.Element {
  const params = route.params;
  const posts = useSelector((state: RootState) => state.main.posts);
  return (
    <ScrollView>
      <Comment author="John" text="This is a great post!" />
      <Comment author="Alice" text="I totally agree with you." />
      <View style={styles.commentInputContainer}>
        <TextInput
          placeholder="Add a new comment..."
          // value={newComment}
          // onChangeText={setNewComment}
          style={styles.commentInput}
        />
        <Button title="Send" />
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
    marginTop: 10,
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
