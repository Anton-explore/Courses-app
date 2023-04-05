import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoursesState, CourseType } from '../../types';

const initialState: CoursesState = { courses: [] };

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		getCourses: (
			state: CoursesState,
			{ payload }: PayloadAction<CourseType[]>
		) => {
			state.courses = [...payload];
		},
		addCourse: (
			state: CoursesState,
			{ payload }: PayloadAction<CourseType>
		) => {
			state.courses = [payload, ...state.courses];
		},

		deleteCourse: (state: CoursesState, { payload }: PayloadAction<string>) => {
			state.courses = state.courses.filter((course) => course.id !== payload);
		},
	},
});

export const { getCourses, addCourse, deleteCourse } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
