import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationProp, RoutesProp } from '../types';

interface CommentsScreenProp {
    navigation: NavigationProp<'Comments'>;
    route: RoutesProp<'Comments'>;
}
function CommentsScreen({navigation, route}: CommentsScreenProp): JSX.Element {
    const params = route.params;
    console.log(params.id);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Comments for {params.id}</Text>
      </View>
    );
  }
  export default CommentsScreen;