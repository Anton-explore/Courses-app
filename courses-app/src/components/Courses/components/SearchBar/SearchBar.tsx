import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';

const SearchBar = () => {
	return (
		<div>
			<form action='submit'>
				<Input
					placeholder='Enter course name...'
					value=''
					onChange={() => console.log('change')}
				/>
				<Button text='Search' onClick={() => console.log('searching...')} />
			</form>
		</div>
	);
};

// import React, { useState } from 'react';
// import { CourseType } from '../../../../types';

// type SearchBarProps = {
// 	courses: CourseType[];
// 	onSearch: (results: CourseType[]) => void;
// };

// const SearchBar: React.FC<SearchBarProps> = ({ courses, onSearch }) => {
// 	const [searchTerm, setSearchTerm] = useState('');

// 	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setSearchTerm(event.target.value);
// 	};

// 	const handleSearchClick = () => {
// 		const results = courses.filter((course) => {
// 			const titleMatch = course.title
// 				.toLowerCase()
// 				.includes(searchTerm.toLowerCase());
// 			const idMatch = course.id
// 				.toLowerCase()
// 				.includes(searchTerm.toLowerCase());
// 			return titleMatch || idMatch;
// 		});
// 		onSearch(results);
// 	};

// 	// const handleClearClick = () => {
// 	// 	setSearchTerm('');
// 	// 	onSearch(courses);
// 	// };

// 	return (
// 		<div>
// 			<Input value={searchTerm} onChange={handleInputChange} />
// 			<Button text='Search' onClick={handleSearchClick} />

// 			{/* <input type='text' value={searchTerm} onChange={handleInputChange} /> */}
// 			{/* <button onClick={handleSearchClick}>Search</button>
// 			<button onClick={handleClearClick}>Clear</button> */}
// 		</div>
// 	);
// };

export default SearchBar;
