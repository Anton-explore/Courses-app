import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTONS_TEXT, INPUTS_TEXT } from '../../constants';
import { LoginValues, TokenResponse } from '../../types';
import { validateLogin } from '../../helpers/loginFormValidation';
import { UserAPI } from '../../helpers/api';
import { StyledForm } from './Login.style';

const Login: React.FC<{ handleLogin: (response: TokenResponse) => void }> = ({
	handleLogin,
}) => {
	const navigate = useNavigate();

	const initialValues: LoginValues = {
		email: '',
		password: '',
	};

	const onSubmit = async (formData: LoginValues) => {
		try {
			const response = await UserAPI.login(formData);
			console.log(response);
			const { result, user } = response;
			handleLogin({ result, user });
			navigate('/courses');
			return response;
		} catch (error: any) {
			console.log(error.message);
			return error.message;
		}
	};

	const validate = validateLogin;

	const formik = useFormik({
		initialValues,
		onSubmit,
		validate,
	});

	return (
		<StyledForm onSubmit={formik.handleSubmit}>
			<h2>Login</h2>
			<Input
				label={INPUTS_TEXT.EML}
				name={INPUTS_TEXT.EML.toLowerCase()}
				type={INPUTS_TEXT.EML.toLowerCase()}
				value={formik.values.email}
				onChange={formik.handleChange}
			/>
			{formik.touched.email && formik.errors.email ? (
				<div>{formik.errors.email}</div>
			) : null}
			<Input
				label={INPUTS_TEXT.PASS}
				name={INPUTS_TEXT.PASS.toLowerCase()}
				type={INPUTS_TEXT.PASS.toLowerCase()}
				value={formik.values.password}
				onChange={formik.handleChange}
			/>
			{formik.touched.password && formik.errors.password ? (
				<div>{formik.errors.password}</div>
			) : null}
			<Button text={BUTTONS_TEXT.IN} />
			<p>
				If you don't have an account you can{' '}
				<Link to='/registration'>Register</Link>
			</p>
		</StyledForm>
	);
};

export default Login;
