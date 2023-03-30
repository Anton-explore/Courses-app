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
	label?: string;
	htmlFor?: string;
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
