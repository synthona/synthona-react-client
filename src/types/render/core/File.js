import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';
import NodeCardHeader from '../../../components/elements/node/NodeCardHeader';

const File = (props) => {
	const renderPreview = () => {
		if (props.node.preview) {
			return (
				<Fragment>
					<img
						src={props.node.preview}
						alt={props.node.name}
						style={{
							objectFit: 'cover',
							minHeight: '100%',
							width: '100%',
						}}
					></img>
				</Fragment>
			);
		} else {
			return (
				<Icon
					type={'thunderbolt'}
					style={{ color: 'white' }}
					theme='filled'
					className='node-card-icon'
				/>
			);
		}
	};

	const nodeCard = () => {
		return (
			<li className='nodelist-item'>
				<NodeCardHeader node={props.node} />
				<Link
					to={`/associations/${props.node.uuid}`}
					onClick={(e) => props.handleClick()}
					onContextMenu={(e) => {
						e.preventDefault();
						props.launchFile(props.node.uuid);
					}}
				>
					{renderPreview()}
				</Link>
			</li>
		);
	};

	// how the node will appear in collections
	const collectionPreview = () => {
		return (
			<Fragment>
				<Icon type={'file'} theme='outlined' className='node-card-icon' />
			</Fragment>
		);
	};

	const fullNode = () => {
		return (
			<div className='full-node-item'>
				<NodeCardHeaderFull />
				<Link
					to={`/associations/${props.node.uuid}`}
					onClick={(e) => {
						e.preventDefault();
						props.handleClick();
						props.launchFile(props.node.uuid);
					}}
				>
					<Fragment>{renderPreview()}</Fragment>
				</Link>
			</div>
		);
	};

	const associationLink = () => {
		return (
			<Link
				to={`/associations/${props.node.uuid}`}
				onClick={(e) => props.handleAssociatonClick()}
				target='_blank'
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

export { File };
