import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// custom code
import '../app.less';
import { refreshAuth } from '../redux/actions';
// custom components
import Login from './layouts/Login';
import Home from './layouts/Home';
import Profile from './layouts/Profile';
import EditProfile from './layouts/EditProfile';
import Activity from './layouts/Activity';
import QuillEditor from './QuillEditor/QuillEditor';
import Collections from './layouts/Collections';
import Spinner from './elements/Spinner';
import CreateAccount from './layouts/CreateAccount';
import AssociationBrowser from './layouts/AssociationBrowser';

class App extends Component {
  componentDidMount() {
    if (this.props.isAuth == null) {
      this.props.refreshAuth();
    }
  }
  render() {
    let routes;

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/profile/:username' exact component={Profile} />
          <Route path='/activity' exact component={Activity} />
          <Route path='/collections' exact component={Collections} />
          <Route path='/edit/text/:uuid' exact component={QuillEditor} />
          <Route path='/edit/profile' exact component={EditProfile} />
          <Route path='/associations/:uuid' exact component={AssociationBrowser} />
        </Switch>
      );
    } else if (this.props.isFetchingAuth) {
      routes = <Spinner />;
    } else {
      routes = (
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/signup' exact component={CreateAccount} />
        </Switch>
      );
    }
    return <Fragment>{routes}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isFetchingAuth: state.auth.isFetching,
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { refreshAuth })(App);
