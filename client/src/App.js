import React, { Component , Suspense} from 'react';
import { Router,HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import jwt_decode from 'jwt-decode';
import setAuthToken from './views/components/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './views/actions/authActions';
 import { clearCurrentProfile } from './views/actions/UsersActions';
import './App.scss';
import { Provider } from 'react-redux';
import store from './views/store';
import Spinner from './views/components/common/Spinner';
import PrivateRoute from './views/components/common/PrivateRoute';
import Header from './containers/DefaultLayout/DefaultHeader';
import Footer from './containers/DefaultLayout/DefaultFooter';


import UserRegister from './views/components/auth/UserRegister';
import UserLogin from './views/components/auth/UserLogin';
import UserProfile from './views/components/user/UserProfile';

import {
  AppFooter,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/#/user-register';
  }
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <HashRouter>
          <React.Suspense fallback={<Spinner />}>
          <div className="App">
          {/* <AppHeader fixed>
            <Header />
        </AppHeader> */}
            <Switch>   
                <Route exact path="/user-register" name="Home"  component={UserRegister} /> 
                <Route exact path="/user-login" name="Home"  component={UserLogin} /> 
                <PrivateRoute exact path="/user-profile/" name="Home"  component={UserProfile} />
            </Switch>
            </div>
            <AppFooter fixed>
            <Footer />
        </AppFooter>
          </React.Suspense>
      </HashRouter>
      </Provider>
    );
  }
}

export default App;
