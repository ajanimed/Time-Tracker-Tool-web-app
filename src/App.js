import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
//import ProtectedRoute from './views/Pages/ProtectedRoute';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
import {connect} from 'react-redux';
import Logout from './views/Pages/Logout/Logout';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});
//Logout

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {

  render() {
    let routes =(
      <Switch>
        <Route exact path="/" name="Login Page" component={Login} />
        <Route exact path="/register" name="Register Page" component={Register} />
        <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} />
        <Redirect to="/"/>
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes =(
        <Switch>
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={DefaultLayout} />
          <Route path="/logout" name="Logout" component={Logout}/>
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Redirect to="/"/>
        </Switch>
      );
    }
    return (
      <HashRouter>
        {routes}
      </HashRouter>
    );
  }
}
let mapStateToProps = state =>{
  return{
    isAuthenticated: state.accessToken !==null
  };
};
export default connect(mapStateToProps,null)(App);
