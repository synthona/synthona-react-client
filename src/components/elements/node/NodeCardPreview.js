import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';

class NodeCardPreview extends Component {
  // render card types
  renderPreviewTypes = (node) => {
    switch (node.type) {
      case 'text':
        return (
          <Fragment>
            <p>{this.props.node.preview}</p>
          </Fragment>
        );
      case 'image':
        return (
          <Fragment>
            <img
              src={this.props.node.preview}
              alt={this.props.node.name}
              style={{
                objectFit: 'cover',
                minHeight: '100%',
                width: '100%',
              }}
            ></img>
          </Fragment>
        );
      case 'url':
        return (
          <Fragment>
            <Icon type={'star'} theme='outlined' className='node-card-icon' />
          </Fragment>
        );
      case 'audio':
        return (
          <Fragment>
            <Icon type={'sound'} theme='outlined' className='node-card-icon' />
          </Fragment>
        );
      case 'user':
        return (
          <Fragment>
            <Icon type={'user'} theme='outlined' className='node-card-icon' />
          </Fragment>
        );
      case 'package':
        return (
          <Fragment>
            <Icon type={'deployment-unit'} theme='outlined' className='node-card-icon' />
          </Fragment>
        );
      case 'zip':
        return (
          <Fragment>
            <Icon type={'file-zip'} theme='outlined' className='node-card-icon' />
          </Fragment>
        );
      case 'file':
        return (
          <Fragment>
            <Icon type={'file'} theme='outlined' className='node-card-icon' />
          </Fragment>
        );
      case 'collection':
        return (
          <Fragment>
            <Icon type={'branches'} theme='outlined' className='node-card-icon' />
          </Fragment>
        );
      default:
        return;
    }
  };

  render() {
    return <Fragment>{this.renderPreviewTypes(this.props.node)}</Fragment>;
  }
}

export default NodeCardPreview;
