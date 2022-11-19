export const GET_TRAININGS_LOADING = 'GET TRAININGS LOADING';
export const GET_TRAININGS_SUCCESS = 'GET TRAININGS SUCCESS';
export const GET_TRAININGS_FAILURES = 'GET TRAININGS FAILURES';
export const GET_CERTIFICATES_SUCCESS = 'GET CERTIFICATES SUCCESS';

export const getTrainings = () => ({ type: GET_TRAININGS_LOADING });
export const getTrainingsSuccess = (trainings) => ({ type: GET_TRAININGS_SUCCESS, payload: trainings });
export const getTrainingsFailures = () => ({ type: GET_TRAININGS_FAILURES });
export const getCertificatesSuccess = () => ({ type: GET_CERTIFICATES_SUCCESS });

export function fetchTrainings(id) {
    return async (dispatch) => {
        dispatch(getTrainings());

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
                            subscribed_courses {
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

            dispatch(getTrainingsSuccess(data.data.user));
        } catch (error) {
            dispatch(getTrainingsFailures());
        }
    };
}
