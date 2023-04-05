import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader/Loader';
import { formatDuration } from '../../helpers/pipeDuration';
import { useSharedState } from '../../hooks/useSharedState';
import { AuthorType, CourseType } from '../../types';
import {
	StyledCardWrapper,
	StyledDataWrapper,
	StyledInnerWrapper,
	StyledText,
	StyledLink,
	StyledTitle,
} from './CourseInfo.style';

const CourseInfo: React.FC = () => {
	const { courses, allAuthors } = useSharedState();
	const { courseId } = useParams<{ courseId: string }>();
	const [course, setCourse] = useState<CourseType | null>(null);

	useEffect(() => {
		const foundCourse = courses.find((c) => c.id === courseId);
		setCourse(foundCourse || null);
	}, [courses, courseId]);

	if (!course) {
		return <Loader />;
	}

	const { id, title, description, duration, authors, creationDate } = course;

	const filteredAuthors = authors.map((authorId) => {
		const author = allAuthors.find(
			(author: AuthorType) => author.id === authorId
		);
		return author ? author.name : '';
	});

	return (
		<StyledCardWrapper>
			<StyledLink to='/courses'>&#8678; Back to courses</StyledLink>
			<StyledTitle>{title}</StyledTitle>
			<StyledDataWrapper>
				<StyledText>{description}</StyledText>
				<StyledInnerWrapper>
					<p>
						<strong>ID:</strong> {id}
					</p>

					<p>
						<strong>Duration:</strong> {formatDuration(duration)}
					</p>
					<p>
						<strong>Created:</strong> {creationDate}
					</p>
					<p>
						<strong>Authors:</strong>
					</p>
					<ul>
						{filteredAuthors.map((author, index) => (
							<li key={index + 1}>{author}</li>
						))}
					</ul>
				</StyledInnerWrapper>
			</StyledDataWrapper>
		</StyledCardWrapper>
	);
};

export default CourseInfo;