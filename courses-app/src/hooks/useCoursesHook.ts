import { useEffect } from 'react';
import { getCourses } from '../store/courses/coursesSlice';
import { selectCourses } from '../store/selectors';
import { useAppDispatch, useAppSelector } from './reduxHooks';

const useCoursesHook = () => {
	const dispatch = useAppDispatch();
	const courses = useAppSelector(selectCourses);
	// const status = useAppSelector((store: RootState) => store.courses.isLoading);
	// const error = useAppSelector((store: RootState) => store.courses.error);

	useEffect(() => {
		dispatch(getCourses(courses));
	}, [courses, dispatch]);

	return {
		courses,
		// status,
		// error,
	};
};

export default useCoursesHook;
