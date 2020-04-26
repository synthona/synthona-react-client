import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { markNodeView, hideModal } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
//custom components
import NodeCardHeader from './NodeCardHeader';

class NodeCard extends Component {
  // render card types
  renderCardTypes = node => {
    switch (node.type) {
      case 'text':
        return (
          <li className='nodelist-item'>
            <NodeCardHeader node={this.props.node} />
            <Link to={`/edit/text/${this.props.node.id}`} replace /*target='_blank' */>
              <p>{this.props.node.summary}</p>
            </Link>
          </li>
        );
      case 'image':
        return (
          <li className='nodelist-item'>
            <NodeCardHeader node={this.props.node} />
            <Link to={`/associations/${this.props.node.id}`} replace /*target='_blank' */>
              <img
                src={this.props.node.summary}
                alt={this.props.node.name}
                style={{
                  objectFit: 'cover',
                  minHeight: '100%',
                  width: '100%'
                }}
              ></img>
            </Link>
          </li>
        );
      case 'url':
        return (
          <li className='nodelist-item'>
            <NodeCardHeader node={this.props.node} />
            {/* <p>{this.props.node.summary}</p> */}
            <a
              href={this.props.node.summary}
              target='_blank'
              rel='noopener noreferrer'
              onClick={e => this.props.markNodeView(this.props.node.id)}
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
                  padding: '3rem'
                }}
              />
            </a>
          </li>
        );
      case 'collection':
        return (
          // <li className='nodelist-item' style={{ textAlign: 'center', margin: '0.25rem' }}>
          //   <NodeCardHeader node={this.props.node} />
          //   {/* <p>{this.props.node.summary}</p> */}
          //   <button
          //     // href='#'
          //     // target='_blank'
          //     // rel='noopener noreferrer'
          //     onClick={e => this.props.markNodeView(this.props.node.id)}
          //     style={{
          //       width: '100%',
          //       border: 'none',
          //       padding: '0',
          //       outline: 'inherit',
          //       cursor: 'pointer'
          //     }}
          //   >
          //     <Icon
          //       type={'appstore'}
          //       theme='outlined'
          //       style={{
          //         fontSize: '5rem',
          //         color: '#b8b8b8',
          //         display: 'block',
          //         textAlign: 'center',
          //         padding: '3rem'
          //       }}
          //     />
          //   </button>
          // </li>
          <li className='nodelist-item'>
            <NodeCardHeader node={this.props.node} />
            <Link
              to={`/associations/${this.props.node.id}`}
              replace
              // onClick={e => this.props.markNodeView(this.props.node.id)} /*target='_blank' */
            >
              <Icon
                type={'apartment'}
                theme='outlined'
                style={{
                  fontSize: '5rem',
                  color: '#b8b8b8',
                  display: 'block',
                  textAlign: 'center',
                  padding: '3rem'
                }}
              />
            </Link>
          </li>
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
    return <div>{this.renderNodeCard()}</div>;
  }
}

export default connect(null, { markNodeView, hideModal })(NodeCard);
