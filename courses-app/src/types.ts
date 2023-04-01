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
	error?: string | false;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ButtonProps = {
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
