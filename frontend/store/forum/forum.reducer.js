import * as actions from "./forum.actions"

const initialState = {
  loading: false, 
  questions: [],
  hasErrors: false
}

function forumReducer(state = initialState, action){
  switch (action.type) {
    case actions.GET_QUESTIONS_LOADING:
      return {...state, loading: true}
    case actions.GET_QUESTIONS_SUCCESS: 
    return {loading: false, questions: action.payload, hasErrors: false}
    case actions.GET_QUESTIONS_FAILURES: 
      return {...state, hasErrors: true}
    default:
      return state;
  }
}

export default forumReducer;