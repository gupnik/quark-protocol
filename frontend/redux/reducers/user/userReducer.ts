import * as types from '../../types';

const initialState = {
  email: undefined
};

export const userReducer = (state = initialState, action: types.UserActionTypes) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        email: action.payload.email
      };
    default:
      return state;
  }
};
