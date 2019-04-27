import * as actionTypes from './actions.js';

let initialState = {
  user:{},
  accessToken:null
};


let authReducer = (state = initialState , action ) => {
  switch(action.type){
    case actionTypes.SAVE_USER:
        return{
          ...state,
          user:action.user,
          accessToken:action.token
        };
    case actionTypes.LOGOUT_USER:
      return{
        ...state,
        user:{},
        accessToken:null
      };
    default:
        return state;
  }
};


export default authReducer;


