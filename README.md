# Courses-app

Educational React Project

# HOMEWORK 5

## Criteria (20 points max)

Add test for **Header**:

[2 points] - Header should have logo and user's name.

Add tests for **CourseCard**:

[1 point] - CourseCard should display title.

[1 point] - CourseCard should display description.

[1 point] - CourseCard should display duration in the correct format.

[1 point] - CourseCard should display authors list.

[1 point] - CourseCard should display created date in the correct format.

Add tests for **Courses**:

[2 points] - Courses should display amount of CourseCard equal length of courses array.

[1 point] - Courses should display Empty container if courses array length is 0.

[2 points] - CourseForm should be showed after a click on a button "Add new course".

Add test for **coursesReducer**:

[1 point] - reducer should return the initial state.

[1 point] - reducer should handle SAVE_COURSE and returns new state.

[1 point] - reducer should handle GET_COURSES and returns new state

Script in the **package.json**:

[5 points] - pre-commit hook works correctly:
There is no ability to commit changes if some of unit tests are failed.

EXTRA TASK:

Add tests for **CourseForm**:

**CourseForm** should show authors lists (all and course authors).

**CourseForm** 'Create author' click button should call dispatch.

**CourseForm** 'Add author' button click should add an author to course authors list.

**CourseForm** 'Delete author' button click should delete an author from the course list.

# HOMEWORK 3

## Criteria (15 points max)

### APIs

1. [ ] [2 points] - All functionality with back-end should be in services.js. (Create api service for each endpoint that you use and call methods or functions from service into your components.)

2. [ ] [2 points] - Get courses from back-end. See API /courses/all in the SWAGGER. Save courses list to the store.

3. [ ] [2 points] - Get authors from back-end. See API /authors/all in the SWAGGER. Save authors list to the store.
       Store

4. [ ] [2 points] - Store should have User reducer. User reducer manage data with user's info and should have next model:

```javascript
const userInitialState = {
  isAuth: boolean, // default value - false. After success login - true
  name: string, // default value - empty string. After success login -name of user
  email: string, // default value - empty string. After success login -email of user
  token: string, // default value - empty string or token value from localStorage.
  // After success login - value from API /login response. See Swagger.
};
```

**User** reducer has logic:

- After success login isAuth property have value true, save token, email and name.
- After logout isAuth property have value false, token, email and name have value as empty string. Clean localStorage.

5. [ ] [1 point] - Store should have Courses reducer.
       Courses reducer manage data with courses list and should have next model:

```javascript
const coursesInitialState = []; // default value - empty array.
```

**Courses** reducer has logic:
Save new course.
Delete course.
Update course.
Get courses. Save courses to store after getting them from API. See Swagger **/courses/all**.

6. [ ] [1 point] - Store should have Authors reducer.
       Authors reducer manage data with authors list and should have next model:

```javascript
const authorsInitialState = []; // default value - empty array. After success getting authors from API - array of authors.
```

**Authors** reducer has logic:
Save a new author.
Get authors. Save authors to store after getting them from API. See Swagger **/authors/all** .

Courses Component

7. [ ] [1 point] - Get courses from store and render them into Courses component.
       CreateCourse component

8. [ ] [2 points] - After saving course in CreateCourse component course should be added to store.
       CourseCard Component
9. [ ] [1 point] - Add a new button "Delete course" into CourseCard. (CourseCard in COMPONENTS).
10. [ ] [1 point] - After clicking on the Delete course button a selected course should be deleted from store.

# HOMEWORK 1

## Criteria (20 points max)

### Common

[1 point] - The architecture of the application should be the same as presented above.
[1 point] - Components are presented as function components (not class components).
[1 point] - Use .jsx extensions for files with jsx syntax.
[1 point] - All inputs and buttons should be reusable components.
[2 points] - eslint, prettier and pre-commit hook work correctly.
Searching
[1 point] - Implement searching functionality by title. Reset search result when searchbar is empty.
[1 point] - Implement searching functionality by id. Reset search result when searchbar is empty.
Courses
[2 points] - Show list of courses.
CreatCourse Component
(Add new course in COMPONENTS)
[1 point] - Possibility to add a title.
[1 point] - Possibility to add a description.
[1 point] - Possibility to add a duration.
[2 points] - Show duration time in a format «hh:mm».
Example: 122 min should be showed as 02:02 hours.
[1 point] - Add logic for creating new author.
[1 point] - Add logic for adding author to Course authors
[1 point] - Add logic for deleting author from Course authors
[2 points] - Add logic for saving course (new course should be presented in the courses list).
