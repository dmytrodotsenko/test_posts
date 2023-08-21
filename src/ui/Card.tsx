import * as React from 'react';
import { Button, Card, Text, TextInput  } from 'react-native-paper';


interface PostProps {
   onPress(): void;
   title: string;
   body: string;
}
function Post({ onPress, body, title}: PostProps): JSX.Element {
    return (
        <Card style={{margin: 16}}>
        <Card.Content>
          <Text variant="titleLarge">{title}</Text>
          <Text variant="bodyMedium">{body}</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button onPress={onPress} >Comments()</Button>
        </Card.Actions>
      </Card>
    );
  }

  export default Post;