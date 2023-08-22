import {Alert} from 'react-native';
export const submitingAlert = (
  title: string,
  msg: string,
  onSubmit: () => void,
) =>
  Alert.alert(title, msg, [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {text: 'OK', onPress: onSubmit},
  ]);
