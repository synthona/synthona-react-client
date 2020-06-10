import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';

class NodeCardPreview extends Component {
  // render card types
  renderPreviewTypes = (node) => {
    switch (node.type) {
      case 'text':
        return (
          <Fragment>
            <p>{this.props.node.summary}</p>
          </Fragment>
        );
      case 'image':
        return (
          <Fragment>
            <img
              src={this.props.node.summary}
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
