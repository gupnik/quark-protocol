export const GET_COURSE_LOADING = 'GET COURSE LOADING';
export const GET_COURSE_SUCCESS = 'GET COURSE SUCCESS';
export const GET_COURSE_FAILURES = 'GET COURSE FAILURES';

export const getCourse = () => ({ type: GET_COURSE_LOADING });
export const getCourseSuccess = (course) => ({ type: GET_COURSE_SUCCESS, payload: course });
export const getCourseFailures = () => ({ type: GET_COURSE_FAILURES });

export function fetchCourse(id) {
    return async (dispatch) => {
        dispatch(getCourse());
        try {
            const response = await fetch('https://api.thegraph.com/subgraphs/name/gupnik/ama-near', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    {
                      course(id: ${id}) {
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
            console.log(data);

            dispatch(getCourseSuccess(data.data.course));
        } catch (error) {
            dispatch(getCourseFailures());
        }
    };
}
