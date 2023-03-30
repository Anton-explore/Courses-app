import { FC, useMemo } from 'react';

import { CourseCardType } from '../../../../types';
import { BUTTONS_TEXT } from '../../../../constants';
import { formatDuration } from '../../../../helpers/pipeDuration';
import { formatAuthors } from '../../../../helpers/authorFormatHelper';

import { Button } from '../../../../common/Button/Button';

import {
	StyledCardWrapper,
	StyledDataWrapper,
	StyledInnerWrapper,
	StyledTextWrapper,
} from './CourseCard.style';

const CourseCard: FC<CourseCardType> = ({ course, allAuthors }) => {
	const { id, title, duration, creationDate, description, authors } = course;

	const filteredAuthors = useMemo(() => {
		return authors.map((authorId) => {
			const author = allAuthors.find((author) => author.id === authorId);
			return author ? author.name : '';
		});
	}, [authors, allAuthors]);

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
