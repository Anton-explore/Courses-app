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

export const SharedContext = createContext<GlobalSharedContext | undefined>(
	undefined
);

function App() {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem('token')
	);
	const [userName, setUserName] = useState<string | null>(
		localStorage.getItem('userName')
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [courses, setCourses] = useState<CourseType[]>(mockedCoursesList);
	const [allAuthors, setAllAuthors] = useState<AuthorType[]>(mockedAuthorsList);

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

	const handleLogin = ({ result, user }: TokenResponse) => {
		localStorage.setItem('token', result);
		localStorage.setItem('userName', user.name);
		setToken(result);
		setUserName(user.name);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		setToken(null);
		setUserName(null);
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
				setUserName,
				handleLogout,
				token,
				setToken,
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
