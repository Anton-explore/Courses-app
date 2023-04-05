import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenResponse, UserType } from '../../types';

const initialState: { user: UserType } = {
	user: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
		// error: null,
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUser: (
			state: { user: UserType },
			{ payload }: PayloadAction<TokenResponse>
		) => {
			state.user = {
				isAuth: payload.successful,
				token: payload.result,
				name: payload.user.name,
				email: payload.user.email,
			};
			localStorage.setItem('token', payload.result);
			localStorage.setItem('userName', payload.user.name);
		},
		logoutUser: (state: { user: UserType }) => {
			state.user.isAuth = false;
			state.user.token = '';
			state.user.name = '';
			state.user.email = '';
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
