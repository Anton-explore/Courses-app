import { RootState } from './store';

export const selectUserName = ({ user }: RootState) => user.name;
export const selectIsAuth = ({ user }: RootState) => user.isAuth;
export const selectToken = ({ user }: RootState) => user.token;
// export const selectUserRole = ({ user}: RootState) => user.role;
// export const selectAuthError = ({ user}: RootState) => user.error;

export const selectCourses = ({ courses }: RootState) => courses.courses;

export const selectAuthors = ({ authors }: RootState) => authors.authors;
