import React, { Fragment } from 'react';
import './scss/App.scss';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Switch>
          <Route exact path='/Register' component={Register} />
          <Route exact path='/Login' component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
