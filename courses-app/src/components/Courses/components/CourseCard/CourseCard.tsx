import { FC } from 'react';

import { AuthorType, CourseType } from '../../../../types';
import { BUTTONS_TEXT, mockedAuthorsList } from '../../../../constants';
import { formatDuration } from '../../../../helpers/pipeDuration';
import { formatAuthors } from '../../../../helpers/authorFormatHelper';

import { Button } from '../../../../common/Button/Button';

import {
	StyledCardWrapper,
	StyledDataWrapper,
	StyledInnerWrapper,
	StyledTextWrapper,
} from './CourseCard.style';

const CourseCard: FC<CourseType> = (course) => {
	const { id, title, duration, creationDate, description, authors } = course;

	const findAuthors = (authorsArr: AuthorType[], authors: string[]) => {
		return authors.map((authorId) => {
			const author = authorsArr.find(
				(authorName) => authorName.id === authorId
			);
			return author ? author.name : '';
		});
	};

	const filteredAuthors = findAuthors(mockedAuthorsList, authors);

	return (
		<StyledCardWrapper key={id}>
			<StyledTextWrapper>
				<h2>{title}</h2>
				<p>{description}</p>
			</StyledTextWrapper>
			<StyledDataWrapper>
				<StyledInnerWrapper>
					<p>
						<strong>Authors:</strong> {formatAuthors(filteredAuthors)}
					</p>
					<p>
						<strong>Duration:</strong> {formatDuration(duration)}
					</p>
					<p>
						<strong>Created:</strong> {creationDate}
					</p>
				</StyledInnerWrapper>
				<Button text={BUTTONS_TEXT.SHOW} />
			</StyledDataWrapper>
		</StyledCardWrapper>
	);
};

export default CourseCard;
