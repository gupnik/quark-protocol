export const GET_COURSES_LOADING = 'GET COURSES LOADGIN';
export const GET_COURSES_SUCCESS = 'GET COURSES SUCCESS';
export const GET_COURSES_FAILURES = 'GET COURSES FAILURES';
export const DELETE_COURSE = 'DELETE COURSE';

export const getCourses = () => ({ type: GET_COURSES_LOADING });
export const getCoursesSuccess = (courses) => ({ type: GET_COURSES_SUCCESS, payload: courses });
export const getCoursesFailure = () => ({ type: GET_COURSES_FAILURES });
export const delCourse = (id) => ({ type: DELETE_COURSE, payload: id });

export function fetchCourses() {
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
            console.log(error);
            dispatch(getCoursesFailure());
        }
    };
}

export function fetchTeacherCourses(id) {
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
                        user(id: \"${id}\") {
                            id
                            created_courses {
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
                    }
                    `,
                    variables: {
                        
                    },
                })
            });
            const data = await response.json()

            dispatch(getCoursesSuccess(data.data.user.created_courses));
        } catch (error) {
            console.log(error)
            dispatch(getCoursesFailure());
        }
    };
}

export function removeCourse(id) {
    return async (dispatch) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/courses/${id}`, {
                method: 'DELETE',
            });

            dispatch(delCourse(id));
        } catch (error) {
            console.log(error);
        }
    };
}
