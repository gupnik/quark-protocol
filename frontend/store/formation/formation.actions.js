import { parseTrainingObjet, parseTrainingState, findCurrentChapter } from "../../utils/helpers"
import { toast } from "react-toastify";

export const CHECK_IF_TRAINING_EXIST = 'CHECK IF TRAINING EXIST'
export const GET_FORMATION_SUCCESS = 'GET FORMATION SUCCESS'
export const GET_CHAPTER_SUCCESS = 'GET CHAPTER SUCCESS'
export const CANCEL_FORMATION = 'CANCEL FORMATION'

export const checkIfTrainingExit = (training) => ({type: CHECK_IF_TRAINING_EXIST, payload: training})
export const getFormationSuccess = (data) => ({type: GET_FORMATION_SUCCESS, payload: data}) 
export const getChapterSuccess =  (chapter) => ({type: GET_CHAPTER_SUCCESS, payload:chapter })
export const cancelTraining = () => ({type: CANCEL_FORMATION})

export function trainingIsExist(course,student){
  return async dispatch => {
    try {
      const response = await fetch('https://api.thegraph.com/subgraphs/name/gupnik/ama-near', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            {
                user(id: \"${student}\") {
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
    const data = await response.json();
    console.log('f', course, data, data.data.user.subscribed_courses.some((c) => c.id == course));

      dispatch(checkIfTrainingExit(data.data.user.subscribed_courses.some((c) => c.id == course)))
    } catch (error) {
      
    }
  }
}

export function cancelCurrentTraining(id){
  return async dispatch => {
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/formations/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()

      toast(`${data.message}`,{
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "colored",
        type: toast.TYPE.SUCCESS,
      })

      dispatch(cancelTraining())
    } catch (error) {
      
    }
  }
}


export function fetchTrainingState(slug,student){
  return async dispatch => {

    try {
      const response = await fetch('https://api.thegraph.com/subgraphs/name/gupnik/ama-near', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    {
                      course(id: ${slug}) {
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

      const trainings = data.data.course.sections; //parseTrainingState(data);
      console.log(slug, data, trainings);

      dispatch(getFormationSuccess(trainings));
      // dispatch(fetchChapter(findCurrentChapter(trainings), slug, student));
      dispatch(fetchChapter(0, slug, student));
    } catch (error) {
      
    }
  }
}

export function fetchChapter(chapter,slug,student){
  return async dispatch => {
    try {
      const response = await fetch('https://api.thegraph.com/subgraphs/name/gupnik/ama-near', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    {
                      course(id: ${slug}) {
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

      console.log('c', chapter,  data.data.course.sections, data.data.course.sections[0].chapters[0]);
      dispatch(getChapterSuccess({content: data.data.course.sections[0].chapters[0], training: null}))
    } catch (error) {
      
    }
  }
}

export function validateChapter(slug,chapter_id,student_id){
  return async dispatch => {

    try {
      const response = await fetch("http://127.0.0.1:8000/api/formation/chapter/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          slug: slug,
          chapter_id: chapter_id, 
          student_id: student_id,}) 
      })

      const data = await response.json()
      dispatch(fetchTrainingState(slug,student_id))

      toast(`${data.message}`,{
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "colored",
        type: toast.TYPE.SUCCESS,
      })
      
    } catch (error) {
      
    }
  }
}



export function unValidateChapter(slug,chapter_id,student_id){
  return async dispatch => {

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/formation/chapter/${slug}/${student_id}/${chapter_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })

      const data = await response.json()
      dispatch(fetchTrainingState(slug,student_id))

      toast(`${data.message}`,{
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "colored",
        type: toast.TYPE.SUCCESS,
      })
      
    } catch (error) {
      
    }
  }
}