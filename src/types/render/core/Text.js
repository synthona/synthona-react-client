import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';
import NodeCardHeader from '../../../components/elements/node/NodeCardHeader';

const Text = (props) => {
	const nodeCard = () => {
		return (
			<li className='nodelist-item'>
				<NodeCardHeader node={props.node} />
				<Link
					to={`/edit/text/${props.node.uuid}`}
					onClick={(e) => {
						e.preventDefault();
						// prevent the text from being selected
						window.getSelection().removeAllRanges();
						window.location.replace(`/associations/${props.node.uuid}`);
					}}
					onContextMenu={(e) => {
						e.preventDefault();
						props.handleClick();
						window.getSelection().removeAllRanges();
						window.location.replace(`/edit/text/${props.node.uuid}`);
					}}
				>
					<p>{props.node.preview}</p>
				</Link>
			</li>
		);
	};

	// how the node will appear in collections
	const collectionPreview = () => {
		return (
			<Fragment>
				<p>{props.node.preview}</p>
			</Fragment>
		);
	};

	const fullNode = () => {
		return (
			<div className='full-node-item'>
				<NodeCardHeaderFull />
				<Link
					to={`/edit/text/${props.node.uuid}`}
					onContextMenu={(e) => {
						window.getSelection().removeAllRanges();
					}} /*target='_blank' */
				>
					<p>{props.node.preview}</p>
				</Link>
			</div>
		);
	};

	const associationLink = () => {
		return (
			<Link
				to={`/edit/text/${props.node.uuid}`}
				onClick={(e) => props.handleAssociatonClick()}
				// target='_blank'
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

export { Text };
