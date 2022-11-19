export const GET_STAT_LOADING = 'GET STAT LOADIN';
export const GET_STAT_SUCCESS = 'GET STAT SUCCESS';
export const GET_STAT_FAILURE = 'GET STAT FAILURE';

export const getStat = () => ({ type: GET_STAT_LOADING });
export const getStatSuccess = (data) => ({ type: GET_STAT_SUCCESS, payload: data });
export const getStatFailures = () => ({ type: GET_STAT_LOADING });

export function getInstructorStat(id) {
    return async (dispatch) => {
        try {
            dispatch(getStat());

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
                                subscriber_count
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
            console.log(data.data.user.created_courses.length)

            let students = 0;
            for (c of data.data.user.created_courses) {
                students += parseInt(c.subscriber_count);
            }

            dispatch(getStatSuccess({ courses: data.data.user.created_courses.length, students}));
        } catch (error) {
            dispatch(getStatFailures());
        }
    };
}

export function getAdminStat() {
    return async (dispatch) => {
        try {
            dispatch(getStat());

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
                                subscriber_count
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

            dispatch(getStatSuccess({ courses: data.data.user.created_courses.length }));
        } catch (error) {
            dispatch(getStatFailures());
        }
    };
}
