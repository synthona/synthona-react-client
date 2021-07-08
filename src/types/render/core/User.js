import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';
import defaultHeader from '../../../resources/cloud9.png';

const User = (props) => {
	const nodeCard = () => {
		return (
			<li className='nodelist-item'>
				{props.renderHeader()}
				<Link
					to={`/profile/${props.node.path}`}
					replace
					onClick={(e) => {
						e.preventDefault();
						props.handleClick();
						window.location.replace(`/profile/${props.node.path}`);
					}}
					onContextMenu={(e) => {
						e.preventDefault();
						props.handleClick();
						window.location.replace(`/profile/${props.node.path}`);
					}}
				>
					<img
						src={props.node.preview || defaultHeader}
						alt={props.node.name}
						style={{
							objectFit: 'cover',
							minHeight: '100%',
							width: '100%',
						}}
					></img>
				</Link>
			</li>
		);
	};

	// how the node will appear in collections
	const collectionPreview = () => {
		return (
			<Fragment>
				<img
					src={props.node.preview || defaultHeader}
					alt={props.node.name}
					style={{
						objectFit: 'cover',
						minHeight: '100%',
						width: '100%',
					}}
				></img>
			</Fragment>
		);
	};

	const fullNode = () => {
		console.log(props.node);
		return (
			<div className='full-node-item'>
				<NodeCardHeaderFull />
				<Link to={`/profile/${props.node.path}`} /*target='_blank' */>
					<p>{props.node.name}</p>
				</Link>
			</div>
		);
	};

	const associationLink = () => {
		return (
			<Link
				to={`/profile/${props.node.path}`}
				onClick={(e) => props.handleAssociatonClick()}
				// target='blank'
			>
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

export { User };
