import { useState } from 'react';

import { BUTTONS_TEXT, mockedCoursesList } from '../../constants';

import { Button } from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import { StyledCourses, StyledHeadingCourses } from './Courses.style';
import { CourseType } from '../../types';

const Courses = () => {
	const [newCourse, setNewCourse] = useState(false);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [filteredCourses, setFilteredCourses] = useState(courses);

	const addingCourseHandler = () => {
		setNewCourse((prev) => !prev);
	};

	const filteringCoursesHandler = (courses: CourseType[]) => {
		setFilteredCourses(courses);
	};

	const creationCoursesHandler = (course: CourseType) => {
		setCourses((prev) => [...prev, course]);
		mockedCoursesList.push(course);
		setNewCourse((prev) => !prev);
	};

	return (
		<StyledCourses>
			<StyledHeadingCourses>
				{!newCourse && (
					<SearchBar courses={courses} onSearch={filteringCoursesHandler} />
				)}
				<Button
					text={!newCourse ? BUTTONS_TEXT.ADD : BUTTONS_TEXT.SHOWALL}
					onClick={addingCourseHandler}
				/>
			</StyledHeadingCourses>
			{newCourse ? (
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
