import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Icon, Modal, Tooltip } from 'antd';
import {
  showComponent,
  unpackSynthonaImport,
  updateNode,
  deleteNode,
  clearActiveNode,
  generateExportByUUID,
  removeSynthonaImportsByPackage,
} from '../../../api/redux/actions';

class NodeCardHeaderFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.node.name,
      hidden: this.props.node.hidden,
      hiddenIcon: 'eye',
      searchable: this.props.node.searchable,
      searchableIcon: 'search',
      editable: false,
      showDeleteModal: null,
    };
  }

  componentDidMount() {
    // set initial hiddens state
    if (this.props.node.hidden) {
      this.setState({ hiddenIcon: 'eye-invisible' });
    } else {
      this.setState({ hiddenIcon: 'eye' });
    }
    // set initial searchable state
    if (this.props.node.searchable) {
      this.setState({ searchableIcon: 'search' });
    } else {
      this.setState({ searchableIcon: 'key' });
    }
  }

  // update and save the document name
  saveName = (name) => {
    if (this.state.name !== name) {
      this.props.updateNode({ uuid: this.props.node.uuid, name });
    }
    this.setState({ name: name });
  };

  // show modal to confirm deletion
  toggleDeleteModal = () => {
    if (this.state.showDeleteModal) {
      this.setState({ showDeleteModal: false });
    } else {
      this.setState({ showDeleteModal: true });
    }
  };

  // delete the node
  deleteHandler = async () => {
    this.setState({ showDeleteModal: false });
    this.setState({ deleting: true });
    await this.props.deleteNode(this.props.node.uuid);
    this.props.clearActiveNode();
  };

  toggleHidden = () => {
    if (this.state.hidden === true) {
      this.props.updateNode({ uuid: this.props.node.uuid, hidden: false });
      this.setState({ hidden: false, hiddenIcon: 'eye' });
    } else {
      this.props.updateNode({ uuid: this.props.node.uuid, hidden: true });
      this.setState({ hidden: true, hiddenIcon: 'eye-invisible' });
    }
  };

  toggleSearchable = () => {
    if (this.state.searchable === true) {
      this.setState({ searchable: false, searchableIcon: 'key' });
      this.props.updateNode({ uuid: this.props.node.uuid, searchable: false });
    } else {
      this.setState({ searchable: true, searchableIcon: 'search' });
      this.props.updateNode({ uuid: this.props.node.uuid, searchable: true });
    }
  };

  // render the title
  renderTitle = () => {
    if (!this.state.editable) {
      // if it is not editable render the plain title
      return (
        <h3
          className='full-card-title'
          onDoubleClick={(e) => {
            e.preventDefault();
            this.setState({ editable: true });
          }}
        >
          {this.state.name}
        </h3>
      );
    } else {
      // when title is double clicked render the input field
      return (
        <input
          type='text'
          className='full-card-title'
          onBlur={() => this.setState({ editable: null })}
          maxLength='250'
          autoFocus
          placeholder='name'
          value={this.state.name}
          onKeyPress={(e) => {
            // remove input on enter
            if (e.key === 'Enter') {
              this.setState({ editable: null });
            }
          }}
          onChange={(e) => {
            this.saveName(e.target.value);
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        ></input>
      );
    }
  };

  // render header buttons for node types which need them
  // at the moment it's just .synth packages
  renderContextualButtons = () => {
    switch (this.props.node.type) {
      case 'package':
        if (this.props.node.metadata && this.props.node.metadata.expanded) {
          return (
            <Tooltip title={'undo import'} mouseEnterDelay={1.1}>
              <li>
                <button
                  onClick={(e) => {
                    // show the modal
                    this.props.removeSynthonaImportsByPackage(this.props.node.uuid);
                  }}
                >
                  <Icon type={'undo'} theme='outlined' className='full-card-button' />
                </button>
              </li>
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title={'unpack synthona export'} mouseEnterDelay={1.1}>
              <li>
                <button
                  onClick={(e) => {
                    // show the modal
                    this.props.unpackSynthonaImport(this.props.node.uuid);
                  }}
                >
                  <Icon type={'appstore'} theme='outlined' className='full-card-button' />
                </button>
              </li>
            </Tooltip>
          );
        }
      default:
        return;
    }
  };

  // render the export button on non-package nodes
  renderExportButton = () => {
    if (this.props.node.type !== 'package') {
      return (
        <Tooltip title={'generate export'} mouseEnterDelay={1.1}>
          <li>
            <button
              onClick={(e) => {
                this.props.generateExportByUUID(this.props.node.uuid);
              }}
            >
              <Icon type={'paper-clip'} theme='outlined' className='full-card-button' />
            </button>
          </li>
        </Tooltip>
      );
    }
  };

  render() {
    return (
      <div className='full-card-options'>
        {this.renderTitle()}
        {/* <p className='full-card-options-date'>{this.props.node.updatedAt}</p> */}
        <ul className='full-card-buttons-list'>
          {this.renderContextualButtons()}
          <Tooltip title={'associations'} mouseEnterDelay={1.1}>
            <li>
              <button
                onClick={(e) => {
                  // show the modal
                  this.props.showComponent('associationSider', this.props.node);
                }}
              >
                <Icon type={'branches'} theme='outlined' className='full-card-button' />
              </button>
            </li>
          </Tooltip>
          <Tooltip title={'graph'} mouseEnterDelay={1.1}>
            <li>
              <button onClick={(e) => window.location.replace(`/graph/${this.props.node.uuid}`)}>
                <Icon type={'deployment-unit'} theme='outlined' className='full-card-button' />
              </button>
            </li>
          </Tooltip>
          {this.renderExportButton()}
          <Tooltip
            title={this.state.hidden ? 'accessible via associations only' : 'visible on homepage'}
            mouseEnterDelay={1.1}
          >
            <li>
              <button onClick={(e) => this.toggleHidden()}>
                <Icon type={this.state.hiddenIcon} theme='outlined' className='full-card-button' />
              </button>
            </li>
          </Tooltip>
          <Tooltip
            title={this.state.searchable ? 'searchable' : 'hidden from search'}
            mouseEnterDelay={1.1}
          >
            <li>
              <button onClick={(e) => this.toggleSearchable()}>
                <Icon
                  type={this.state.searchableIcon}
                  theme='outlined'
                  className='full-card-button'
                />
              </button>
            </li>
          </Tooltip>
          <Tooltip title={'delete'} mouseEnterDelay={1.1}>
            <li>
              <button onClick={(e) => this.toggleDeleteModal()}>
                <Icon type={'delete'} theme='outlined' className='full-card-button delete' />
              </button>
            </li>
          </Tooltip>
        </ul>
        <Modal
          title='Confirm Deletion'
          visible={this.state.showDeleteModal}
          className='delete-modal'
          centered
          onOk={this.deleteHandler}
          okType='danger'
          okText='Delete'
          closable={false}
          onCancel={this.toggleDeleteModal}
        >
          <p>
            Are you sure you want to delete <b>{this.props.node.name || 'untitled'}</b>?
          </p>
        </Modal>
      </div>
    );
  }
}

export default connect(null, {
  showComponent,
  updateNode,
  unpackSynthonaImport,
  deleteNode,
  clearActiveNode,
  generateExportByUUID,
  removeSynthonaImportsByPackage,
})(NodeCardHeaderFull);
