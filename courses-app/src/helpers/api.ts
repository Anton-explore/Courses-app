import axios from 'axios';
import { CourseType, LoginValues } from '../types';

axios.defaults.baseURL = 'http://localhost:4000';

export const UserAPI = {
	async register(formData: LoginValues) {
		const { data } = await axios.post(`/register`, formData);
		return data;
	},
	async login(formData: LoginValues) {
		const { data } = await axios.post(`/login`, formData);
		return data;
	},
	async getUserDetails(token: string) {
		const { data } = await axios.get(`/users/me`, {
			headers: { Authorization: `${token}` },
		});
		return data;
	},
	async logout(token: string) {
		const { data } = await axios.delete(`/logout`, {
			headers: { Authorization: `${token}` },
		});
		return data;
	},
};

export const CoursesAPI = {
	async getCourses() {
		const { data } = await axios.get<CourseType[]>(`/courses/all`);
		return data;
	},
	async addCourse(courseData: CourseType, token: string) {
		const { data } = await axios.post(`/courses/add`, courseData, {
			headers: { Authorization: `${token}` },
		});
		return data;
	},
	async getCourse(courseId: string) {
		const { data } = await axios.get(`/courses/${courseId}`);
		return data;
	},
	async deleteCourse(courseId: string, token: string) {
		const { data } = await axios.delete(`/courses/${courseId}`, {
			headers: { Authorization: `${token}` },
		});
		return data;
	},
};

export const AuthorsAPI = {
	async getAuthors() {
		const { data } = await axios.get(`/authors/all`);
		return data;
	},
	async addAuthor(authorData: { name: string }, token: string) {
		const { data } = await axios.post(`/authors/add`, authorData, {
			headers: { Authorization: `${token}` },
		});
		return data;
	},
	async getAuthor(authorId: string, token: string) {
		const { data } = await axios.get(`/authors/${authorId}`, {
			headers: { Authorization: `${token}` },
		});
		return data;
	},
	async deleteAuthor(authorId: string, token: string) {
		const { data } = await axios.delete(`/authors/${authorId}`, {
			headers: { Authorization: `${token}` },
		});
		return data;
	},
};
