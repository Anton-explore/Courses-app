import { useState, createContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

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
		dispatch(loginUser(response));
		// const authorizeUser = async () => {
		// 	try {
		// 		const result = await UserAPI.getUserDetails(response.result);
		// 		return result;
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// };
		// console.log(authorizeUser());

		mockedCoursesList.forEach((course) => {
			const addingCourse = async () => {
				const result = await CoursesAPI.addCourse(course, token);
				console.log(result);
				if (result) {
					dispatch(addCourse(course));
				}
			};
			addingCourse();
		});

		mockedAuthorsList.forEach((author) => {
			const addingAuthor = async () => {
				const result = await AuthorsAPI.addAuthor({ name: author.name }, token);
				if (result) {
					dispatch(addAuthor(result));
				}
			};
			addingAuthor();
		});
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
					<Route
						path='/'
						element={
							token ? (
								<Navigate to='/courses' />
							) : (
								<Navigate to='/login' replace />
							)
						}
					/>
					<Route
						path='/courses'
						element={token ? <Courses /> : <Navigate to='/login' replace />}
					/>
					<Route
						path='/courses/add'
						element={
							token ? <CreateCourse /> : <Navigate to='/login' replace />
						}
					/>
					<Route
						path='/courses/:courseId'
						element={token ? <CourseInfo /> : <Navigate to='/login' replace />}
					/>
					{!token && <Route path='/registration' element={<Registration />} />}
					{!token && <Route path='/login' element={<Login />} />}
					{token && (
						<Route path='/login' element={<Navigate to='/courses' replace />} />
					)}
					<Route
						path='/not-found'
						element={token ? <NotFound /> : <Navigate to='/login' replace />}
					/>
					<Route
						path='*'
						element={
							token ? (
								<Navigate to='/not-found' replace />
							) : (
								<Navigate to='/login' replace />
							)
						}
					/>
				</Routes>
			</StyledWrapper>
		</SharedContext.Provider>
	);
}

export default App;
