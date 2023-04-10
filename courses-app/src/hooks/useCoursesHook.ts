import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';

import { getCoursesRequest } from '../store/courses/coursesSlice';
import { selectCoursesState } from '../store/selectors';

const useCoursesHook = () => {
	const dispatch = useAppDispatch();
	const {
		courses,
		status: courseStatus,
		error: courseError,
	} = useAppSelector(selectCoursesState);

	useEffect(() => {
		dispatch(getCoursesRequest());
	}, [dispatch]);

	return {
		courses,
		status: courseStatus,
		error: courseError,
	};
};

export default useCoursesHook;
