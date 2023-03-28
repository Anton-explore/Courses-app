import { useState } from 'react';

import { Button } from '../../common/Button/Button';
import { mockedCoursesList } from '../../constants';
import { CreateCourse } from '../CreateCourse/CreateCourse';
import CourseCard from './components/CourseCard/CourseCard';

import SearchBar from './components/SearchBar/SearchBar';

export const Courses = () => {
	const [newCourse, setNewCourse] = useState(false);

	const addingCourseHandler = () => {
		setNewCourse(true);
	};

	return (
		<div>
			<div>
				<div>
					<SearchBar />
					<Button
						text={'Search course'}
						onClick={() => console.log('Searching a course')}
					/>
				</div>
				<Button text='Add new course' onClick={addingCourseHandler} />
			</div>
			{newCourse ? (
				<CreateCourse />
			) : (
				mockedCoursesList.map((course) => <CourseCard {...course} />)
			)}
		</div>
	);
};
