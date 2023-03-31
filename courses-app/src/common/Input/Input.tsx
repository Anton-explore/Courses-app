import { InputProps } from '../../types';
import { StyledInput, StyledInputWrapper } from './Input.style';

export const Input = ({
	placeholder,
	value,
	label,
	htmlFor,
	onChange,
}: InputProps) => {
	return (
		<StyledInputWrapper>
			{label && <label htmlFor={htmlFor}>{label}</label>}
			<StyledInput
				id={htmlFor}
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</StyledInputWrapper>
	);
};
