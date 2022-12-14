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
            const response = await fetch('https://api.thegraph.com/subgraphs/name/gupnik/ama-near', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    {
                      courses(first: 5) {
                        id
                        title
                        image
                        price
                        sections {
                          id
                          section_title
                          chapters {
                            id
                            chapter_title
                            chapter_text_content
                          }
                        }
                      }
                    }
                    `,
                    variables: {
                        
                    },
                })
            });
            const data = await response.json()

            dispatch(getCoursesSuccess(data.data.courses));
        } catch (error) {
            dispatch(getCoursesFailures());
        }
    };
}

export function fetchAllCourses() {
    return async (dispatch) => {
        try {
            const response = await fetch('https://api.thegraph.com/subgraphs/name/gupnik/ama-near', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    {
                      courses(first: 5) {
                        id
                        title
                        image
                        price
                        sections {
                          id
                          section_title
                          chapters {
                            id
                            chapter_title
                            chapter_text_content
                          }
                        }
                      }
                    }
                    `,
                    variables: {
                        
                    },
                })
            });
            const data = await response.json()

            dispatch(getCoursesSuccess(data.data.courses));
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
