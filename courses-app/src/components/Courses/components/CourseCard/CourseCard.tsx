import { Button } from '../../../../common/Button/Button';

// interface CourseType {
// 	id: string;
// 	title: string;
// 	description: string;
// 	creationDate: string;
// 	duration: number;
// 	authors: string[];
// }

// export const CourseCard = ({
// 	id,
// 	title,
// 	description,
// 	creationDate,
// 	duration,
// 	authors,
// }: CourseType) => {
// 	const durationHours = duration / 60;
// 	return (
// 		<div key={id}>
// 			<div>
// 				<h2>{title}</h2>
// 				<p>{description}</p>
// 			</div>
// 			<div>
// 				<div>
// 					<div>
// 						<p>
// 							Authors:
// 							{authors.map((id) => (
// 								<span key={id}>{id}</span>
// 							))}
// 						</p>
// 						<p>Duration: {durationHours.toString().replace(',', ':')} hours</p>
// 						<p>Created: {creationDate}</p>
// 					</div>
// 					<Button
// 						text='Show course'
// 						onClick={console.log("You don't have permission yet!")}
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

import { FC } from 'react';
import { AuthorType, CourseType } from '../../../../types';
import { mockedAuthorsList } from '../../../../constants';
import { formatDuration } from '../../../../helpers/pipeDuration';
import { formatAuthors } from '../../../../helpers/dateGenerator';

// type CourseCardProps = {
// 	course: CourseType;
// 	authors: AuthorType[];
// };

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
		<div key={id}>
			<h2>{title}</h2>
			<p>Duration: {formatDuration(duration)}</p>
			<p>Creation date: {creationDate}</p>
			<p>Description: {description}</p>
			<p>Authors: {formatAuthors(filteredAuthors)}</p>
			<Button text='Show course' />
		</div>
	);
};

export default CourseCard;
