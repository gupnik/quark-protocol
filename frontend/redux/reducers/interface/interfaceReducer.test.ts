import * as types from '../../types';
import { interfaceReducer } from './interfaceReducer';

describe('Preference Reducer', () => {
  const initialState = {
    desktopLeftDrawerOpen: false,
    interfaceMode: 'light'
  };

  it('should return default state', () => {
    const newState = interfaceReducer(undefined, { type: undefined, payload: false });
    expect(newState).toStrictEqual(initialState);
  });

  it('should return updated updated state on setting drawer status', () => {
    const newState = interfaceReducer(undefined, {
      type: types.SET_DESKTOP_DRAWER_STATUS,
      payload: true
    });
    expect(newState).toStrictEqual({ ...initialState, desktopLeftDrawerOpen: true });
  });

  it('should return updated updated state on setting interface mode', () => {
    const newState = interfaceReducer(undefined, {
      type: types.SET_INTERFACE_MODE,
      payload: 'dark'
    });
    expect(newState).toStrictEqual({ ...initialState, interfaceMode: 'dark' });
  });
});
