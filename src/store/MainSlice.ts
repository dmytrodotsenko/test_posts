import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataItem} from '../types';

export interface MainInitialState {
  posts: DataItem[];
  modalVisible: boolean;
}

const initialState: MainInitialState = {
  posts: [],
  modalVisible: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<DataItem[]>) => {
      state.posts = action.payload;
    },
    showModal: state => {
      state.modalVisible = true;
    },
    hideModal: state => {
      state.modalVisible = false;
    },
    addNewPost: (state, action: PayloadAction<DataItem>) => {
      state.posts = [action.payload, ...state.posts];
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(el => el.id !== action.payload);
    },
  },
});
export const {setPosts, showModal, hideModal, addNewPost, deletePost} =
  mainSlice.actions;
export default mainSlice.reducer;
