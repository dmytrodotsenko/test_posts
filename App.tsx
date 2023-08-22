/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFetch, TApiResponse } from './src/hooks/useFetch';
import PostsScreen from './src/components/Posts';
import CommentsScreen from './src/components/Comments';
import { RootStackParamList } from './src/types';
import { BASE_URL } from './src/config';

import { store } from './src/store';
import { useDispatch, useSelector, Provider } from "react-redux";
import { setPosts } from './src/store/MainSlice';

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): JSX.Element {
  return (
  <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Posts" component={PostsScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
}



export default App;
