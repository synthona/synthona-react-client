// import the default node configurations
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
	updateLinkStrength,
	hideComponent,
	launchFileNode,
	openFileInExplorer,
	updateNode,
} from '../../api/redux/actions';
import { Text, Image, Url, File, Audio, Package, Zip, Collection, User } from './core/index';
import NodeCardHeader from '../../components/elements/node/NodeCardHeader';

class NodeRenderer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showHeader: true,
		};
	}
	// increment linkstrength if there is an activeNode
	handleNodeClick = () => {
		const nodeUUID = this.props.node.uuid;
		if (this.props.activeNode) {
			const linkedNodeUUID = this.props.activeNode.uuid;
			// increment the linkStrength on the server
			this.props.updateLinkStrength(nodeUUID, linkedNodeUUID);
		}
	};

	// increment linkstrength on association sider clicks
	handleAssociatonClick = () => {
		this.props.hideComponent('associationSider');
		if (this.props.siderNodeUUID && this.props.node.uuid) {
			const siderUUID = this.props.siderNodeUUID;
			const linkedNodeUUID = this.props.node.uuid;
			// increment the linkStrength on the server
			this.props.updateLinkStrength(siderUUID, linkedNodeUUID);
		}
	};

	toggleHeader = () => {
		if (this.state.showHeader) {
			this.setState({ showHeader: false });
		} else {
			this.setState({ showHeader: true });
		}
	};

	renderHeader = () => {
		if (this.state.showHeader) {
			return <NodeCardHeader node={this.props.node} />;
		} else {
			return;
		}
	};

	renderNode = () => {
		switch (this.props.type) {
			case 'text':
				return (
					<Text
						element={this.props.element}
						node={this.props.node}
						handleClick={this.handleNodeClick}
						handleAssociatonClick={this.handleAssociatonClick}
					/>
				);
			case 'image':
				return (
					<Image
						element={this.props.element}
						node={this.props.node}
						handleClick={this.handleNodeClick}
						handleAssociatonClick={this.handleAssociatonClick}
						updateNode={this.props.updateNode}
						toggleHeader={this.toggleHeader}
						renderHeader={this.renderHeader}
						launchExplorer={this.props.openFileInExplorer}
						launchFile={this.props.launchFileNode}
					/>
				);
			case 'url':
				return (
					<Url
						element={this.props.element}
						node={this.props.node}
						handleClick={this.handleNodeClick}
						handleAssociatonClick={this.handleAssociatonClick}
						toggleHeader={this.toggleHeader}
						renderHeader={this.renderHeader}
					/>
				);
			case 'file':
				return (
					<File
						element={this.props.element}
						node={this.props.node}
						updateNode={this.props.updateNode}
						handleClick={this.handleNodeClick}
						handleAssociatonClick={this.handleAssociatonClick}
						launchFile={this.props.launchFileNode}
						launchExplorer={this.props.openFileInExplorer}
					/>
				);
			case 'audio':
				return (
					<Audio
						element={this.props.element}
						node={this.props.node}
						updateNode={this.props.updateNode}
						handleClick={this.handleNodeClick}
						handleAssociatonClick={this.handleAssociatonClick}
						launchFile={this.props.launchFileNode}
					/>
				);
			case 'package':
				return (
					<Package
						element={this.props.element}
						node={this.props.node}
						updateNode={this.props.updateNode}
						handleClick={this.handleNodeClick}
						handleAssociatonClick={this.handleAssociatonClick}
						launchExplorer={this.props.openFileInExplorer}
					/>
				);
			case 'zip':
				return (
					<Zip
						element={this.props.element}
						node={this.props.node}
						updateNode={this.props.updateNode}
						handleClick={this.handleNodeClick}
						handleAssociatonClick={this.handleAssociatonClick}
						launchExplorer={this.props.openFileInExplorer}
					/>
				);
			case 'collection':
				return (
					<Collection
						element={this.props.element}
						node={this.props.node}
						handleClick={this.handleNodeClick}
						handleAssociatonClick={this.handleAssociatonClick}
						toggleHeader={this.toggleHeader}
						renderHeader={this.renderHeader}
					/>
				);
			case 'user':
				return (
					<User
						element={this.props.element}
						node={this.props.node}
						handleClick={this.handleNodeClick}
						handleAssociatonClick={this.handleAssociatonClick}
						toggleHeader={this.toggleHeader}
						renderHeader={this.renderHeader}
					/>
				);
			default:
				return;
		}
	};

	render() {
		return <Fragment>{this.renderNode()}</Fragment>;
	}
}

export default connect(null, {
	updateLinkStrength,
	hideComponent,
	launchFileNode,
	openFileInExplorer,
	updateNode,
})(NodeRenderer);
