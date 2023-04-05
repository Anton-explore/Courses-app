import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorType } from '../../types';

const initialState: AuthorType[] = [];

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		getAuthors: (
			state: AuthorType[],
			{ payload }: PayloadAction<AuthorType[]>
		) => {
			state = [...payload];
		},
		addAuthor: (
			state: AuthorType[],
			{ payload }: PayloadAction<AuthorType>
		) => {
			state = [payload, ...state];
		},

		deleteAuthor: (state: AuthorType[], { payload }: PayloadAction<string>) => {
			state = state.filter((author) => author.id !== payload);
		},
	},
});

export const { getAuthors, addAuthor, deleteAuthor } = authorsSlice.actions;
export const authorsReducer = authorsSlice.reducer;
