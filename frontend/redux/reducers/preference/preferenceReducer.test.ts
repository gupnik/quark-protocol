import * as types from '../../types';
import { preferenceReducer } from './preferenceReducer';

describe('Preference Reducer', () => {
  const initialState = {
    locale: 'en'
  };

  it('should return default state', () => {
    const newState = preferenceReducer(undefined, { type: undefined, payload: '' });
    expect(newState).toStrictEqual(initialState);
  });

  it('should return updated  state', () => {
    const newState = preferenceReducer(undefined, {
      type: types.SET_INTERFACE_LOCALE,
      payload: 'ru'
    });
    expect(newState).toStrictEqual({ locale: 'ru' });
  });
});
