import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  hideComponent,
  deleteAssociationLink,
  removeFromAssociationList,
  updateLinkStrength,
} from '../../../api/redux/actions';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import './AssociationLinkList.less';

class AssociationLink extends Component {
  handleDeleteAssociation = () => {
    console.log('handle delete association');
    var siderNodeUUID = this.props.siderNodeUUID;
    var linkedNodeUUID = this.props.association.uuid;
    if (this.props.activeNode) {
      // store the active node
      var activeNodeUUID = this.props.activeNode.uuid;
    }
    // if both have values go ahead and delete the association
    if (siderNodeUUID && linkedNodeUUID) {
      this.props.deleteAssociationLink(siderNodeUUID, linkedNodeUUID);
      // store pathname
      var pathname = window.location.pathname;
      // handle removal from association list page if on association page if an associated node was removed
      if (
        (pathname.includes('associations') || pathname.includes('/edit/text/')) &&
        activeNodeUUID &&
        activeNodeUUID === linkedNodeUUID
      ) {
        this.props.removeFromAssociationList(siderNodeUUID);
        this.props.hideComponent('associationSider');
      } else if (
        (pathname.includes('associations') || pathname.includes('/edit/text/')) &&
        activeNodeUUID &&
        activeNodeUUID === siderNodeUUID
      ) {
        this.props.removeFromAssociationList(linkedNodeUUID);
      }
    }
  };

  handleLinkClick = () => {
    this.props.hideComponent('associationSider');
    if (this.props.siderNodeUUID && this.props.association.uuid) {
      const nodeUUID = this.props.siderNodeUUID;
      const linkedNodeUUID = this.props.association.uuid;
      // increment the linkStrength on the server
      this.props.updateLinkStrength(nodeUUID, linkedNodeUUID);
    }
  };

  // render card types
  renderAssociationLink = (association) => {
    switch (association.type) {
      case 'text':
        return (
          <li className='association-list-item'>
            <Button
              icon='close'
              shape='circle'
              size='small'
              onClick={(e) => this.handleDeleteAssociation()}
            />
            <Tooltip title={association.name} mouseLeaveDelay={0} mouseEnterDelay={0.3}>
              <Link
                to={`/edit/text/${association.uuid}`}
                onClick={(e) => this.handleLinkClick()}
                // target='_blank'
              >
                {association.name}
              </Link>
            </Tooltip>
          </li>
        );
      case 'image':
        return (
          <li className='association-list-item'>
            <Button
              icon='close'
              shape='circle'
              size='small'
              onClick={(e) => this.handleDeleteAssociation()}
            />
            <Tooltip title={association.name} mouseLeaveDelay={0} mouseEnterDelay={0.3}>
              <Link
                to={`/associations/${association.uuid}`}
                onClick={(e) => this.handleLinkClick()}
                // target='_blank'
              >
                {association.name}
              </Link>
            </Tooltip>
          </li>
        );
      case 'file':
        return (
          <li className='association-list-item'>
            <Button
              icon='close'
              shape='circle'
              size='small'
              onClick={(e) => this.handleDeleteAssociation()}
            />
            <Tooltip title={association.name} mouseLeaveDelay={0} mouseEnterDelay={0.3}>
              <Link
                to={`/associations/${association.uuid}`}
                onClick={(e) => this.handleLinkClick()}
                target='_blank'
              >
                {association.name}
              </Link>
            </Tooltip>
          </li>
        );
      case 'audio':
        return (
          <li className='association-list-item'>
            <Button
              icon='close'
              shape='circle'
              size='small'
              onClick={(e) => this.handleDeleteAssociation()}
            />
            <Tooltip title={association.name} mouseLeaveDelay={0} mouseEnterDelay={0.3}>
              <Link
                to={`/associations/${association.uuid}`}
                onClick={(e) => this.handleLinkClick()}
                target='_blank'
              >
                {association.name}
              </Link>
            </Tooltip>
          </li>
        );
      case 'package':
        return (
          <li className='association-list-item'>
            <Button
              icon='close'
              shape='circle'
              size='small'
              onClick={(e) => this.handleDeleteAssociation()}
            />
            <Tooltip title={association.name} mouseLeaveDelay={0} mouseEnterDelay={0.3}>
              <Link
                to={`/associations/${association.uuid}`}
                onClick={(e) => this.handleLinkClick()}
                // target='_blank'
              >
                {association.name}
              </Link>
            </Tooltip>
          </li>
        );
      case 'url':
        return (
          <li className='association-list-item'>
            <Button
              icon='close'
              shape='circle'
              size='small'
              onClick={(e) => this.handleDeleteAssociation()}
            />
            <Tooltip title={association.name} mouseLeaveDelay={0} mouseEnterDelay={0.3}>
              <a
                href={association.preview}
                target='_blank'
                rel='noopener noreferrer'
                onClick={(e) => this.handleLinkClick()}
                style={{ wordBreak: 'break-all' }}
              >
                {association.name}
              </a>
            </Tooltip>
          </li>
        );
      case 'collection':
        return (
          <li className='association-list-item'>
            <Button
              icon='close'
              shape='circle'
              size='small'
              onClick={(e) => this.handleDeleteAssociation()}
            />
            <Tooltip title={association.name} mouseLeaveDelay={0} mouseEnterDelay={0.3}>
              <Link
                to={`/associations/${association.uuid}`}
                onClick={(e) => this.handleLinkClick()}
                // target='_blank'
              >
                {association.name}
              </Link>
            </Tooltip>
          </li>
        );
      default:
        return;
    }
  };

  render() {
    return <div>{this.renderAssociationLink(this.props.association)}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    siderNodeUUID: state.components.componentList['associationSider'].content.uuid,
    activeNode: state.nodes.activeNode,
  };
};

export default connect(mapStateToProps, {
  hideComponent,
  deleteAssociationLink,
  removeFromAssociationList,
  updateLinkStrength,
})(AssociationLink);
