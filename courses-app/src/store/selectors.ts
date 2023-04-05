import { RootState } from './store';

export const selectUserName = ({ user }: RootState) => user.user.name;
export const selectIsAuth = ({ user }: RootState) => user.user.isAuth;
export const selectToken = ({ user }: RootState) => user.user.token;
// export const selectUserRole = ({ user}: RootState) => user.user.role;
// export const selectAuthError = ({ user}: RootState) => user.user.error;

export const selectCourses = ({ courses }: RootState) => courses;

export const selectAuthors = ({ authors }: RootState) => authors;
