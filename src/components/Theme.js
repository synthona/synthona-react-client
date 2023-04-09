import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTheme } from '../api/redux/actions';
import test from '../resources/nice-star.gif';
import { loadClientConfig } from '../utils/config';

// theme wrapper component
const Theme = (props) => {
	useEffect(() => {
		// go ahead and load the theme
		props.loadTheme();
		// lets also reload config if its not set for some reason
		let localConfigVersion = localStorage.getItem('client-config-version');
		if (!localConfigVersion) {
			loadClientConfig();
		}
	});

	const loadBackground = () => {
		let customImage = localStorage.getItem('background-image');
		let bgImage = test;
		if (customImage) {
			bgImage = customImage;
		}
		return bgImage;
	};

	return (
		<div
			style={{
				backgroundImage: `url(${loadBackground()})`,
				backgroundColor: '#272727',
				backgroundSize: '100vw 107vh',
				backgroundRepeat: 'repeat',
			}}
		>
			{props.children}
		</div>
	);
};

export default connect(null, {
	loadTheme,
})(Theme);
