import * as actionTypes from './actions.js';


let initialState = {
  user:{},
  accessToken:null
  /*user: {
    photo: "profiles-photos/5c136f28b1827c321c6d08a1/22489751_1716552911689652_922429967662335250_n.jpg",
    _id: "5c136f28b1827c321c6d08a1",
    name: "Khalil",
    surname: "Ben Jebara",
    tel: "+79805306219",
    email: "khalil@gmail.com",
    password: "sha1$f066a673$1$6653b939692934c6501ca0dd5c82595f21e8d4a1",
    created_at: "2018-12-14T08:51:52.788Z",
    __v: 0
  },
  accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmYxNTk2NWM3ODkxZTE5MjA0NDAyODUiLCJuYW1lIjoiVGVzdCIsInN1cm5hbWUiOiJUZXN0IiwidGVsIjoiOTgwNTMwNjIxOSIsImVtYWlsIjoiYWphbmkubWVkMDA3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic2hhMSQxNGQwMzZkOSQxJGI0ZjFjYzQ2MmYxZTk2ZjQ5M2MxMmYyMTA3OWM5MmNmZGIzZTgyNDkiLCJjcmVhdGVkX2F0IjoiMjAxOC0xMS0xOFQxMjoyMTo1Ny4wNjJaIiwiX192IjowLCJpYXQiOjE1NDQxNzY1ODF9.N2d82e4oAkefEuFFbLcXkN_UjVsASZgU-8Tu7-pJGmQ"*/
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
        user:{}
      };
    default:
        return state;
  }
};


export default authReducer;


