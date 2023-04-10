import { useState, createContext, useEffect } from 'react';
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import NotFound from './components/NotFound';
import CourseInfo from './components/CourseInfo';
import CourseForm from './components/CourseForm';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

import { GlobalSharedContext } from './types';

import { StyledWrapper } from './App.style';
import { useAppDispatch } from './hooks/reduxHooks';
import { logOutRequest } from './store/user/userSlice';

import { getCoursesRequest } from './store/courses/coursesSlice';
import { getAuthorsRequest } from './store/authors/authorsSlice';
import useAuthorsHook from './hooks/useAuthorsHook';
import useUserHook from './hooks/useUserHook';
import useCoursesHook from './hooks/useCoursesHook';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const SharedContext = createContext<GlobalSharedContext | undefined>(
	undefined
);

function App() {
	const dispatch = useAppDispatch();

	const { authors: allAuthors, error: authorsError } = useAuthorsHook();

	const {
		token,
		name: userName,
		status: userLoading,
		role,
		isAuth,
		error: userError,
	} = useUserHook();

	const { courses, error: coursesError } = useCoursesHook();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		!token &&
			location.pathname !== '/login' &&
			location.pathname !== '/registration' &&
			navigate('/login');

		token &&
			(location.pathname === '/login' ||
				location.pathname === '/registration') &&
			navigate('/courses');
	}, [token, location, navigate]);

	const handleLogin = () => {
		if (token) {
			dispatch(getCoursesRequest());
			dispatch(getAuthorsRequest());
		}
	};

	const handleLogout = () => {
		dispatch(logOutRequest(token));
	};

	return (
		<SharedContext.Provider
			value={{
				userName,
				role,
				handleLogout,
				token,
				isLoading,
				isAuth,
				setIsLoading,
				courses,
				allAuthors,
				handleLogin,
				userError,
				userLoading,
			}}
		>
			<StyledWrapper>
				<Header />
				{(coursesError || authorsError) && <p>Ooops!! Some eror occured!</p>}
				<Routes>
					<Route path='/' element={<Navigate to='/courses' />} />
					<Route path='/courses' element={<Courses />} />
					{/* <Route path='/courses/add' element={<CreateCourse />} /> */}
					<Route
						path='/courses/add'
						element={
							<PrivateRoute
								role={role}
								redirectTo='/courses'
								component={<CourseForm />}
							/>
						}
					/>
					<Route
						path='/courses/update/:courseId'
						element={
							<PrivateRoute
								role={role}
								redirectTo='/courses'
								component={<CourseForm />}
							/>
						}
					/>
					<Route path='/courses/:courseId' element={<CourseInfo />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
					<Route path='/not-found' element={<NotFound />} />
					<Route path='*' element={<Navigate to='/not-found' replace />} />
				</Routes>
			</StyledWrapper>
		</SharedContext.Provider>
	);
}

export default App;
