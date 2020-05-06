import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { markNodeView, showModal, setActiveNode, updateNode } from '../../../redux/actions';

class NodeCardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.node.name,
      editable: false,
    };
  }

  // render the title
  renderTitle = () => {
    if (!this.state.editable) {
      // if it is not editable render the plain title
      return (
        <h3
          className='nodelist-item-title'
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
          className='nodelist-item-title'
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

  // update and save the document name
  saveName = (name) => {
    if (this.state.name !== name) {
      this.props.updateNode({ uuid: this.props.node.uuid, name });
    }
    this.setState({ name: name });
  };

  render() {
    return (
      <div
        className='nodelist-options'
        style={{
          display: 'flex',
          width: '100%',
        }}
      >
        {this.renderTitle()}
        <div className='nodelist-options-buttons' style={{ marginLeft: 'auto' }}>
          <button onClick={(e) => this.props.markNodeView(this.props.node.uuid)}>
            <Icon
              // type={'edit'}
              type={'bulb'}
              // type={'heart'}
              theme='outlined'
              style={{
                fontSize: '0.9rem',
                display: 'block',
                textAlign: 'center',
                padding: '0',
              }}
            />
          </button>
          <Link
            to={`/associations/${this.props.node.uuid}`}
            replace
            style={{ padding: '0', color: '#272727', display: 'inline-block' }}
          >
            <Icon
              type={'branches'}
              theme='outlined'
              style={{
                fontSize: '0.9rem',
                display: 'block',
                textAlign: 'center',
                padding: '0.2rem',
              }}
            />
          </Link>
          <button
            onClick={(e) => {
              // set the active node so the modal has the node data
              // this.props.setActiveNode(this.props.node.uuid);
              // show the modal
              this.props.showModal('nodeInfo', this.props.node);
            }}
          >
            <Icon
              type={'bars'}
              theme='outlined'
              style={{
                fontSize: '0.9rem',
                display: 'block',
                textAlign: 'center',
                padding: '0',
              }}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  markNodeView,
  showModal,
  setActiveNode,
  updateNode,
})(NodeCardHeader);