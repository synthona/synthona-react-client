import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { markNodeView } from '../../../redux/actions';
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
            <Link to={`/edit/text/${this.props.node.uuid}`} /*target='_blank' */>
              <p>{this.props.node.preview}</p>
            </Link>
          </div>
        );
      case 'user':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            <Link to={`/profile/${this.props.node.name}`} /*target='_blank' */>
              <p>{this.props.node.name}</p>
            </Link>
          </div>
        );
      case 'image':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            {/* <Link to={`/view/image/${this.props.node.uuid}`} >

            </Link> */}
            <img src={this.props.node.preview} alt={this.props.node.name}></img>
          </div>
        );
      case 'url':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            {/* <p>{this.props.node.preview}</p> */}
            <a
              href={this.props.node.preview}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => this.props.markNodeView(this.props.node)}
              style={{ width: '100%' }}
            >
              <Icon
                // type={'link'}
                type={'star'}
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
      case 'file':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            {/* <p>{this.props.node.preview}</p> */}
            <a
              href={this.props.node.preview}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => this.props.markNodeView(this.props.node)}
              style={{ width: '100%' }}
            >
              <Icon
                type={'file'}
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
      case 'audio':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            {/* <p>{this.props.node.preview}</p> */}
            <a
              href={this.props.node.preview}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => this.props.markNodeView(this.props.node)}
              style={{ width: '100%' }}
            >
              <Icon
                type={'sound'}
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
      case 'package':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            {/* <p>{this.props.node.preview}</p> */}
            <a
              href={this.props.node.preview}
              // target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => this.props.markNodeView(this.props.node)}
              style={{ width: '100%' }}
            >
              <Icon
                type={'deployment-unit'}
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
      case 'zip':
        return (
          <div className='full-node-item'>
            <NodeCardHeaderFull node={this.props.node} />
            {/* <p>{this.props.node.preview}</p> */}
            <a
              href={this.props.node.preview}
              // target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => this.props.markNodeView(this.props.node)}
              style={{ width: '100%' }}
            >
              <Icon
                type={'file-zip'}
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
          </div>
        );
      default:
        return;
    }
  };

  renderNodeCard = () => {
    if (this.props.node) {
      return (
        <Fragment>
          {this.renderCardTypes(this.props.node)}
          {/*<p
            style={{
              color: 'white',
              padding: '10px 10px 10px',
              textAlign: 'center',
              backgroundColor: '#272727',
            }}
          >
            {this.props.node.comment}
          </p>*/}
        </Fragment>
      );
    }
  };

  render() {
    return <Fragment>{this.renderNodeCard()}</Fragment>;
  }
}

export default connect(null, { markNodeView })(NodeCardFull);
