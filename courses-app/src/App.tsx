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
import CreateCourse from './components/CreateCourse';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

import { mockedAuthorsList, mockedCoursesList } from './constants';

import {
	AuthorType,
	CourseType,
	GlobalSharedContext,
	TokenResponse,
} from './types';

import { StyledWrapper } from './App.style';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { loginUser, logoutUser } from './store/user/userSlice';
import {
	selectAuthors,
	selectCourses,
	selectToken,
	selectUserName,
} from './store/selectors';
import { CoursesAPI, AuthorsAPI } from './helpers/api';
import { addCourse, getCourses } from './store/courses/coursesSlice';
import { addAuthor, getAuthors } from './store/authors/authorsSlice';
// import { UserAPI } from './helpers/api';

export const SharedContext = createContext<GlobalSharedContext | undefined>(
	undefined
);

function App() {
	const dispatch = useAppDispatch();

	const token = useAppSelector(selectToken);
	const userName = useAppSelector(selectUserName);
	const courses = useAppSelector(selectCourses);
	const allAuthors = useAppSelector(selectAuthors);
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

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(
				loginUser({
					successful: true,
					result: localStorage.getItem('token') as string,
					user: {
						name: localStorage.getItem('userName') as string,
						email: localStorage.getItem('email') as string,
					},
				})
			);
			dispatch(getCourses(mockedCoursesList));
			dispatch(getAuthors(mockedAuthorsList));
		}
	}, [dispatch]);

	const handleLogin = (response: TokenResponse) => {
		const coursesList = async () => {
			try {
				const result = await CoursesAPI.getCourses();
				dispatch(getCourses(result.result));
				return result;
			} catch (error) {
				dispatch(getCourses(mockedCoursesList));
				return error;
			}
		};
		const authorsList = async () => {
			try {
				const result = await AuthorsAPI.getAuthors();
				dispatch(getAuthors(result.result));
				return result;
			} catch (error) {
				dispatch(getAuthors(mockedAuthorsList));
				return error;
			}
		};
		coursesList();
		authorsList();
		dispatch(loginUser(response));
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		localStorage.removeItem('email');
		dispatch(logoutUser());
	};

	const creationCoursesHandler = (
		course: CourseType,
		courseAuthors: AuthorType[]
	) => {
		dispatch(addCourse(course));
		dispatch(
			addAuthor([
				...courseAuthors.filter(
					(atr) => !allAuthors.some((haveAuthor) => haveAuthor.id === atr.id)
				),
			])
		);
		navigate('/courses');
	};

	return (
		<SharedContext.Provider
			value={{
				userName,
				handleLogout,
				token,
				isLoading,
				setIsLoading,
				courses,
				allAuthors,
				creationCoursesHandler,
				handleLogin,
			}}
		>
			<StyledWrapper>
				<Header />
				<Routes>
					<Route path='/' element={<Navigate to='/courses' />} />
					<Route path='/courses' element={<Courses />} />
					<Route path='/courses/add' element={<CreateCourse />} />
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
