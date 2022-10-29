import * as types from '../../types';

const initialState = {
  locale: 'en'
};

export const preferenceReducer = (state = initialState, action: types.PreferenceActionTypes) => {
  switch (action.type) {
    case types.SET_INTERFACE_LOCALE:
      return {
        ...state,
        locale: action.payload
      };
    default:
      return state;
  }
};
