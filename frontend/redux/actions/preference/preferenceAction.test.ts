import * as types from '../../types';
import * as actions from './preferenceAction';

describe('Preference Actions', () => {
  it('should return action for setting interface locale', () => {
    const payload = 'payload';
    const expectedAction = {
      type: types.SET_INTERFACE_LOCALE,
      payload
    };
    expect(actions.setInterfaceLocale(payload)).toEqual(expectedAction);
  });

  it('should return action for getting interface locale', () => {
    const expectedAction = {
      type: types.GET_INTERFACE_LOCALE
    };
    expect(actions.getInterfaceLocale()).toEqual(expectedAction);
  });
});
