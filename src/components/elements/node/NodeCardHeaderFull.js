import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Icon, Modal } from 'antd';
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
      editable: false,
      showDeleteModal: null,
    };
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
          {/* <li>
            <button onClick={e => this.props.markNodeView(this.props.node.id)}>
              <Icon
                type={'bulb'}
                // type={'heart'}
                theme='outlined'
                className='full-card-button'
                style={{
                  fontSize: '0.9rem',
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.1rem'
                }}
              />
            </button>
          </li> */}
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

          {/* <li>
            <Link
              to={`/associations/${this.props.node.id}`}
              replace
              // style={{ padding: '0', color: 'white', display: 'inline-block' }}
            >
              <Icon
                // type={'edit'}
                type={'apartment'}
                // type={'heart'}
                theme='outlined'
                className='full-card-button'
              />
            </Link>
          </li> */}

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
