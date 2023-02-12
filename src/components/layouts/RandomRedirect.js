import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { getRandomNode } from '../../api/redux/actions';
// custom code

class RandomRedirect extends Component {
	componentDidMount() {
		localStorage.setItem('flash', false);
		setInterval(this.props.getRandomNode(), 50);
	}

	render() {
		return <Layout style={{ height: '100vh' }}></Layout>;
	}
}

export default connect(null, { getRandomNode })(RandomRedirect);
