import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Icon, Modal, Tooltip } from 'antd';
import {
  markNodeView,
  showModal,
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
      editable: false,
      showDeleteModal: null,
    };
  }

  componentDidMount() {
    if (this.props.node.hidden) {
      this.setState({ hiddenIcon: 'eye-invisible' });
    } else {
      this.setState({ hiddenIcon: 'eye' });
    }
  }

  // update and save the document name
  saveName = (name) => {
    if (this.state.name !== name) {
      this.props.updateNode({ id: this.props.node.id, name });
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
    await this.props.deleteNode(this.props.node.id);
  };

  toggleHidden = () => {
    if (this.state.hidden) {
      this.props.updateNode({ id: this.props.node.id, hidden: false });
      this.setState({ hidden: false, hiddenIcon: 'eye' });
    } else {
      this.props.updateNode({ id: this.props.node.id, hidden: true });
      this.setState({ hidden: true, hiddenIcon: 'eye-invisible' });
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
          <Tooltip
            title='toggle whether node will show up in explore page and searches'
            mouseEnterDelay={1}
          >
            <li>
              <button onClick={(e) => this.toggleHidden()}>
                <Icon type={this.state.hiddenIcon} theme='outlined' className='full-card-button' />
              </button>
            </li>
          </Tooltip>
          <li>
            <button
              onClick={(e) => {
                // set the active node so the modal has the node data
                // this.props.setActiveNode(this.props.node.id);
                // show the modal
                this.props.showModal('nodeInfo', this.props.node);
              }}
            >
              <Icon type={'bars'} theme='outlined' className='full-card-button' />
            </button>
          </li>
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
  showModal,
  setActiveNode,
  updateNode,
  deleteNode,
})(NodeCardHeaderFull);
