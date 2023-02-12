import React, { Fragment } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';
import missingFileImage from '../../../resources/missing-file.png';

const Url = (props) => {
	const urlIcon = 'bulb';

	const renderFullCardPreview = () => {
		// if the URL is a youtube embed, lets actually load the video here
		if (props.node.path.includes('https://www.youtube.com/embed/')) {
			return (
				<iframe
					title={props.node.name}
					src={props.node.path}
					style={{ width: '100%', height: '100vh', border: 'none' }}
					allowFullScreen
					sandbox={
						props.node.path.includes('https://www.youtube.com/embed/')
							? 'allow-scripts allow-same-origin allow-popups'
							: ''
					}
					id='node-card-iframe'
				></iframe>
			);
		}
		// for anything else just display a link out to it
		else {
			return (
				<a
					href={props.node.path}
					target='_blank'
					rel='noopener noreferrer'
					// style={{ width: '100%' }}
				>
					{renderPreview()}
				</a>
			);
		}
	};

	const renderPreview = () => {
		if (props.node.preview) {
			return (
				<img
					src={props.node.preview}
					alt={props.node.name}
					style={{
						objectFit: 'cover',
						// minHeight: '100%',
						// width: '100%',
					}}
					onError={(e) => (e.target.src = missingFileImage)}
				></img>
			);
		} else {
			return (
				<Icon
					type={urlIcon}
					// type={'star'}
					theme='outlined'
					style={{
						fontSize: '5rem',
						color: '#b8b8b8',
						display: 'block',
						textAlign: 'center',
						padding: '4.3rem 3.3rem 3.3rem',
						height: '100%',
					}}
				/>
			);
		}
	};

	const nodeCard = () => {
		return (
			<li className='nodelist-item'>
				{props.renderHeader()}
				<a
					href={`/associations/${props.node.uuid}`}
					rel='noopener noreferrer'
					onClick={(e) => {
						e.preventDefault();
						props.handleClick();
						window.location.replace(`/associations/${props.node.uuid}`);
					}}
					onContextMenu={(e) => {
						e.preventDefault();
						// props.toggleHeader();
						window.open(props.node.path, '_blank');
					}}
					style={{ width: '100%' }}
				>
					{renderPreview()}
				</a>
			</li>
		);
	};

	// how the node will appear in collections
	const collectionPreview = () => {
		if (props.node.preview) {
			return (
				<Fragment>
					<img
						src={props.node.preview}
						alt={props.node.name}
						style={{
							objectFit: 'cover',
							width: '100%',
						}}
					></img>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Icon type={urlIcon} theme='outlined' className='node-card-icon' />
				</Fragment>
			);
		}
	};

	const fullNode = () => {
		return (
			<div className='full-node-item'>
				<NodeCardHeaderFull />
				{renderFullCardPreview()}
				{/* <p>{props.node.comment}</p> */}
			</div>
		);
	};

	const associationLink = () => {
		return (
			<Link to={`/associations/${props.node.uuid}`} onClick={(e) => props.handleAssociatonClick()}>
				{props.node.name}
			</Link>
		);
	};

	// render the requested element
	const renderNode = () => {
		switch (props.element) {
			case 'card':
				return <Fragment>{nodeCard()}</Fragment>;
			case 'preview':
				return <Fragment>{collectionPreview()}</Fragment>;
			case 'full':
				return <Fragment>{fullNode()}</Fragment>;
			case 'association-link':
				return <Fragment>{associationLink()}</Fragment>;
			default:
				return;
		}
	};

	return <Fragment>{renderNode()}</Fragment>;
};

export { Url };
