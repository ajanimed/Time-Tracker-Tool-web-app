//import {createStore,applyMiddleware, compose} from 'redux';
import {createStore} from 'redux';
import authReducer from "./store/authReducer";
//import { persistStore, persistReducer } from 'redux-persist';
//mport ReduxThunk from 'redux-thunk';
//mport reduxReset  from 'redux-reset';
//import storage from 'redux-persist/lib/storage';

/*let persistConfig = {
  key: 'root',
  storage,
};

const enHanceCreateStore = compose(
  applyMiddleware(ReduxThunk),
  reduxReset()
)(createStore);

let persistedReducer = persistReducer(persistConfig, authReducer);

let store = enHanceCreateStore(persistedReducer);
let persistor = persistStore(store);

let storee = {
  store:store,
  persistor:persistor
};*/
let store = createStore(authReducer);
export default store;

