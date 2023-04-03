import { useState } from 'react';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';

import { BUTTONS_TEXT, INPUTS_TEXT } from '../../../../constants';
import { SearchBarProps } from '../../../../types';

import { useSharedState } from '../../../../hooks/useSharedState';

import { SearchBarWrapper } from './SearchBar.style';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const { courses } = useSharedState();

	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		if (event.target.value === '') {
			onSearch(courses);
		}
	};

	const handleSearchClick = () => {
		if (!searchTerm) {
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
		<SearchBarWrapper onSubmit={(e) => e.preventDefault()}>
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
