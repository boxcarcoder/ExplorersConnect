import React, { Fragment } from 'react';
import './scss/App.scss';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

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
  }, []); //the effect is only after the first render

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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
