import * as types from '../../types';

const initialState = {
  desktopLeftDrawerOpen: false,
  interfaceMode: 'light'
};

export const interfaceReducer = (state = initialState, action: types.InterfaceActionTypes) => {
  switch (action.type) {
    case types.SET_DESKTOP_DRAWER_STATUS:
      return {
        ...state,
        desktopLeftDrawerOpen: action.payload
      };
    case types.SET_INTERFACE_MODE:
      return {
        ...state,
        interfaceMode: action.payload
      };
    default:
      return state;
  }
};
