// import { mockedAuthorsList } from '../../constants';

export const CreateCourse = () => <div>Creation course</div>;

// export const CreateCourse = () => {

//     return (
//         <div>
//             <form action="submit">
//                 <div>
//                     <Input />
//                     <Button text='Create course' />
//                 </div>
//                 <textarea
//                     name="Description"
//                     id="descrInput"
//                     cols="30" rows="10"
//                 >
//                     Enter description
//                 </textarea>
//                 <div>
//                     <div>
//                         <div>
//                             <div>
//                                 <h3>Add author</h3>
//                                 <Input />
//                                 <Button text='Create author' />
//                             </div>
//                             <div>
//                                 <h3>Duration</h3>
//                                 <Input />
//                                 <h2>Duration: <strong>00:00</strong> hours</h2>
//                             </div>
//                         </div>
//                         <div>
//                             <h3>Authors</h3>
//                             <div>
//                                 {mockedAuthorsList.map(author => )}
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </form>
//         </div>
//     )
// }

/////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';

// interface Author {
//   id: number;
//   name: string;
// }

// interface Course {
//   title: string;
//   description: string;
//   duration: string;
//   creationDate: string;
//   authors: Author[];
// }

// interface Props {
//   addNewCourse: (newCourse: Course) => void;
//   allAuthors: Author[];
// }

// const CreateCourse: React.FC<Props> = ({ addNewCourse, allAuthors }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState('');
//   const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
//   const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);
//   const [authorName, setAuthorName] = useState('');

//   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(event.target.value);
//   };

//   const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setDescription(event.target.value);
//   };

//   const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     if (/^\d*$/.test(value)) { // allow only numbers
//       setDuration(value);
//     }
//   };

//   const handleAuthorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setAuthorName(event.target.value);
//   };

//   const handleAddAuthorClick = (author: Author) => {
//     setSelectedAuthors(selectedAuthors.filter(a => a.id !== author.id));
//     setCourseAuthors([...courseAuthors, author]);
//   };

//   const handleDeleteAuthorClick = (author: Author) => {
//     setCourseAuthors(courseAuthors.filter(a => a.id !== author.id));
//     setSelectedAuthors([...selectedAuthors, author]);
//   };

//   const handleCreateAuthorClick = () => {
//     if (authorName.length >= 2) {
//       const newAuthor: Author = {
//         id: allAuthors.length + 1,
//         name: authorName,
//       };
//       setAuthorName('');
//       allAuthors.push(newAuthor); // assuming mockedAuthorsList is mutable
//       setSelectedAuthors([...selectedAuthors, newAuthor]);
//     }
//   };

//   const handleCreateCourseClick = () => {
//     if (title && description && duration && courseAuthors.length > 0) {
//       const newCourse: Course = {
//         title,
//         description,
//         duration: formatDuration(parseInt(duration)),
//         creationDate: new Date().toLocaleDateString(),
//         authors: courseAuthors,
//       };
//       addNewCourse(newCourse);
//     } else {
//       alert('ALL FIELDS ARE REQUIRED');
//     }
//   };

//   const formatDuration = (minutes: number) => {
//     const hours = Math.floor(minutes / 60);
//     const remainingMinutes = minutes % 60;
//     return `${hours}:${remainingMinutes.toString().padStart(2, '0')} hours`;
//   };

//   return (
//     <div>
//       <h2>Create New Course</h2>
//       <div>
//         <label htmlFor="title">Title:</label>
//         <input id="title" type="text" value={title} onChange={handleTitleChange} />
//       </div>
//       <div>
//         <label htmlFor="description">Description:</label>
//         <textarea id="description" value={description} onChange={handleDescriptionChange} />
//       </div>
//       <div>
//         <label htmlFor="authors">Authors:</label>
//         <ul>
//           {selectedAuthors.map(author => (
//             <li key

////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { v4 as uuid } from "uuid";

// import { Course, Author } from "./models";

// interface Props {
//   authors: Author[];
//   onCreateCourse: (course: Course) => void;
//   onCancel: () => void;
// }

// const CreateCourse: React.FC<Props> = ({ authors, onCreateCourse, onCancel }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [duration, setDuration] = useState<number | undefined>(undefined);
//   const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
//   const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);

//   const handleAddAuthor = (author: Author) => {
//     setSelectedAuthors((prevSelected) => prevSelected.filter((a) => a.id !== author.id));
//     setCourseAuthors((prevAuthors) => [...prevAuthors, author]);
//   };

//   const handleRemoveAuthor = (author: Author) => {
//     setCourseAuthors((prevAuthors) => prevAuthors.filter((a) => a.id !== author.id));
//     setSelectedAuthors((prevSelected) => [...prevSelected, author]);
//   };

//   const handleCreateAuthor = () => {
//     if (newAuthorName.length < 2) {
//       alert("Author name should be at least 2 characters long");
//       return;
//     }

//     const newAuthor: Author = {
//       id: uuid(),
//       name: newAuthorName,
//     };

//     setSelectedAuthors((prevSelected) => [...prevSelected, newAuthor]);

//     setNewAuthorName("");
//   };

//   const handleSubmit = () => {
//     if (!title || !description || !duration || courseAuthors.length === 0) {
//       alert("ALL FIELDS ARE REQUIRED");
//       return;
//     }

//     const newCourse: Course = {
//       id: uuid(),
//       title,
//       description,
//       duration: `${Math.floor(duration / 60)}:${duration % 60} hours`,
//       creationDate: new Date().toISOString(),
//       authors: courseAuthors.map((author) => author.id),
//     };

//     onCreateCourse(newCourse);
//   };

//   const [newAuthorName, setNewAuthorName] = useState("");

//   return (
//     <div>
//       <h1>Create Course</h1>
//       <div>
//         <label htmlFor="title-input">Title:</label>
//         <input
//           id="title-input"
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="description-textarea">Description:</label>
//         <textarea
//           id="description-textarea"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="duration-input">Duration:</label>
//         <input
//           id="duration-input"
//           type="number"
//           min={1}
//           value={duration}
//           onChange={(e) => setDuration(Number

//////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { mockedAuthorsList } from "./mockedData";

// interface Author {
//   id: number;
//   name: string;
// }

// interface Course {
//   id: number;
//   title: string;
//   duration: string;
//   creationDate: string;
//   description: string;
//   authors: Author[];
// }

// const CreateCourse: React.FC<{
//   onCreate: (course: Course) => void;
//   onCancel: () => void;
// }> = ({ onCreate, onCancel }) => {
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState(0);
//   const [description, setDescription] = useState("");
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const [allAuthors, setAllAuthors] = useState(mockedAuthorsList);
//   const [newAuthor, setNewAuthor] = useState("");

//   const handleAddAuthor = (author: Author) => {
//     setAuthors((prev) => [...prev, author]);
//     setAllAuthors((prev) => prev.filter((a) => a.id !== author.id));
//   };

//   const handleDeleteAuthor = (author: Author) => {
//     setAuthors((prev) => prev.filter((a) => a.id !== author.id));
//     setAllAuthors((prev) => [...prev, author]);
//   };

//   const handleCreateAuthor = () => {
//     if (newAuthor.length >= 2) {
//       const newId = allAuthors.length + 1;
//       const newAuthorObj: Author = {
//         id: newId,
//         name: newAuthor,
//       };
//       setAllAuthors((prev) => [...prev, newAuthorObj]);
//       setNewAuthor("");
//     }
//   };

//   const handleCreateCourse = () => {
//     if (!title || !duration || !description || authors.length === 0) {
//       alert("ALL FIELDS ARE REQUIRED");
//       return;
//     }

//     const newCourseId = Math.max(...mockedCoursesList.map((c) => c.id)) + 1;

//     const newCourseObj: Course = {
//       id: newCourseId,
//       title,
//       duration: `${Math.floor(duration / 60)}:${duration % 60} hours`,
//       creationDate: new Date().toISOString(),
//       description,
//       authors,
//     };

//     onCreate(newCourseObj);
//   };

//   return (
//     <div>
//       <h2>Create Course</h2>
//       <label>
//         Title:
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Duration (in minutes):
//         <input
//           type="number"
//           value={duration}
//           onChange={(e) => setDuration(parseInt(e.target.value))}
//         />
//       </label>
//       <br />
//       <label>
//         Description:
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Authors:
//         <ul>
//           {allAuthors.map((author) => (
//             <li key={author.id}>
//               {author.name}
//               <button onClick={() => handleAddAuthor(author)}>
//                 Add author
//               </button>
//             </li>
//           ))}
//         </ul>
//       </label>
//       <br />
//       <label>
//         Course authors:
//         <ul>
//           {authors.map((author) => (
//             <li key={author.id}>
//               {author.name}
//               <button onClick={() => handleDeleteAuthor(author)}>
//                 Delete author

////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { mockedAuthorsList } from "./mockedData";

// interface Author {
//   id: number;
//   name: string;
// }

// interface Course {
//   id: number;
//   title: string;
//   duration: string;
//   creationDate: string;
//   description: string;
//   authors: Author[];
// }

// const CreateCourse: React.FC<{
//   onCreate: (course: Course) => void;
//   onCancel: () => void;
// }> = ({ onCreate, onCancel }) => {
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState(0);
//   const [description, setDescription] = useState("");
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const [allAuthors, setAllAuthors] = useState(mockedAuthorsList);
//   const [newAuthor, setNewAuthor] = useState("");

//   const handleAddAuthor = (author: Author) => {
//     setAuthors((prev) => [...prev, author]);
//     setAllAuthors((prev) => prev.filter((a) => a.id !== author.id));
//   };

//   const handleDeleteAuthor = (author: Author) => {
//     setAuthors((prev) => prev.filter((a) => a.id !== author.id));
//     setAllAuthors((prev) => [...prev, author]);
//   };

//   const handleCreateAuthor = () => {
//     if (newAuthor.length >= 2) {
//       const newId = allAuthors.length + 1;
//       const newAuthorObj: Author = {
//         id: newId,
//         name: newAuthor,
//       };
//       setAllAuthors((prev) => [...prev, newAuthorObj]);
//       setNewAuthor("");
//     }
//   };

//   const handleCreateCourse = () => {
//     if (!title || !duration || !description || authors.length === 0) {
//       alert("ALL FIELDS ARE REQUIRED");
//       return;
//     }

//     const newCourseId = Math.max(...mockedCoursesList.map((c) => c.id)) + 1;

//     const newCourseObj: Course = {
//       id: newCourseId,
//       title,
//       duration: `${Math.floor(duration / 60)}:${duration % 60} hours`,
//       creationDate: new Date().toISOString(),
//       description,
//       authors,
//     };

//     onCreate(newCourseObj);
//   };

//   return (
//     <div>
//       <h2>Create Course</h2>
//       <label>
//         Title:
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Duration (in minutes):
//         <input
//           type="number"
//           value={duration}
//           onChange={(e) => setDuration(parseInt(e.target.value))}
//         />
//       </label>
//       <br />
//       <label>
//         Description:
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Authors:
//         <ul>
//           {allAuthors.map((author) => (
//             <li key={author.id}>
//               {author.name}
//               <button onClick={() => handleAddAuthor(author)}>
//                 Add author
//               </button>
//             </li>
//           ))}
//         </ul>
//       </label>
//       <br />
//       <label>
//         Course authors:
//         <ul>
//           {authors.map((author) => (
//             <li key={author.id}>
//               {author.name}
//               <button onClick={() => handleDeleteAuthor(author)}>
//                 Delete author

//////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { Author, mockedAuthorsList } from './data';

// interface CreateCourseProps {
//   onCourseCreate: (title: string, description: string, authors: Author[], duration: number) => void;
//   onCancel: () => void;
// }

// const CreateCourse: React.FC<CreateCourseProps> = ({ onCourseCreate, onCancel }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(0);
//   const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
//   const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);

//   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(event.target.value);
//   };

//   const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setDescription(event.target.value);
//   };

//   const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(event.target.value);
//     if (!isNaN(value)) {
//       setDuration(value);
//     }
//   };

//   const handleAddAuthor = (author: Author) => {
//     setSelectedAuthors((prevSelectedAuthors) => prevSelectedAuthors.filter((a) => a.id !== author.id));
//     setCourseAuthors((prevCourseAuthors) => [...prevCourseAuthors, author]);
//   };

//   const handleDeleteAuthor = (author: Author) => {
//     setCourseAuthors((prevCourseAuthors) => prevCourseAuthors.filter((a) => a.id !== author.id));
//     setSelectedAuthors((prevSelectedAuthors) => [...prevSelectedAuthors, author]);
//   };

//   const handleCreateAuthor = () => {
//     const authorName = authorNameInputRef.current?.value;
//     if (authorName && authorName.length >= 2) {
//       const newAuthor: Author = {
//         id: Math.max(...mockedAuthorsList.map((a) => a.id)) + 1,
//         name: authorName,
//       };
//       setSelectedAuthors((prevSelectedAuthors) => [...prevSelectedAuthors, newAuthor]);
//       mockedAuthorsList.push(newAuthor);
//       authorNameInputRef.current!.value = '';
//     }
//   };

//   const handleCreateCourse = () => {
//     if (title && description && selectedAuthors.length === 0 && duration > 0) {
//       onCourseCreate(title, description, courseAuthors, duration);
//     } else {
//       alert('ALL FIELDS ARE REQUIRED');
//     }
//   };

//   const authorNameInputRef = React.createRef<HTMLInputElement>();

//   return (
//     <div>
//       <h2>Create New Course</h2>
//       <div>
//         <label htmlFor="title-input">Title:</label>
//         <input id="title-input" type="text" value={title} onChange={handleTitleChange} />
//       </div>
//       <div>
//         <label htmlFor="description-input">Description:</label>
//         <textarea id="description-input" value={description} onChange={handleDescriptionChange} />
//       </div>
//       <div>
//         <label htmlFor="duration-input">Duration (minutes):</label>
//         <input id="duration-input" type="number" value={duration} onChange={handleDurationChange} />
//       </div>
//       <div>
//         <label>Authors:</label>
//         <ul>
//           {selectedAuthors.map((author) => (
//             <li key={author.id}>
//               {author.name}
//               <button onClick={() => handleAddAuthor(author)}>Add author</button>
//             </li>
//           ))}
//         </ul>
