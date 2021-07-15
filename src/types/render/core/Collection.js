import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
// custom code
import NodeRenderer from '../NodeRenderer';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';

const Collection = (props) => {
	const onCollectionContextMenu = (e) => {
		// e.preventDefault();
		// window.location.replace(`/associations/${props.node.uuid}`);
	};

	const onCollectionClick = (e) => {
		e.preventDefault();
		props.handleClick();
		window.location.replace(`/associations/${props.node.uuid}`);
	};

	const nodeCard = () => {
		// create the collection grid
		var previewCount = 0;
		var collectionPreview = null;
		var preview = null;
		// check if the collection has a preview
		if (props.node.preview) {
			preview = JSON.parse(props.node.preview);
			previewCount = preview.length;
		}
		// create the different grid types
		switch (previewCount) {
			case 0:
				collectionPreview = (
					<li className='nodelist-item'>
						{props.renderHeader()}
						<Link
							to={`/associations/${props.node.uuid}`}
							onClick={(e) => onCollectionClick(e)}
							onContextMenu={(e) => onCollectionContextMenu(e)}
						>
							<Icon type={'branches'} theme='outlined' className='node-card-icon' />
						</Link>
					</li>
				);
				return collectionPreview;
			case 1:
				collectionPreview = (
					<li className='nodelist-item'>
						{props.renderHeader()}
						<Link
							to={`/associations/${props.node.uuid}`}
							onClick={(e) => onCollectionClick(e)}
							onContextMenu={(e) => onCollectionContextMenu(e)}
						>
							<NodeRenderer type={preview[0].type} element={'preview'} node={preview[0]} />
						</Link>
					</li>
				);
				return collectionPreview;
			case 2:
				collectionPreview = (
					<li className='nodelist-item nodelist-item-collection'>
						{props.renderHeader()}
						<Link
							to={`/associations/${props.node.uuid}`}
							onClick={(e) => onCollectionClick(e)}
							onContextMenu={(e) => onCollectionContextMenu(e)}
						>
							<ul className='nodelist-collection-grid'>
								<li className='nodelist-collection-grid-full-width'>
									<NodeRenderer type={preview[0].type} element={'preview'} node={preview[0]} />
								</li>
								<li className='nodelist-collection-grid-full-width'>
									<NodeRenderer type={preview[1].type} element={'preview'} node={preview[1]} />
								</li>
							</ul>
						</Link>
					</li>
				);
				return collectionPreview;
			case 3:
				collectionPreview = (
					<li className='nodelist-item nodelist-item-collection'>
						{props.renderHeader()}
						<Link
							to={`/associations/${props.node.uuid}`}
							onClick={(e) => onCollectionClick(e)}
							onContextMenu={(e) => onCollectionContextMenu(e)}
						>
							<ul className='nodelist-collection-grid'>
								<li className='nodelist-collection-grid-full-width'>
									<NodeRenderer type={preview[0].type} element={'preview'} node={preview[0]} />
								</li>
								<li>
									<NodeRenderer type={preview[1].type} element={'preview'} node={preview[1]} />
								</li>
								<li>
									<NodeRenderer type={preview[2].type} element={'preview'} node={preview[2]} />
								</li>
								<li></li>
							</ul>
						</Link>
					</li>
				);
				return collectionPreview;
			case 4:
				collectionPreview = (
					<li className='nodelist-item nodelist-item-collection'>
						{props.renderHeader()}
						<Link
							to={`/associations/${props.node.uuid}`}
							onClick={(e) => onCollectionClick(e)}
							onContextMenu={(e) => onCollectionContextMenu(e)}
						>
							<ul className='nodelist-collection-grid'>
								<li>
									<NodeRenderer type={preview[0].type} element={'preview'} node={preview[0]} />
								</li>
								<li>
									<NodeRenderer type={preview[1].type} element={'preview'} node={preview[1]} />
								</li>
								<li>
									<NodeRenderer type={preview[2].type} element={'preview'} node={preview[2]} />
								</li>
								<li>
									<NodeRenderer type={preview[3].type} element={'preview'} node={preview[3]} />
								</li>
							</ul>
						</Link>
					</li>
				);
				return collectionPreview;
			default:
				return;
		}
	};

	const fullNode = () => {
		return (
			<div className='full-node-item'>
				<NodeCardHeaderFull />
			</div>
		);
	};

	const associationLink = () => {
		return (
			<Link
				to={`/associations/${props.node.uuid}`}
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

export { Collection };
