import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTheme } from '../api/redux/actions';
import test from '../resources/nice-star.gif';

// theme wrapper component
const Theme = (props) => {
	useEffect(() => {
		// go ahead and load the theme
		props.loadTheme();
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
