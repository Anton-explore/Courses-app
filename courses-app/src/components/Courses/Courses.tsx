import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BUTTONS_TEXT } from '../../constants';
import { CourseType } from '../../types';

import { Button } from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import { StyledCourses, StyledHeadingCourses } from './Courses.style';

import { useSharedState } from '../../hooks/useSharedState';

const Courses: React.FC = () => {
	const { courses } = useSharedState();

	const [filteredCourses, setFilteredCourses] = useState(courses);

	const navigate = useNavigate();

	const addingCourseHandler = () => {
		navigate('/courses/add');
	};

	useEffect(() => {
		setFilteredCourses(courses);
	}, [courses]);

	const filteringCoursesHandler = (courses: CourseType[]) => {
		setFilteredCourses(courses);
	};

	return (
		<StyledCourses>
			<StyledHeadingCourses>
				<SearchBar onSearch={filteringCoursesHandler} />
				<Button text={BUTTONS_TEXT.ADD} onClick={addingCourseHandler} />
			</StyledHeadingCourses>
			{filteredCourses.length ? (
				filteredCourses.map((course) => (
					<CourseCard key={course.id} course={course} />
				))
			) : (
				<p>Sorry, i can't find anything</p>
			)}
		</StyledCourses>
	);
};

export default Courses;
