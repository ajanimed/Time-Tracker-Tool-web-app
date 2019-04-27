import {createStore} from 'redux';
import authReducer from "./store/authReducer";
import {saveState ,loadState} from './localStorage';
import {throttle} from 'lodash';
const persistedState = loadState();
let store = createStore(authReducer,persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

store.subscribe(throttle(() => {
  saveState({
    user: store.getState().user,
    accessToken:store.getState().accessToken
  });
}, 1000));

export default store;

