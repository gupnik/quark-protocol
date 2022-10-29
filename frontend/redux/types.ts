import { LoggedUser } from '../models/types';

export const SET_DESKTOP_DRAWER_STATUS = 'SET_DESKTOP_DRAWER_STATUS';
export const GET_DESKTOP_DRAWER_STATUS = 'GET_DESKTOP_DRAWER_STATUS';

export const SET_INTERFACE_MODE = 'SET_INTERFACE_MODE';
export const GET_INTERFACE_MODE = 'GET_INTERFACE_MODE';

export const SET_USER_INFO = 'SET_USER_INFO';
export const GET_USER_INFO = 'GET_USER_INFO';

interface SetUserInfo {
  type: typeof SET_USER_INFO;
  payload: LoggedUser;
}

interface SetInterfaceMode {
  type: typeof SET_INTERFACE_MODE;
  payload: string;
}

interface SetDesktopDrawerStatus {
  type: typeof SET_DESKTOP_DRAWER_STATUS;
  payload: boolean;
}

export type UserActionTypes = SetUserInfo;
export type InterfaceActionTypes = SetDesktopDrawerStatus | SetInterfaceMode | UserActionTypes;
