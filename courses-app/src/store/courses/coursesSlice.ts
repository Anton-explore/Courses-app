import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseType } from '../../types';

const initialState: CourseType[] = [];

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		getCourses: (
			state: CourseType[],
			{ payload }: PayloadAction<CourseType[]>
		) => {
			state = [...payload];
		},
		addCourse: (
			state: CourseType[],
			{ payload }: PayloadAction<CourseType>
		) => {
			state = [payload, ...state];
		},

		deleteCourse: (state: CourseType[], { payload }: PayloadAction<string>) => {
			state = state.filter((course) => course.id !== payload);
		},
	},
});

export const { getCourses, addCourse, deleteCourse } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
