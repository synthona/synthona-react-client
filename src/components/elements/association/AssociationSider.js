import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer, AutoComplete } from 'antd';
import {
  signOut,
  createTextNode,
  hideModal,
  createAssociation,
  fetchAssociationLinkList,
  fetchAssociations,
  associationAutocomplete,
} from '../../../redux/actions';
// custom code
// import Spinner from '../elements/Spinner';
import AssociationLinkList from './AssociationLinkList';
// destructure antd
const { Option } = AutoComplete;

class AssociationSider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autocompleteOptions: null,
      autocompleteValues: null,
      inputText: '',
    };
  }

  createAssociationHandler = async (input) => {
    // get the uuid of the node to be associated
    const nodeToAssociate = [];
    this.state.autocompleteValues.forEach((node) => {
      if (node.uuid === input) {
        nodeToAssociate.push(node.uuid);
      }
    });
    const nodeUUIDToAssociate = nodeToAssociate[0];
    // get this node uuid
    const nodeUUID = this.props.node.uuid;
    // associate the nodes
    await this.props.createAssociation(nodeUUID, nodeUUIDToAssociate);
    this.setState({ autocompleteOptions: [], autocompleteValues: null, inputText: '' });
    // re-render the autocomplete values so more can be added
    this.renderAutocompleteValues('');
  };

  renderAutocompleteValues = async (input) => {
    this.setState({ inputText: input });
    const result = await this.props.associationAutocomplete({
      searchQuery: input || '',
      uuid: this.props.node.uuid,
    });
    if (result) {
      this.setState({
        autocompleteValues: result.map((node) => {
          return node;
        }),
      });
      const newValues = result.map((node) => {
        return <Option key={node.uuid}>{node.name}</Option>;
      });
      this.setState({ autocompleteOptions: newValues });
    }
  };

  hideInfoSider = () => {
    // reset state when the sider is hidden
    this.setState({ autocompleteOptions: null, autocompleteValues: null, inputText: '' });
    // update modal state at app level
    this.props.hideModal();
  };

  renderContent = () => {
    if (this.props.modal.visible && this.props.modal.type === 'nodeInfo' && this.props.node) {
      return (
        <div className='node-info-sider-container' style={{ textAlign: 'center' }}>
          <Drawer
            className='node-info-sider'
            placement='right'
            closable={false}
            title={this.props.node.name}
            onClose={this.hideInfoSider}
            visible={this.props.modal.visible}
          >
            <AutoComplete
              style={{
                width: 200,
              }}
              placeholder='add association'
              value={this.state.inputText}
              onChange={(value) => this.renderAutocompleteValues(value)}
              onFocus={(value) => this.renderAutocompleteValues(value)}
              onSelect={(value) => this.createAssociationHandler(value)}
            >
              {this.state.autocompleteOptions}
            </AutoComplete>
            <br />
            <AssociationLinkList nodeUUID={this.props.node.uuid} />
          </Drawer>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modals.modalInfo,
    node: state.modals.modalInfo.content,
    page: state.associations.associationLinkListPage,
  };
};

export default connect(mapStateToProps, {
  signOut,
  createTextNode,
  hideModal,
  createAssociation,
  fetchAssociationLinkList,
  fetchAssociations,
  associationAutocomplete,
})(AssociationSider);
