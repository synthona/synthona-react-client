// import the default node configurations
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateLinkStrength } from '../../api/redux/actions';
import { Text, Image, Url, File, Audio, Package, Zip, Collection, User } from './core/index';

class NodeRenderer extends Component {
  // increment linkstrength if there is an activeNode
  handleNodeClick = () => {
    const nodeUUID = this.props.node.uuid;
    if (this.props.activeNode) {
      const linkedNodeUUID = this.props.activeNode.uuid;
      // increment the linkStrength on the server
      this.props.updateLinkStrength(nodeUUID, linkedNodeUUID);
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
          />
        );
      case 'image':
        return (
          <Image
            element={this.props.element}
            node={this.props.node}
            handleClick={this.handleNodeClick}
          />
        );
      case 'url':
        return (
          <Url
            element={this.props.element}
            node={this.props.node}
            handleClick={this.handleNodeClick}
          />
        );
      case 'file':
        return (
          <File
            element={this.props.element}
            node={this.props.node}
            handleClick={this.handleNodeClick}
          />
        );
      case 'audio':
        return (
          <Audio
            element={this.props.element}
            node={this.props.node}
            handleClick={this.handleNodeClick}
          />
        );
      case 'package':
        return (
          <Package
            element={this.props.element}
            node={this.props.node}
            handleClick={this.handleNodeClick}
          />
        );
      case 'zip':
        return (
          <Zip
            element={this.props.element}
            node={this.props.node}
            handleClick={this.handleNodeClick}
          />
        );
      case 'collection':
        return (
          <Collection
            element={this.props.element}
            node={this.props.node}
            handleClick={this.handleNodeClick}
          />
        );
      case 'user':
        return (
          <User
            element={this.props.element}
            node={this.props.node}
            handleClick={this.handleNodeClick}
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

export default connect(null, { updateLinkStrength })(NodeRenderer);
