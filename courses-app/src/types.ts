export interface CourseType {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface CoursesState {
	courses: CourseType[];
}

export type AuthorType = {
	id: string;
	name: string;
};

export interface AuthorsState {
	authors: AuthorType[];
}

export type CoursesResponseType = {
	successful: boolean;
	result: CourseType[];
};

export type AuthorsResponseType = {
	successful: boolean;
	result: AuthorType[];
};

export type InputProps = {
	placeholder?: string;
	value?: string | number;
	name?: string;
	label?: string;
	type?: string;
	htmlFor?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ButtonProps = {
	type?: 'button' | 'submit' | 'reset';
	text: string | JSX.Element;
	onClick?: () => void;
};

export type SearchBarProps = {
	onSearch: (results: CourseType[]) => void;
};

export type CourseCardType = {
	course: CourseType;
};

export type CreateCourseProps = {
	authors: AuthorType[];
	onAdd: (course: CourseType, authors: AuthorType[]) => void;
};

export interface LoginValues {
	name?: string;
	email: string;
	password: string;
}

export interface GlobalSharedContext {
	userName: string | null;
	setUserName?: React.Dispatch<React.SetStateAction<any>>;
	handleLogout: () => Promise<void> | void;
	token: string | null;
	setToken?: React.Dispatch<React.SetStateAction<any>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	courses: CourseType[];
	allAuthors: AuthorType[];
	creationCoursesHandler: (
		course: CourseType,
		courseAuthors: AuthorType[]
	) => void;
	handleLogin: (response: TokenResponse) => void;
}

export type TokenResponse = {
	successful: boolean;
	result: string;
	user: { name: string; email: string };
};

export type UserDetailResponse = {
	result: {
		email: string;
		id: string;
		name: string;
		password: string;
		role: string;
	};
	successful: boolean;
};

export type UserType = {
	isAuth: boolean;
	token: string;
	name: string;
	email: string;
	// error: string;
};
