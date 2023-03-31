import { ButtonProps } from '../../types';
import { StyledButton } from './Button.style';

export const Button = ({ text, onClick }: ButtonProps) => (
	<StyledButton onClick={onClick}>{text}</StyledButton>
);
