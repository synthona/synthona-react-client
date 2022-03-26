import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { message } from 'antd';
import './ElectronSearch.less';

// this component sends "search strings" to electron findInPage
class ElectronSearch extends Component {
	constructor(props) {
		super(props);
		this.searchInput = React.createRef();
	}

	componentWillUnmount() {
		console.log('search unmounting');
		window.api.send('toMain', { action: 'hide-search' });
	}

	handleElectronSearch = (e) => {
		window.api.send('toMain', { action: 'search', query: e.target.value });

		setTimeout(() => {
			this.searchInput.current.focus();
		}, 100);
	};

	render() {
		return (
			<div className='electron-search'>
				<input
					type='text'
					autoFocus
					ref={this.searchInput}
					id='electron-search-input'
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							this.handleElectronSearch(e);
						}
					}}
				></input>
			</div>
		);
	}
}

export default connect(null, {})(ElectronSearch);
