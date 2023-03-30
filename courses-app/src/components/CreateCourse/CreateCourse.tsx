import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { BUTTONS_TEXT, INPUTS_TEXT, mockedAuthorsList } from '../../constants';
import { formatDate } from '../../helpers/dateGenerator';
import { formatDuration } from '../../helpers/pipeDuration';
import { AuthorType, CourseType } from '../../types';
import {
	StyledAuthorBlock,
	StyledAuthorChange,
	StyledAuthorWrapper,
	StyledDataInnerWrapper,
	StyledForm,
	StyledTitleWrapper,
	StyledInnerWrapper,
} from './CreateCourse.style';

const initialFormState: CourseType = {
	id: uuid(),
	title: '',
	description: '',
	duration: 0,
	creationDate: '',
	authors: [],
};

type CreateCourseProps = {
	onAdd: (results: CourseType) => void;
};

const CreateCourse = ({ onAdd }: CreateCourseProps) => {
	const [newCourse, setNewCourse] = useState<CourseType>(initialFormState);
	const [allAuthors, setAllAuthors] = useState<AuthorType[]>(mockedAuthorsList);
	const [courseAuthors, setCourseAuthors] = useState<AuthorType[]>([]);
	const [newAuthor, setNewAuthor] = useState('');

	const handlerTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewCourse({ ...newCourse, title: e.target.value });
	};
	const handlerDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewCourse({ ...newCourse, description: e.target.value });
	};
	const handlerDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const duration = parseInt(e.target.value);
		if (!isNaN(duration)) {
			setNewCourse({ ...newCourse, duration: duration });
		}
	};

	const isFormValid = () => {
		return (
			newCourse.title.trim().length > 0 &&
			newCourse.description.trim().length > 0 &&
			newCourse.duration > 0 &&
			courseAuthors.length > 0
		);
	};

	const addProperties = () => {
		const authorIDs = courseAuthors.map((author) => author.id);
		const updatedCourse = {
			...newCourse,
			creationDate: formatDate(new Date()),
			authors: authorIDs,
		};
		return updatedCourse;
	};

	const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isFormValid()) {
			alert('Please, fill in all fields');
			return;
		}
		const addNewCourse = addProperties();
		console.log(addNewCourse);
		onAdd(addNewCourse);
		setNewCourse(initialFormState);
	};

	const handlerAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length < 2) {
			alert('Too short name');
			return;
		}
		if (allAuthors.some((author) => author.name === e.target.value)) {
			alert('This author is already been');
			return;
		}
		setNewAuthor(e.target.value);
	};
	const authorCreationHandler = () => {
		const newAuthorData: AuthorType = {
			id: uuid(),
			name: newAuthor,
		};
		setAllAuthors((prev) => [...prev, newAuthorData]);
		mockedAuthorsList.push(newAuthorData);
		setNewAuthor('');
	};
	const authorInsertHandler = (author: AuthorType) => {
		setCourseAuthors((prev) => [...prev, author]);
		setAllAuthors((prev) => prev.filter((a) => a.id !== author.id));
	};
	const authorDeleteHandler = (author: AuthorType) => {
		setCourseAuthors(courseAuthors.filter((a) => a.id !== author.id));
		setAllAuthors((prev) => [...prev, author]);
	};

	return (
		<div>
			<StyledForm onSubmit={formSubmitHandler}>
				<StyledTitleWrapper>
					<StyledInnerWrapper>
						<Input
							label={INPUTS_TEXT.TITLE}
							htmlFor={INPUTS_TEXT.TITLE}
							placeholder={INPUTS_TEXT.TITLE_PLH}
							value={newCourse.title}
							onChange={handlerTitleChange}
						/>
					</StyledInnerWrapper>
					<Button text={BUTTONS_TEXT.CREATE_COURSE} />
				</StyledTitleWrapper>
				<label htmlFor='descrInput'>{INPUTS_TEXT.DESCR_PLH}</label>
				<textarea
					name='Description'
					id='descrInput'
					cols={30}
					rows={10}
					placeholder={INPUTS_TEXT.DESCR_PLH}
					value={newCourse.description}
					onChange={handlerDescriptionChange}
				></textarea>
				<StyledAuthorWrapper>
					<StyledAuthorBlock>
						<StyledDataInnerWrapper>
							<h3>Add author</h3>
							<Input
								label={INPUTS_TEXT.AUTHOR}
								htmlFor={INPUTS_TEXT.AUTHOR_FOR}
								placeholder={INPUTS_TEXT.AUTHOR_PLH}
								value={newAuthor}
								onChange={handlerAuthorChange}
							/>
							<Button
								text={BUTTONS_TEXT.CREATE_AUTHOR}
								onClick={authorCreationHandler}
							/>
						</StyledDataInnerWrapper>
						<StyledDataInnerWrapper>
							<h3>Duration</h3>
							<Input
								label={INPUTS_TEXT.DURATION}
								htmlFor={INPUTS_TEXT.DURATION}
								placeholder={INPUTS_TEXT.DURATION_PLH}
								value={newCourse.duration}
								onChange={handlerDurationChange}
							/>
							<h2>
								Duration:{' '}
								<span>
									{newCourse.duration
										? formatDuration(newCourse.duration)
										: '00:00'}
								</span>{' '}
							</h2>
						</StyledDataInnerWrapper>
					</StyledAuthorBlock>
					<StyledAuthorBlock>
						<h3>Authors</h3>
						<StyledDataInnerWrapper>
							{allAuthors.map((author) => (
								<StyledAuthorChange key={author.id}>
									<p>{author.name}</p>
									<Button
										text={BUTTONS_TEXT.ADD_AUTHOR}
										onClick={() => authorInsertHandler(author)}
									/>
								</StyledAuthorChange>
							))}
						</StyledDataInnerWrapper>
						<h3>Course authors</h3>
						<StyledDataInnerWrapper>
							{courseAuthors.length ? (
								courseAuthors.map((author) => (
									<StyledAuthorChange key={author.id}>
										<p>{author.name}</p>
										<Button
											text={BUTTONS_TEXT.DEL_AUTHOR}
											onClick={() => authorDeleteHandler(author)}
										/>
									</StyledAuthorChange>
								))
							) : (
								<p>Author list is empty</p>
							)}
						</StyledDataInnerWrapper>
					</StyledAuthorBlock>
				</StyledAuthorWrapper>
			</StyledForm>
		</div>
	);
};

export default CreateCourse;
