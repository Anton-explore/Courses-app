import { InputProps } from '../../types';
import { StyledInput } from './Input.style';

export const Input = ({ placeholder, value, onChange }: InputProps) => {
	return (
		<>
			<StyledInput
				id='courseFilter'
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			<label htmlFor='courseFilter'></label>
		</>
	);
};
