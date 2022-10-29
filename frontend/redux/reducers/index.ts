import { combineReducers } from 'redux';
import { preferenceReducer } from './preference/preferenceReducer';
import { interfaceReducer } from './interface/interfaceReducer';
import { userReducer } from './user/userReducer';

const rootReducer = combineReducers({
  preference: preferenceReducer,
  interface: interfaceReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
