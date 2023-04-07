// import { useEffect } from 'react';
// import { getCourses } from '../store/courses/coursesSlice';
import { selectCourses } from '../store/selectors';
import { useAppSelector } from './reduxHooks';
// import { CoursesAPI, UserAPI } from '../helpers/api';
// import { CourseType } from '../types';

const useCoursesHook = () => {
	// const dispatch = useAppDispatch();
	const courses = useAppSelector(selectCourses);
	// const status = useAppSelector((store: RootState) => store.courses.isLoading);
	// const error = useAppSelector((store: RootState) => store.courses.error);

	// useEffect(() => {
	// 	dispatch(getCourses());
	// }, [dispatch]);

	return {
		courses,
		// status,
		// error,
	};
};

export default useCoursesHook;
