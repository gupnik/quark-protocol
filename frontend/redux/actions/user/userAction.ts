import { LoggedUser } from '../../../common/types';
import * as types from '../../types';

export const getUserInfo = () => {
  return {
    type: types.GET_USER_INFO
  };
};

export const setUserInfo = (payload: LoggedUser) => {
  return {
    type: types.SET_USER_INFO,
    payload
  };
};
