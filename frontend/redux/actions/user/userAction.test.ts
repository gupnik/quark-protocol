import * as types from '../../types';
import * as actions from './userAction';

describe('User Actions', () => {
  it('should return action for setting the user info', () => {
    const payload = { email: 'new' };
    const expectedAction = {
      type: types.SET_USER_INFO,
      payload
    };
    expect(actions.setUserInfo(payload)).toEqual(expectedAction);
  });

  it('should return action for getting the user info', () => {
    const expectedAction = {
      type: types.GET_USER_INFO
    };
    expect(actions.getUserInfo()).toEqual(expectedAction);
  });
});
