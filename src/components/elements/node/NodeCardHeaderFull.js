import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Icon, Modal, Tooltip } from 'antd';
import {
  showComponent,
  unpackSynthonaImport,
  updateActiveNode,
  deleteNode,
  clearActiveNode,
  generateExportByUUID,
  removeSynthonaImportsByPackage,
} from '../../../api/redux/actions';

class NodeCardHeaderFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.nodeData.name,
      hidden: this.props.nodeData.hidden,
      hiddenIcon: 'eye-invisible',
      searchable: this.props.nodeData.searchable,
      searchableIcon: 'search',
      pinned: this.props.nodeData.pinned,
      pinnedState: 'outlined',
      editable: false,
      showDeleteModal: null,
      showExportModal: null,
    };
  }

  componentDidMount() {
    // set initial hiddens state
    if (this.props.nodeData.hidden) {
      this.setState({ hiddenIcon: 'eye-invisible' });
    } else {
      this.setState({ hiddenIcon: 'eye' });
    }
    // set initial searchable state
    if (this.props.nodeData.searchable) {
      this.setState({ searchableIcon: 'search' });
    } else {
      this.setState({ searchableIcon: 'key' });
    }
    // set initial pinned state
    if (this.props.nodeData.pinned) {
      this.setState({ pinnedState: 'filled' });
    } else {
      this.setState({ pinnedState: 'outlined' });
    }
  }

  // update and save the document name
  saveName = (name) => {
    if (this.state.name !== name) {
      this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, name });
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
    await this.props.deleteNode(this.props.nodeData.uuid);
    this.props.clearActiveNode();
  };

  // show confirm export modal
  toggleExportModal = () => {
    if (this.state.showExportModal) {
      this.setState({ showExportModal: false });
    } else {
      this.setState({ showExportModal: true });
    }
  };

  // delete the node
  exportHandler = async () => {
    this.setState({ showExportModal: false });
    await this.props.generateExportByUUID(this.props.nodeData.uuid);
  };

  toggleHidden = () => {
    if (this.state.hidden === true) {
      this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, hidden: false });
      this.setState({ hidden: false, hiddenIcon: 'eye' });
    } else {
      this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, hidden: true });
      this.setState({ hidden: true, hiddenIcon: 'eye-invisible' });
    }
  };

  toggleSearchable = () => {
    if (this.state.searchable === true) {
      this.setState({ searchable: false, searchableIcon: 'key' });
      this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, searchable: false });
    } else {
      this.setState({ searchable: true, searchableIcon: 'search' });
      this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, searchable: true });
    }
  };

  togglePinned = () => {
    if (this.state.pinned === true) {
      this.setState({ pinned: false, pinnedState: 'outlined' });
      this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, pinned: false });
    } else {
      this.setState({ pinned: true, pinnedState: 'filled' });
      this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, pinned: true });
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
    switch (this.props.nodeData.type) {
      case 'package':
        if (this.props.nodeData.metadata && this.props.nodeData.metadata.importing) {
          return <Fragment></Fragment>;
        } else if (this.props.nodeData.metadata && this.props.nodeData.metadata.expanded) {
          return (
            <Tooltip title={'undo import'} mouseEnterDelay={1.1}>
              <li>
                <button
                  onClick={(e) => {
                    // show the modal
                    this.props.removeSynthonaImportsByPackage(this.props.nodeData.uuid);
                  }}
                >
                  <Icon type={'undo'} theme='outlined' className='full-card-button' />
                </button>
              </li>
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title={'unpack'} mouseEnterDelay={1.1}>
              <li>
                <button
                  onClick={(e) => {
                    // show the modal
                    this.props.unpackSynthonaImport(this.props.nodeData.uuid);
                  }}
                >
                  <Icon type={'gift'} theme='filled' className='full-card-button' />
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
    if (this.props.nodeData.type !== 'package') {
      return (
        <Tooltip title={'generate export'} mouseEnterDelay={1.1}>
          <li>
            <button
              onClick={(e) => {
                this.toggleExportModal();
              }}
            >
              <Icon type={'gift'} theme='outlined' className='full-card-button' />
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
        {/* <p className='full-card-options-date'>{this.props.nodeData.updatedAt}</p> */}
        <ul className='full-card-buttons-list'>
          {this.renderContextualButtons()}
          <Tooltip title={'associations'} mouseEnterDelay={1.1}>
            <li>
              <button
                onClick={(e) => {
                  // show the modal
                  this.props.showComponent('associationSider', this.props.nodeData);
                }}
              >
                <Icon type={'branches'} theme='outlined' className='full-card-button' />
              </button>
            </li>
          </Tooltip>
          <Tooltip title={'graph'} mouseEnterDelay={1.1}>
            <li>
              <button
                onClick={(e) => window.location.replace(`/graph/${this.props.nodeData.uuid}`)}
              >
                <Icon type={'deployment-unit'} theme='outlined' className='full-card-button' />
              </button>
            </li>
          </Tooltip>
          <Tooltip title={'pin'} mouseEnterDelay={1.1}>
            <li>
              <button onClick={(e) => this.togglePinned()}>
                <Icon type={'heart'} theme={this.state.pinnedState} className='full-card-button' />
              </button>
            </li>
          </Tooltip>
          {this.renderExportButton()}
          <Tooltip
            title={this.state.hidden ? 'hidden from explore' : 'visible in explore'}
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
          <Tooltip title={'open in browser'} mouseEnterDelay={1.1}>
            <li>
              <button
                onClick={(e) => window.open(`/associations/${this.props.nodeData.uuid}`, '_blank')}
              >
                <Icon type={'global'} theme='outlined' className='full-card-button' />
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
          afterClose={() => document.body.style.removeProperty('overflow')}
          okType='danger'
          okText='Delete'
          closable={false}
          onCancel={this.toggleDeleteModal}
        >
          <p>
            Are you sure you want to delete <b>{this.props.nodeData.name || 'untitled'}</b>?
          </p>
        </Modal>
        <Modal
          title='Confirm Export'
          visible={this.state.showExportModal}
          className='delete-modal'
          centered
          onOk={this.exportHandler}
          afterClose={() => document.body.style.removeProperty('overflow')}
          okText='Generate'
          closable={false}
          onCancel={this.toggleExportModal}
        >
          <p>
            Generate export package from <b>{this.props.nodeData.name || 'untitled'}</b>? The export
            will contain <b>{this.props.nodeData.name || 'untitled'}</b> along with all its
            associations, and appear in your pinboard when it is completed.
          </p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodeData: state.nodes.activeNode,
  };
};

export default connect(mapStateToProps, {
  showComponent,
  updateActiveNode,
  unpackSynthonaImport,
  deleteNode,
  clearActiveNode,
  generateExportByUUID,
  removeSynthonaImportsByPackage,
})(NodeCardHeaderFull);
