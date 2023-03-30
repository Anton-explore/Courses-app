import { useState } from 'react';

import { BUTTONS_TEXT, mockedCoursesList } from '../../constants';

import { Button } from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import { StyledCourses, StyledHeadingCourses } from './Courses.style';
import { CourseType } from '../../types';

const Courses = () => {
	const [courseFormVisible, setCourseFormVisible] = useState(false);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [filteredCourses, setFilteredCourses] = useState(courses);

	const addingCourseHandler = () => {
		setCourseFormVisible(!courseFormVisible);
	};

	const filteringCoursesHandler = (courses: CourseType[]) => {
		setFilteredCourses(courses);
	};

	const creationCoursesHandler = (course: CourseType) => {
		setCourses([...courses, course]);
		mockedCoursesList.push(course);
		setCourseFormVisible(!courseFormVisible);
	};

	return (
		<StyledCourses>
			<StyledHeadingCourses>
				{!courseFormVisible && (
					<SearchBar courses={courses} onSearch={filteringCoursesHandler} />
				)}
				{!courseFormVisible && (
					<Button text={BUTTONS_TEXT.ADD} onClick={addingCourseHandler} />
				)}
			</StyledHeadingCourses>
			{courseFormVisible ? (
				<CreateCourse onAdd={creationCoursesHandler} />
			) : filteredCourses.length ? (
				filteredCourses.map((course) => (
					<CourseCard key={course.id} {...course} />
				))
			) : (
				<p>Sorry, i can't find anything</p>
			)}
		</StyledCourses>
	);
};

export default Courses;
