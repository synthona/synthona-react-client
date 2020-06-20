import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer, AutoComplete } from 'antd';
import {
  signOut,
  hideComponent,
  createAssociation,
  fetchAssociationLinkList,
  fetchAssociations,
  associationAutocomplete,
} from '../../../redux/actions';
// custom code
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
    var siderNode = this.props.associationSiderData.content;
    this.state.autocompleteValues.forEach((node) => {
      if (node.uuid === input) {
        nodeToAssociate.push(node.uuid);
      }
    });
    const nodeUUIDToAssociate = nodeToAssociate[0];
    // get this node uuid
    const nodeUUID = siderNode.uuid;
    // associate the nodes
    await this.props.createAssociation(nodeUUID, nodeUUIDToAssociate);
    this.setState({ autocompleteOptions: [], autocompleteValues: null, inputText: '' });
    // re-render the autocomplete values so more can be added
    this.renderAutocompleteValues('');
  };

  renderAutocompleteValues = async (input) => {
    var siderNode = this.props.associationSiderData.content;
    this.setState({ inputText: input });
    const result = await this.props.associationAutocomplete({
      searchQuery: input || '',
      uuid: siderNode.uuid,
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
    // hide association sider component
    this.props.hideComponent('associationSider');
  };

  renderContent = () => {
    if (this.props.associationSiderData) {
      var siderNode = this.props.associationSiderData.content;
      return (
        <div className='node-info-sider-container' style={{ textAlign: 'center' }}>
          <Drawer
            className='node-info-sider'
            placement='right'
            closable={false}
            title={siderNode.name}
            onClose={this.hideInfoSider}
            visible={this.props.associationSiderData.visible}
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
            <AssociationLinkList nodeUUID={siderNode.uuid} />
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
    associationSiderData: state.components.componentList['associationSider'],
    page: state.associations.associationLinkListPage,
  };
};

export default connect(mapStateToProps, {
  signOut,
  hideComponent,
  createAssociation,
  fetchAssociationLinkList,
  fetchAssociations,
  associationAutocomplete,
})(AssociationSider);
