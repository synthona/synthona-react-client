import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  hideComponent,
  deleteAssociationLink,
  removeFromAssociationList,
  updateLinkStrength,
} from '../../../api/redux/actions';
import { Button, Tooltip } from 'antd';
import './AssociationLinkList.less';
// node renderer
import NodeRenderer from '../../../types/render/NodeRenderer';

class AssociationLink extends Component {
  handleDeleteAssociation = () => {
    // sider node is the the node the sider was opened from
    var siderNodeUUID = this.props.siderNodeUUID;
    // linked node is the node from the list, to be un-linked, un-associated
    var linkedNodeUUID = this.props.association.uuid;
    // active node is only set when viewing an /association page, the node of the page itself
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

  // render card types
  renderAssociationLink = (association) => {
    return (
      <li className='association-list-item'>
        <Tooltip title={association.name} mouseLeaveDelay={0} mouseEnterDelay={0.3}>
          <Button
            icon='close'
            shape='circle'
            size='small'
            onClick={(e) => this.handleDeleteAssociation()}
          />
          <NodeRenderer
            type={association.type}
            element={'association-link'}
            node={association}
            siderNodeUUID={this.props.siderNodeUUID}
          ></NodeRenderer>
        </Tooltip>
      </li>
    );
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
