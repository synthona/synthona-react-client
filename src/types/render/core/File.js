import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
// custom code
import NodeCardHeaderFull from "../../../components/elements/node/NodeCardHeaderFull";
import NodeCardHeader from "../../../components/elements/node/NodeCardHeader";
import missingFileImage from "../../../resources/missing-file.png";
import { isElectron } from "../../../utils/environment";

const File = (props) => {
	let fileLoadError = false;

	// select a replacement file
	const selectLocalFile = (e) => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.click();
		// Listen for uploading local file, then save to server
		input.onchange = async () => {
			let file = input.files[0];
			await props.updateNode({ uuid: props.node.uuid, path: file.path });
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
			props.handleClick();
			window.location.replace(`/associations/${props.node.uuid}`);
		} else {
			e.preventDefault();
			window.location.replace(`/associations/${props.node.uuid}`);
		}
	};

	const onContextAction = (e) => {
		if (!fileLoadError) {
			e.preventDefault();
			props.handleClick();
			window.getSelection().removeAllRanges();
			props.launchFile(props.node.uuid);
		} else if (isElectron()) {
			e.preventDefault();
			window.getSelection().removeAllRanges();
			selectLocalFile(e);
		} else {
			e.preventDefault();
			window.location.replace(`/associations/${props.node.uuid}`);
		}
	};

	const onFullCardAction = (e) => {
		if (!fileLoadError) {
			e.preventDefault();
			props.handleClick();
			props.launchFile(props.node.uuid);
		} else if (isElectron()) {
			e.preventDefault();
			selectLocalFile(e);
		} else {
			e.preventDefault();
			window.location.replace(`/associations/${props.node.uuid}`);
		}
	};

	const renderPreview = (full) => {
		if (props.node.path === null) {
			fileLoadError = true;
			props.node.preview = missingFileImage;
		}
		if (props.node.preview) {
			return (
				<Fragment>
					<img
						src={props.node.preview}
						alt={props.node.name}
						style={{
							objectFit: "cover",
							height: full ? "100%" : "13.2rem",
							width: "100%",
						}}
					></img>
				</Fragment>
			);
		} else {
			return (
				<Icon
					type={"file"}
					style={{
						color: "white",
						backgroundColor: props.theme.cardBodyColor,
						height: full ? "100%" : "13.2rem",
					}}
					theme="filled"
					className="node-card-icon"
				/>
			);
		}
	};

	const nodeCard = () => {
		return (
			<li className="nodelist-item">
				<NodeCardHeader node={props.node} />
				<Link
					to={`/associations/${props.node.uuid}`}
					onClick={(e) => onClickAction(e)}
					onContextMenu={(e) => onContextAction(e)}
					style={{
						width: "100%",
						backgroundColor: props.theme.cardBodyColor,
					}}
				>
					{renderPreview()}
				</Link>
			</li>
		);
	};

	// how the node will appear in collections
	const collectionPreview = () => {
		return <Fragment>{renderPreview()}</Fragment>;
	};

	const fullNode = () => {
		return (
			<div className="full-node-item">
				<NodeCardHeaderFull />
				<Link
					to={`/associations/${props.node.uuid}`}
					onClick={(e) => onFullCardAction(e)}
					onContextMenu={(e) => onContextAction(e)}
				>
					<Fragment>{renderPreview(true)}</Fragment>
				</Link>
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
			case "card":
				return <Fragment>{nodeCard()}</Fragment>;
			case "preview":
				return <Fragment>{collectionPreview()}</Fragment>;
			case "full":
				return <Fragment>{fullNode()}</Fragment>;
			case "association-link":
				return <Fragment>{associationLink()}</Fragment>;
			default:
				return;
		}
	};

	return <Fragment>{renderNode()}</Fragment>;
};

export { File };
