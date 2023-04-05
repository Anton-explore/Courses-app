import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorsState, AuthorType } from '../../types';

const initialState: AuthorsState = { authors: [] };

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		getAuthors: (
			state: AuthorsState,
			{ payload }: PayloadAction<AuthorType[]>
		) => {
			state.authors = [...payload];
		},
		addAuthor: (
			state: AuthorsState,
			{ payload }: PayloadAction<AuthorType[]>
		) => {
			state.authors = [...payload, ...state.authors];
		},

		deleteAuthor: (state: AuthorsState, { payload }: PayloadAction<string>) => {
			state.authors = state.authors.filter((author) => author.id !== payload);
		},
	},
});

export const { getAuthors, addAuthor, deleteAuthor } = authorsSlice.actions;
export const authorsReducer = authorsSlice.reducer;
