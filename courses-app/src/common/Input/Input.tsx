export const Input = ({
	placeholder,
	value,
	onChange,
}: {
	placeholder?: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<>
			<input
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
