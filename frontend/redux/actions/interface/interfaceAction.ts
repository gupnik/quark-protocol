import { InterfaceMode } from '../../../common/enums';
import * as types from '../../types';

export const getDesktopDrawerStatus = () => {
  return {
    type: types.GET_INTERFACE_LOCALE
  };
};

export const setDesktopDrawerStatus = (payload: boolean) => {
  return {
    type: types.SET_DESKTOP_DRAWER_STATUS,
    payload
  };
};

export const getInterfaceMode = () => {
  return {
    type: types.GET_INTERFACE_MODE
  };
};

export const setInterfaceMode = (payload: InterfaceMode) => {
  return {
    type: types.SET_INTERFACE_MODE,
    payload
  };
};
