import { parseCurriculum } from '../../utils/helpers';
import { parseCurriculumArray } from '../../utils/helpers';
export const GET_CURRICULUM_LOADING = 'GET CURRICULUM LOADING';
export const GET_CURRICULUM_SUCCESS = 'GET CURRICULUM SUCCESS';
export const GET_CURRICULUM_FAILURES = 'GET CURRICULUM FAILURES';

export const getCurriculum = () => ({ type: GET_CURRICULUM_LOADING });
export const getCurriculumSuccess = (curriculum) => ({ type: GET_CURRICULUM_SUCCESS, payload: curriculum });
export const getCurriculumFailures = () => ({ type: GET_CURRICULUM_FAILURES });

export function fetchCourseCurriculum(id) {
    return async (dispatch) => {
        dispatch(getCurriculum());

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

            dispatch(getCurriculumSuccess((data.data.course.sections)));
        } catch (error) {
            dispatch(getCurriculumFailures());
        }
    };
}
