import * as React from 'react';
import { View, Text, FlatList, StyleSheet  } from 'react-native';
import { NavigationProp, RoutesProp } from '../types';
import { Button } from 'react-native-paper';
import Post from '../ui/Card';

interface DataItem {
  id: number;
  title: string;
  body: string;
}

const data = [
  { id: 1, title: 'Card 1', body: 'Description for Card 1' },
  { id: 2, title: 'Card 2', body: 'Description for Card 2' },
  { id: 3, title: 'Card 3', body: 'Description for Card 3' },
  { id: 4, title: 'Card 4', body: 'Description for Card 4' },
  // Add more data items as needed
];
interface PostsScreenProp {
    navigation: NavigationProp<'Posts'>;
    route: RoutesProp<'Posts'>;
}
function PostsScreen({navigation, route}: PostsScreenProp): JSX.Element {

  const renderItem = ({item} : {item: DataItem}) => {
    return <Post onPress={() => navigation.navigate('Comments', {id: item.id})} body={item.body} title={item.title}></Post>
  }
    return (
      <>
    <Button style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
          Add new Post
    </Button>
      <View style={styles.container}>
        <FlatList data={data} renderItem={renderItem}/>
      </View>
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
    }
  });
  export default PostsScreen;