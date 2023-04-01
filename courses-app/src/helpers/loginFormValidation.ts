import { LoginValues } from '../types';

export const validateLogin = (values: LoginValues) => {
	const errors: Partial<LoginValues> = {};
	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = 'Email is invalid';
	}
	if (!values.password) {
		errors.password = 'Password is required';
	}

	return errors;
};

export const validatePassword = (values: LoginValues) => {
	const errors: Partial<LoginValues> = {};
	if (!values.name) {
		errors.name = 'Name is required';
	} else if (values.name.length < 2) {
		errors.name = 'Too short name';
	}
	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = 'Email is invalid';
	}
	if (!values.password) {
		errors.password = 'Password is required';
	}

	return errors;
};
