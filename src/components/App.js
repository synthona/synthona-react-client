import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// custom code
import '../app.less';
import { isElectron } from '../utils/environment';
import { isAuthenticated } from '../api/redux/actions';
// custom components
import Login from './layouts/Login';
import ForgotPassword from './layouts/ForgotPassword';
import Home from './layouts/Home';
import Profile from './layouts/Profile';
import Options from './layouts/Options';
import Activity from './layouts/Activity';
import QuillEditor from './QuillEditor/QuillEditor';
import Collections from './layouts/Collections';
import Spinner from './elements/Spinner';
import CreateAccount from './layouts/CreateAccount';
import AssociationBrowser from './layouts/AssociationBrowser';
import GraphBrowser from './layouts/GraphBrowser';
import Help from './layouts/Help';
import Pins from './layouts/Pins';
// special
import ElectronMessage from './electron/ElectronMessage';

class App extends Component {
	componentDidMount() {
		if (this.props.isAuth === null) {
			this.props.isAuthenticated();
		}
		// if (window.api) {
		// 	window.api.receive('fromMain', (data) => {
		// 		console.log(data);
		// 	});
		// }
		// window.api.send('toMain', 'some data');
	}

	renderElectronMessage = () => {
		// initialize the electron-message module
		// if this is an electron environment
		if (isElectron()) {
			return <ElectronMessage />;
		}
	};

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
					<Route path='/edit/profile' exact component={Options} />
					<Route path='/associations/:uuid' exact component={AssociationBrowser} />
					<Route path='/graph/:uuid?' exact component={GraphBrowser} />
					<Route path='/pins' exact component={Pins} />
					<Route path='/help' exact component={Help} />
				</Switch>
			);
		} else if (this.props.isFetchingAuth) {
			routes = <Spinner />;
		} else {
			routes = (
				<Switch>
					<Route path='/' exact component={Login} />
					<Route path='/create-account' exact component={CreateAccount} />
					<Route path='/forgot-password' exact component={ForgotPassword} />
					<Route component={Login} />
				</Switch>
			);
		}
		return (
			<div>
				{this.renderElectronMessage()}
				{routes}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		isFetchingAuth: state.auth.isFetching,
		isAuth: state.auth.isAuth,
	};
};

export default connect(mapStateToProps, { isAuthenticated })(App);
