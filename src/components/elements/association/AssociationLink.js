import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  hideModal,
  deleteAssociationLink,
  removeFromAssociationList,
  updateLinkStrength,
} from '../../../redux/actions';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import './AssociationLinkList.less';

class AssociationLink extends Component {
  handleDeleteAssociation = () => {
    var modalNodeId = this.props.modalNodeId;
    var linkedNode = this.props.association.id;
    if (this.props.activeNode) {
      // store the active node
      var activeNode = this.props.activeNode.id;
    }
    // if both have values go ahead and delete the association
    if (modalNodeId && linkedNode) {
      this.props.deleteAssociationLink(modalNodeId, linkedNode);
      // store pathname
      var pathname = window.location.pathname;
      // handle removal from association list page if on association page
      if (pathname.includes('associations') && activeNode && activeNode !== modalNodeId) {
        this.props.removeFromAssociationList(modalNodeId);
        this.props.hideModal();
      } else {
        this.props.removeFromAssociationList(linkedNode);
      }
    }
  };

  handleLinkClick = () => {
    this.props.hideModal();
    if (this.props.modalNodeId && this.props.association.id) {
      const nodeId = this.props.modalNodeId;
      const linkedNode = this.props.association.id;
      // increment the linkStrength on the server
      this.props.updateLinkStrength(nodeId, linkedNode);
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
                to={`/edit/text/${association.id}`}
                onClick={(e) => this.handleLinkClick()}
                replace
                target='_blank'
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
                to={`/associations/${association.id}`}
                onClick={(e) => this.handleLinkClick()}
                replace
                target='_blank'
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
                href={association.summary}
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
                to={`/associations/${association.id}`}
                onClick={(e) => this.handleLinkClick()}
                replace
                target='_blank'
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
    modalNodeId: state.modals.modalInfo.content.id,
    activeNode: state.nodes.activeNode,
  };
};

export default connect(mapStateToProps, {
  hideModal,
  deleteAssociationLink,
  removeFromAssociationList,
  updateLinkStrength,
})(AssociationLink);
