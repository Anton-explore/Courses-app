import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { BUTTONS_TEXT, INPUTS_TEXT } from '../../constants';
import { formatDate } from '../../helpers/dateGenerator';
import { formatDuration } from '../../helpers/pipeDuration';
import { AuthorType, CourseType, CreateCourseProps } from '../../types';
import {
	StyledAuthorBlock,
	StyledAuthorChange,
	StyledAuthorWrapper,
	StyledDataInnerWrapper,
	StyledTitleWrapper,
	StyledInnerWrapper,
	StyledFormWrapper,
} from './CreateCourse.style';

const initialFormState: CourseType = {
	id: '',
	title: '',
	description: '',
	duration: 0,
	creationDate: '',
	authors: [],
};

const CreateCourse: React.FC<CreateCourseProps> = ({ onAdd, authors }) => {
	const [newCourse, setNewCourse] = useState<CourseType>(initialFormState);
	const [allAuthors, setAllAuthors] = useState<AuthorType[]>(authors);
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

	const isFormValid = () =>
		newCourse.title.trim().length > 0 &&
		newCourse.description.trim().length > 0 &&
		newCourse.duration > 0 &&
		courseAuthors.length > 0;

	const addProperties = () => {
		const authorIDs = courseAuthors.map((author) => author.id);
		const updatedCourse = {
			...newCourse,
			id: uuid(),
			creationDate: formatDate(new Date()),
			authors: authorIDs,
		};
		return updatedCourse;
	};

	const formSubmitHandler = () => {
		if (!isFormValid()) {
			alert('Please, fill in all fields');
			return;
		}
		const addNewCourse = addProperties();
		onAdd(addNewCourse, courseAuthors);
		setNewCourse(initialFormState);
		setAllAuthors(authors);
	};

	const handlerAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewAuthor(e.target.value);
	};
	const authorCreationHandler = () => {
		if (newAuthor.length < 2) {
			alert('Too short name');
			return;
		}
		if (allAuthors.some((author) => author.name === newAuthor)) {
			alert('This author is already been');
			return;
		}
		const newAuthorData: AuthorType = {
			id: uuid(),
			name: newAuthor,
		};
		setAllAuthors([...allAuthors, newAuthorData]);
		setNewAuthor('');
	};
	const authorInsertHandler = (author: AuthorType) => {
		setCourseAuthors([...courseAuthors, author]);
		setAllAuthors(allAuthors.filter((a) => a.id !== author.id));
	};
	const authorDeleteHandler = (author: AuthorType) => {
		setCourseAuthors(courseAuthors.filter((a) => a.id !== author.id));
		setAllAuthors([...allAuthors, author]);
	};

	return (
		<div>
			<StyledFormWrapper>
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
					<Button
						text={BUTTONS_TEXT.CREATE_COURSE}
						onClick={formSubmitHandler}
					/>
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
							{allAuthors.map((author, index) => (
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
			</StyledFormWrapper>
		</div>
	);
};

export default CreateCourse;
