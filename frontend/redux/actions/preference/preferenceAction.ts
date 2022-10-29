import * as types from '../../types';

export const getInterfaceLocale = () => {
  return {
    type: types.GET_INTERFACE_LOCALE
  };
};

export const setInterfaceLocale = (payload: string) => {
  return {
    type: types.SET_INTERFACE_LOCALE,
    payload
  };
};
