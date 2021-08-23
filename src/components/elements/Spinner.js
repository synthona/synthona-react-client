import React from 'react';
import { Layout } from 'antd';
import { Spin } from 'antd';

const Spinner = (props) => {
	const spinnerAlignment = () => {
		if (props.alignment === 'top') {
			return 'start';
		} else {
			return 'center';
		}
	};

	return (
		<Layout>
			<Spin
				style={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: spinnerAlignment(),
				}}
				className='loading-spinner'
				size='large'
			></Spin>
		</Layout>
	);
};

export default Spinner;
