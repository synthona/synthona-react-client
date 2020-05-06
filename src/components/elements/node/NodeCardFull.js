import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { markNodeView, hideModal } from '../../../redux/actions';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
//custom components
import NodeCardHeaderFull from './NodeCardHeaderFull';
import './NodeCardFull.less';

class NodeCardFull extends Component {
  // render card types
  renderCardTypes = (node) => {
    switch (node.type) {
      case 'text':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            <Link to={`/edit/text/${this.props.node.uuid}`} replace /*target='_blank' */>
              <p style={{ padding: '1.7rem' }}>{this.props.node.summary}</p>
            </Link>
          </div>
        );
      case 'image':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            {/* <Link to={`/view/image/${this.props.node.uuid}`} replace >

            </Link> */}
            <img
              src={this.props.node.summary}
              alt={this.props.node.name}
              style={{
                objectFit: 'cover',
                minHeight: '100%',
                width: '100%',
              }}
            ></img>
          </div>
        );
      case 'url':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            {/* <p>{this.props.node.summary}</p> */}
            <a
              href={this.props.node.summary}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => this.props.markNodeView(this.props.node.uuid)}
              style={{ width: '100%' }}
            >
              <Icon
                // type={'link'}
                type={'global'}
                theme='outlined'
                style={{
                  fontSize: '5rem',
                  color: '#b8b8b8',
                  display: 'block',
                  textAlign: 'center',
                  padding: '3rem',
                }}
              />
            </a>
          </div>
        );
      case 'collection':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            {/* <Link
              to={`/associations/${this.props.node.uuid}`}
              replace
              // onClick={e => this.props.markNodeView(this.props.node.uuid)} 
            >
              <Icon
                type={'branches'}
                theme='outlined'
                style={{
                  fontSize: '5rem',
                  color: '#b8b8b8',
                  display: 'block',
                  textAlign: 'center',
                  padding: '3rem'
                }}
              />
            </Link> */}
          </div>
        );
      default:
        return;
    }
  };

  renderNodeCard = () => {
    if (this.props.node) {
      return <Fragment>{this.renderCardTypes(this.props.node)}</Fragment>;
    }
  };

  render() {
    return <Fragment>{this.renderNodeCard()}</Fragment>;
  }
}

export default connect(null, { markNodeView, hideModal })(NodeCardFull);
