export interface CourseType {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export type AuthorType = {
	id: string;
	name: string;
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
	text: string;
	onClick?: () => void;
};

export type SearchBarProps = {
	courses: CourseType[];
	onSearch: (results: CourseType[]) => void;
};

export type CourseCardType = {
	course: CourseType;
	allAuthors: AuthorType[];
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
	setUserName: React.Dispatch<React.SetStateAction<any>>;
	handleLogout: () => Promise<void> | void;
	token: string | null;
	setToken: React.Dispatch<React.SetStateAction<any>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	courses: CourseType[];
	setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>;
	allAuthors: AuthorType[];
	setAllAuthors: React.Dispatch<React.SetStateAction<AuthorType[]>>;
}

export type TokenResponse = {
	result: string;
	user: { name: string; email: string };
};
