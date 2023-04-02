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
			headers: { Authorization: token },
		});
		return data;
	},
	async logout() {
		const { data } = await axios.delete(`/logout`);
		return data;
	},
};

export const CoursesAPI = {
	async getCourses() {
		const { data } = await axios.get(`/courses/all`);
		return data;
	},
	async addCourse(courseData: CourseType) {
		const { data } = await axios.post(`/courses/add`, courseData);
		return data;
	},
	async getCourse(courseId: string) {
		const { data } = await axios.get(`/courses/${courseId}`);
		return data;
	},
	async deleteCourse(courseId: string) {
		const { data } = await axios.delete(`/courses/${courseId}`);
		return data;
	},
};

export const AuthorsAPI = {
	async getAuthors() {
		const { data } = await axios.get(`/authors/all`);
		return data;
	},
	async addAuthor(authorData: { name: string }) {
		const { data } = await axios.post(`/authors/add`, authorData);
		return data;
	},
	async getAuthor(authorId: string) {
		const { data } = await axios.get(`/authors/${authorId}`);
		return data;
	},
	async deleteAuthor(authorId: string) {
		const { data } = await axios.delete(`/authors/${authorId}`);
		return data;
	},
};
