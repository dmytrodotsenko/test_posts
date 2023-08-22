import * as React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {DataItem, NavigationProp, RoutesProp} from '../types';
import {Button} from 'react-native-paper';
import Post from '../ui/Card';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {TApiResponse, useFetch} from '../hooks/useFetch';
import {BASE_URL} from '../config';
import {setPosts, showModal} from '../store/MainSlice';
import AddingModal from '../ui/AddingModal';

interface PostsScreenProp {
  navigation: NavigationProp<'Posts'>;
  route: RoutesProp<'Posts'>;
}
function PostsScreen({navigation, route}: PostsScreenProp): JSX.Element {
  const dispatch = useDispatch();
  const response: TApiResponse = useFetch(`${BASE_URL}/posts`, 'GET');
  const posts = useSelector((state: RootState) => state.main.posts);
  const modal = useSelector((state: RootState) => state.main.modalVisible);

  React.useEffect(() => {
    if (!response.loading) {
      dispatch(setPosts(response.data));
    }
  }, [dispatch, response.data, response.loading]);

  const renderItem = ({item}: {item: DataItem}) => {
    return (
      <Post
        onPress={() => navigation.navigate('Comments', {id: item.id})}
        item={item}></Post>
    );
  };

  return (
    <>
      <Button
        style={styles.btn}
        mode="contained"
        onPress={() => dispatch(showModal())}>
        Add new Post
      </Button>
      <View style={styles.container}>
        <FlatList data={posts} renderItem={renderItem} />
      </View>
      {modal && <AddingModal />}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  btn: {
    margin: 16,
  },
});
export default PostsScreen;
