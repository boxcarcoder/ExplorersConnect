import React, { Fragment } from 'react';
import './scss/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddDestinations from './components/profile-forms/AddDestinations';
import AddGears from './components/profile-forms/AddGears';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/Profile';
import Posts from './components/posts/Posts';

//redux
import { Provider } from 'react-redux';
import store from './store';

// To verify token at each initial load,
// aka to verify the user is the logged in user at each initial load
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { useEffect } from 'react';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //the effect is run only after the first render

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/Register' component={Register} />
              <Route exact path='/Login' component={Login} />
              <Route exact path='/Profiles' component={Profiles} />
              <Route exact path='/Profile/:id' component={Profile} />
              <Route exact path='/Posts' component={Posts} />
              <PrivateRoute exact path='/Dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-destinations'
                component={AddDestinations}
              />
              <PrivateRoute exact path='/add-gears' component={AddGears} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
