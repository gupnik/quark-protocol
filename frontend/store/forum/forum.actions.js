export const GET_QUESTIONS_LOADING = 'GET QUESTIONS LOADING';
export const GET_QUESTIONS_SUCCESS = 'GET QUESTIONS SUCCESS';
export const GET_QUESTIONS_FAILURES = 'GET QUESTIONS FAILURES';

export const getQuestions = () => ({ type: GET_QUESTIONS_LOADING });
export const getQuestionsSuccess = (questions) => ({ type: GET_QUESTIONS_SUCCESS, payload: questions });
export const getQuestionsFailures = () => ({ type: GET_QUESTIONS_FAILURES });

export function fetchLastQuestions() {
    return async (dispatch) => {
        dispatch(getQuestions());

        try {
            const response = await fetch('https://api.thegraph.com/subgraphs/name/gupnik/ama-near', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    {
                        questions(first: 5) {
                            id
                            text
                            answers {
                              id 
                              text
                            }
                        }
                    }
                    `,
                    variables: {
                        
                    },
                })
            });
            const data = await response.json()

            dispatch(getQuestionsSuccess(data.data.questions));
        } catch (error) {
            dispatch(getQuestionsFailures());
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
