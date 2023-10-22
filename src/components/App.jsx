import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Signin } from './Signin';
import { Header } from './Header';
import { ThemeProvider, theme, CSSReset, ToastProvider } from '@blockstack/ui';
import SmartContractList  from './SmartContractList';
import { userSession } from '../auth';
import './styles.css';
import {NewContract} from "./NewContract";

export default class App extends Component {
  state = {
    userData: null,
  };

  handleSignOut(e) {
    e.preventDefault();
    this.setState({ userData: null });
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <div className="site-wrapper">
              <div className="site-wrapper-inner">
                <Header />
                <Router>
                  <Switch>
                    <Route exact path="/" render={() => userSession.isUserSignedIn() ? <Redirect to="/contracts" /> : <Signin />} />
                    <Route path="/contracts"  component={SmartContractList} />
                    <Route path="/new-contract" component={NewContract} />
                  </Switch>
                </Router>
              </div>
            </div>
          </ToastProvider>
          <CSSReset />
        </ThemeProvider>
    );
  }


  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.history.replaceState({}, document.title, '/');
        this.setState({ userData: userData });
      });
    } else if (userSession.isUserSignedIn()) {
      this.setState({ userData: userSession.loadUserData() });
    }
  }
}
