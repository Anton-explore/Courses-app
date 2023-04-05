import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenResponse, UserType } from '../../types';

const initialState: UserType = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	// error: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUser: (state: UserType, { payload }: PayloadAction<TokenResponse>) => {
			state.isAuth = payload.successful;
			state.token = payload.result;
			state.name = payload.user.name === 'null' ? 'Admin' : payload.user.name;
			state.email = payload.user.email;
			localStorage.setItem('token', payload.result);
			localStorage.setItem('userName', payload.user.name);
			localStorage.setItem('email', payload.user.email);
		},
		logoutUser: (state: UserType) => {
			state.isAuth = false;
			state.token = '';
			state.name = '';
			state.email = '';
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
