export const GET_COURSES_LOADING = 'GET COURSES LOADING';
export const GET_COURSES_SUCCESS = 'GET COURSES SUCCESS';
export const GET_COURSES_FAILURES = 'GET COURSES FAILURES';

export const getCourses = () => ({ type: GET_COURSES_LOADING });
export const getCoursesSuccess = (courses) => ({ type: GET_COURSES_SUCCESS, payload: courses });
export const getCoursesFailures = () => ({ type: GET_COURSES_FAILURES });

export function fetchLastCourses() {
    return async (dispatch) => {
        dispatch(getCourses());

        try {
            // const response = await fetch("http://127.0.0.1:8000/api/courses")
            // const data = await response.json()
            const data = {
                courses: [
                    {
                        id: '1',
                        title: 'Sample',
                        slug: 'a',
                        image: '',
                        level: 1,
                        views: 100,
                        follow_courses_count: 0,
                        notes_count: 10,
                        total_note: 10,
                    },
                    {
                        id: '2',
                        title: 'Sample',
                        slug: 'a',
                        image: '',
                        level: 1,
                        views: 100,
                        follow_courses_count: 0,
                        notes_count: 10,
                        total_note: 10,
                    },
                    {
                        id: '3',
                        title: 'Sample',
                        slug: 'a',
                        image: '',
                        level: 1,
                        views: 100,
                        follow_courses_count: 0,
                        notes_count: 10,
                        total_note: 10,
                    },
                ],
            };

            dispatch(getCoursesSuccess(data.courses));
        } catch (error) {
            dispatch(getCoursesFailures());
        }
    };
}

export function fetchAllCourses() {
    return async (dispatch) => {
        try {
            // const response = await fetch('http://127.0.0.1:8000/api/courses');
            // const data = await response.json();

            const data = {
                courses: [
                    {
                        id: '1',
                        title: 'Sample',
                        slug: 'a',
                        image: '',
                        level: 1,
                        views: 100,
                        follow_courses_count: 0,
                        notes_count: 10,
                        total_note: 10,
                    },
                    {
                        id: '2',
                        title: 'Sample',
                        slug: 'a',
                        image: '',
                        level: 1,
                        views: 100,
                        follow_courses_count: 0,
                        notes_count: 10,
                        total_note: 10,
                    },
                    {
                        id: '3',
                        title: 'Sample',
                        slug: 'a',
                        image: '',
                        level: 1,
                        views: 100,
                        follow_courses_count: 0,
                        notes_count: 10,
                        total_note: 10,
                    },
                ],
            };

            // key={course.id}
            //     title={course.title}
            //     slug={course.slug}
            //     banner={course.image}
            //     level={course.level}
            //     views={course.views}
            //     teacher_image={course.teacher_image}
            //     category_name={course.category_name}
            //     follow_courses_count={course.follow_courses_count}
            //     notes_count={course.notes_count}
            //     total_note={course.total_note}

            dispatch(getCoursesSuccess(data.courses));
        } catch (error) {
            dispatch(getCoursesFailures());
        }
    };
}

export function fetchCoursesByCategories(id) {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}/courses`);
            const data = await response.json();

            dispatch(getCoursesSuccess(data.courses));
        } catch (error) {
            dispatch(getCoursesFailures());
        }
    };
}

export function searchCourse(name) {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/courses/search/${name}`);
            const data = await response.json();

            dispatch(getCoursesSuccess(data));
        } catch (error) {
            dispatch(getCoursesFailures());
        }
    };
}
