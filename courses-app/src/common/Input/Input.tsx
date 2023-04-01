import { InputProps } from '../../types';
import { StyledInput, StyledInputWrapper } from './Input.style';

export const Input = ({
	placeholder,
	value,
	label,
	type,
	name,
	htmlFor,
	onChange,
	error,
}: InputProps) => {
	return (
		<StyledInputWrapper>
			{label && <label htmlFor={htmlFor}>{label}</label>}
			<StyledInput
				id={htmlFor}
				name={name}
				type={type || 'text'}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{error && <div>{error}</div>}
		</StyledInputWrapper>
	);
};
