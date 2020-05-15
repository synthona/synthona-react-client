import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../../utils/history';
// import { Link } from 'react-router-dom';
import { Icon, Modal, Tooltip } from 'antd';
import {
  markNodeView,
  showComponent,
  setActiveNode,
  updateNode,
  deleteNode,
} from '../../../redux/actions';

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
    history.goBack();
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
          maxlength='250'
          autoFocus
          placeholder='name'
          value={this.state.name}
          onChange={(e) => {
            this.saveName(e.target.value);
          }}
        ></input>
      );
    }
  };

  render() {
    return (
      <div className='full-card-options'>
        {this.renderTitle()}
        <ul className='full-card-buttons-list'>
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
          <li>
            <button onClick={(e) => this.toggleDeleteModal()}>
              <Icon type={'delete'} theme='outlined' className='full-card-button delete' />
            </button>
          </li>
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
  markNodeView,
  showComponent,
  setActiveNode,
  updateNode,
  deleteNode,
})(NodeCardHeaderFull);
