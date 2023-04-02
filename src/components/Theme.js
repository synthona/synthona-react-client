import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTheme } from '../api/redux/actions';

// theme wrapper component
const Theme = (props) => {
	useEffect(() => {
		// go ahead and load the theme
		props.loadTheme();
	});

	return <div>{props.children}</div>;
};

export default connect(null, {
	loadTheme,
})(Theme);
