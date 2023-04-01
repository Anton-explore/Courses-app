import axios from 'axios';
import { CourseType, LoginValues } from '../types';

// type MyAxiosConfig = AxiosRequestConfig & {
// 	Authorization: string;
// };

const $publicHost = axios.create({
	baseURL: 'http://localhost:4000/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

const $privateHost = axios.create({
	baseURL: 'http://localhost:4000/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

const authInterceptor = (config: any) => {
	config.headers['Authorization'] = localStorage.getItem('token');
	return config;
};

$privateHost.interceptors.request.use(authInterceptor);

export const UserAPI = {
	async register(formData: LoginValues) {
		const { data } = await $publicHost.post(`/register`, formData);
		return data;
	},
	async login(formData: LoginValues) {
		const { data } = await $publicHost.post(`/login`, formData);
		return data;
	},
	async getUserDetails() {
		const { data } = await $privateHost.get(`/users/me`);
		return data;
	},
	async logout() {
		const { data } = await $privateHost.post(`/logout`);
		return data;
	},
};

export const CoursesAPI = {
	async getCourses() {
		const { data } = await $privateHost.get(`/courses/all`);
		return data;
	},
	async addCourse(courseData: CourseType) {
		const { data } = await $privateHost.post(`/courses/add`, courseData);
		return data;
	},
	async getCourse(courseId: string) {
		const { data } = await $privateHost.get(`/courses/${courseId}`);
		return data;
	},
	async deleteCourse(courseId: string) {
		const { data } = await $privateHost.delete(`/courses/${courseId}`);
		console.log(data);
		return data;
	},
};

export const AuthorsAPI = {
	async getAuthors() {
		const { data } = await $privateHost.get(`/authors/all`);
		return data;
	},
	async addAuthor(authorData: { name: string }) {
		const { data } = await $privateHost.post(`/authors/add`, authorData);
		return data;
	},
	async getAuthor(authorId: string) {
		const { data } = await $privateHost.get(`/authors/${authorId}`);
		return data;
	},
	async deleteAuthor(authorId: string) {
		const { data } = await $privateHost.delete(`/authors/${authorId}`);
		console.log(data);
		return data;
	},
};
