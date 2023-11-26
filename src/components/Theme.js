import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTheme } from '../api/redux/actions';
import defaultBackground from '../resources/cloud9.png';
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
		let bgImage = defaultBackground;
		if (customImage) {
			bgImage = customImage;
		}
		return bgImage;
	};

	return (
		<div>
			<img
				src={loadBackground() ? loadBackground() : defaultBackground}
				alt='background'
				style={{
					width: '100vw',
					height: '100vh',
					position: 'fixed',
					backgroundColor: '#272727',
				}}
			/>
			{props.children}
		</div>
	);
};

export default connect(null, {
	loadTheme,
})(Theme);
