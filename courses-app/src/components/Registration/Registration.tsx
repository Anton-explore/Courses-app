import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';

import { LoginValues } from '../../types';
import { BUTTONS_TEXT, INPUTS_TEXT } from '../../constants';
import { UserAPI } from '../../helpers/api';
import { validatePassword } from '../../helpers/loginFormValidation';

import { StyledForm } from '../Login/Login.style';

const Registration: React.FC = () => {
	const navigate = useNavigate();

	const initialValues: LoginValues = {
		name: '',
		email: '',
		password: '',
	};

	const onSubmit = async (formData: LoginValues) => {
		try {
			const response = await UserAPI.register(formData);
			if (response.successful) {
				navigate('/login');
			}
			return response;
		} catch (error: any) {
			console.log(error.message);
			return error.message;
		}
	};

	const validate = validatePassword;

	const formik = useFormik({
		initialValues,
		validate,
		onSubmit,
	});

	return (
		<StyledForm onSubmit={formik.handleSubmit}>
			<h2>Registration</h2>
			<Input
				label={INPUTS_TEXT.NAME}
				name='name'
				value={formik.values.name}
				onChange={formik.handleChange}
			/>
			{formik.touched.name && formik.errors.name ? (
				<div>{formik.errors.name}</div>
			) : null}
			<Input
				label={INPUTS_TEXT.EML}
				name='email'
				type={INPUTS_TEXT.EML.toLowerCase()}
				value={formik.values.email}
				onChange={formik.handleChange}
			/>
			{formik.touched.email && formik.errors.email ? (
				<div>{formik.errors.email}</div>
			) : null}
			<Input
				label={INPUTS_TEXT.PASS}
				name='password'
				type={INPUTS_TEXT.PASS.toLowerCase()}
				value={formik.values.password}
				onChange={formik.handleChange}
			/>
			{formik.touched.password && formik.errors.password ? (
				<div>{formik.errors.password}</div>
			) : null}
			<Button type='submit' text={BUTTONS_TEXT.REG} />
			<p>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</StyledForm>
	);
};

export default Registration;
