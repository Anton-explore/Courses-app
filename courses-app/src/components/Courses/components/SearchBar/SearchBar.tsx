import { useState } from 'react';
import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import { BUTTONS_TEXT, INPUTS_TEXT } from '../../../../constants';
import { SearchBarProps } from '../../../../types';
import { SearchBarWrapper } from './SearchBar.style';

const SearchBar: React.FC<SearchBarProps> = ({ courses, onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchClick = () => {
		if (searchTerm === '') {
			onSearch(courses);
		}
		const results = courses.filter((course) => {
			const titleMatch = course.title
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const idMatch = course.id
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			return titleMatch || idMatch;
		});
		onSearch(results);
	};

	return (
		<SearchBarWrapper action='submit'>
			<Input
				placeholder={INPUTS_TEXT.SRCH}
				value={searchTerm}
				onChange={handleInputChange}
			/>
			<Button text={BUTTONS_TEXT.SRCH} onClick={handleSearchClick} />
		</SearchBarWrapper>
	);
};

export default SearchBar;
