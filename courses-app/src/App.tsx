import { useState, createContext } from 'react';
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
import { selectToken, selectUserName } from './store/selectors';

export const SharedContext = createContext<GlobalSharedContext | undefined>(
	undefined
);

function App() {
	const dispatch = useAppDispatch();

	// const [token, setToken] = useState<string | null>(
	// 	localStorage.getItem('token')
	// );
	// const [userName, setUserName] = useState<string | null>(
	// 	localStorage.getItem('userName')
	// );
	const token = useAppSelector(selectToken);
	const userName = useAppSelector(selectUserName);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [courses, setCourses] = useState<CourseType[]>(mockedCoursesList);
	const [allAuthors, setAllAuthors] = useState<AuthorType[]>(mockedAuthorsList);

	const navigate = useNavigate();

	const handleLogin = (response: TokenResponse) => {
		dispatch(loginUser(response));
		// setToken(response.result);
		// setUserName(response.user.name);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		dispatch(logoutUser());
		// setToken(null);
		// setUserName(null);
	};

	const creationCoursesHandler = (
		course: CourseType,
		courseAuthors: AuthorType[]
	) => {
		setCourses([...courses, course]);
		setAllAuthors([
			...allAuthors,
			...courseAuthors.filter(
				(atr) => !allAuthors.some((haveAuthor) => haveAuthor.id === atr.id)
			),
		]);
		navigate('/courses');
	};

	return (
		<SharedContext.Provider
			value={{
				userName,
				// setUserName,
				handleLogout,
				token,
				// setToken,
				isLoading,
				setIsLoading,
				courses,
				setCourses,
				allAuthors,
				setAllAuthors,
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
							token ? (
								<CreateCourse
								// onAdd={creationCoursesHandler}
								// authors={allAuthors}
								/>
							) : (
								<Navigate to='/login' replace />
							)
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
