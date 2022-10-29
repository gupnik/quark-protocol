import * as types from '../../types';
import { userReducer } from './userReducer';

describe('User Reducer', () => {
  const initialState = {
    email: undefined
  };

  it('should return default state', () => {
    const newState = userReducer(undefined, { type: undefined, payload: { email: '' } });
    expect(newState).toStrictEqual(initialState);
  });

  it('should return updated  state', () => {
    const newState = userReducer(undefined, {
      type: types.SET_USER_INFO,
      payload: { email: 'new email' }
    });
    expect(newState).toStrictEqual({ email: 'new email' });
  });
});
