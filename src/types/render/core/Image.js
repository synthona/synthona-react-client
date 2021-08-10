import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';
import missingFileImage from '../../../resources/missing-file.png';
import { isElectron } from '../../../utils/environment';

const Image = (props) => {
	let fileLoadError = false;

	const onFileLoadError = (e) => {
		if (props.node.isFile) {
			e.target.src = missingFileImage;
			fileLoadError = true;
		}
	};

	// select an image.
	const selectLocalFile = (e) => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', ['image/gif', 'image/jpg', 'image/jpeg', 'image/png']);
		input.click();
		// Listen for uploading local file, then save to server
		input.onchange = async () => {
			let file = input.files[0];
			await props.updateNode({ uuid: props.node.uuid, path: file.path, preview: file.path });
			window.location.reload();
		};
	};

	const onClickAction = (e) => {
		if (!fileLoadError) {
			e.preventDefault();
			props.handleClick();
			window.location.replace(`/associations/${props.node.uuid}`);
		} else if (isElectron()) {
			e.preventDefault();
			selectLocalFile(e);
		} else {
			e.preventDefault();
			window.location.replace(`/associations/${props.node.uuid}`);
		}
	};

	// const onContextAction = (e) => {
	// 	if (!fileLoadError && props.node.isFile) {
	// 		e.preventDefault();
	// 		props.handleClick();
	// 		props.launchFile(props.node.uuid);
	// 		// window.location.replace(`/associations/${props.node.uuid}`);
	// 	} else if (isElectron() && props.node.isFile) {
	// 		e.preventDefault();
	// 		selectLocalFile(e);
	// 	} else {
	// 		e.preventDefault();
	// 		window.location.replace(`/associations/${props.node.uuid}`);
	// 	}
	// };

	const onFullCardAction = (e) => {
		if (!fileLoadError && props.node.isFile) {
			e.preventDefault();
			props.handleClick();
			props.launchFile(props.node.uuid);
		} else if (isElectron() && props.node.isFile) {
			e.preventDefault();
			selectLocalFile(e);
		} else {
			e.preventDefault();
			window.location.replace(`/associations/${props.node.uuid}`);
		}
	};

	const nodeCard = () => {
		if (props.node.path === null && props.node.isFile) {
			fileLoadError = true;
			props.node.preview = missingFileImage;
		}
		return (
			<li className='nodelist-item'>
				{props.renderHeader()}
				<Link
					id='image-node-card-link'
					to={`/associations/${props.node.uuid}`}
					onClick={(e) => {
						onClickAction(e);
					}}
					// onContextMenu={(e) => {
					// 	// onContextAction(e);
					// }}
				>
					<Fragment>
						<img
							src={props.node.preview}
							alt={props.node.name}
							onError={(e) => onFileLoadError(e)}
							style={{
								objectFit: 'cover',
								minHeight: '100%',
								width: '100%',
							}}
						></img>
					</Fragment>
				</Link>
			</li>
		);
	};

	// how the node will appear in collections
	const collectionPreview = () => {
		if (props.node.path === null && props.node.isFile) {
			fileLoadError = true;
			props.node.preview = missingFileImage;
		}
		return (
			<Fragment>
				<img
					src={props.node.preview}
					alt={props.node.name}
					onError={(e) => onFileLoadError(e)}
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
		if (props.node.path === null && props.node.isFile) {
			fileLoadError = true;
			props.node.preview = missingFileImage;
		}
		return (
			<div className='full-node-item'>
				<NodeCardHeaderFull />
				<img
					src={props.node.preview}
					alt={props.node.name}
					onError={(e) => onFileLoadError(e)}
					style={{ cursor: 'pointer' }}
					onClick={(e) => {
						onFullCardAction(e);
					}}
				></img>
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

export { Image };
