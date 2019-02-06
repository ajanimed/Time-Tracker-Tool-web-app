import axios from 'axios';
import store from './store';
let authorizationHeader = 'Bearer '+store.getState().accessToken;
let instance = axios.create({

  baseURL: 'https://timetrackertoolbackend.herokuapp.com',
  //headers: {Authorization: store.getState().accessToken ? `Token ${store.getState().accessToken}` : '',}
  headers: {
    'Authorization': authorizationHeader
  }
  /*headers: {
    Authorization: store.getState().accessToken ? `Bearer ${store.getState().accessToken}` : '',
  },*/

});

//instance.defaults.headers.common['Authorization'] = 'Bearer '+ store.getState().accessToken;
export default instance;
