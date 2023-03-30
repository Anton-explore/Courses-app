import { useState } from 'react';

import {
	BUTTONS_TEXT,
	mockedAuthorsList,
	mockedCoursesList,
} from '../../constants';

import { Button } from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import { StyledCourses, StyledHeadingCourses } from './Courses.style';
import { AuthorType, CourseType } from '../../types';

const Courses = () => {
	const [courseFormVisible, setCourseFormVisible] = useState(false);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [filteredCourses, setFilteredCourses] = useState(courses);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const addingCourseHandler = () => {
		setCourseFormVisible(!courseFormVisible);
	};

	const filteringCoursesHandler = (courses: CourseType[]) => {
		setFilteredCourses(courses);
	};

	const creationCoursesHandler = (
		course: CourseType,
		courseAuthors: AuthorType[]
	) => {
		setCourses([...courses, course]);
		setFilteredCourses([...courses, course]);
		setAuthors([
			...authors,
			...courseAuthors.filter(
				(atr) => !authors.some((haveAuthor) => haveAuthor.id === atr.id)
			),
		]);
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
				<CreateCourse onAdd={creationCoursesHandler} authors={authors} />
			) : filteredCourses.length ? (
				filteredCourses.map((course) => (
					<CourseCard key={course.id} course={course} allAuthors={authors} />
				))
			) : (
				<p>Sorry, i can't find anything</p>
			)}
		</StyledCourses>
	);
};

export default Courses;
