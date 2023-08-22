import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    Posts: {},
    Comments: {id: number},
}

export interface DataItem {
    body: string;
    id: number;
    title: string;
   
  }
export type NavigationProp<T extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, T>;
export type RoutesProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;