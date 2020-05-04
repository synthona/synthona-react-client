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
            <Icon type={'global'} theme='outlined' className='node-card-icon' />
          </Fragment>
        );
      case 'collection':
        // if (node.summary) {
        //   const summary = JSON.parse(node.summary);
        //   console.log(summary.length);

        //   switch (summary.length) {
        //     case 1:
        //       console.log('length of 1!');
        //       const preview = (
        //         <table>
        //           <tr>
        //             <td></td>
        //           </tr>
        //         </table>
        //       );
        //       return;
        //     case 2:
        //       console.log('length of 2!');
        //       return;
        //     case 3:
        //       console.log('length of 3!');
        //       return;
        //     case 4:
        //       console.log('length of 4!');
        //       return;
        //     default:
        //       return;
        //   }
        // }

        return (
          <Fragment>
            <Icon type={'apartment'} theme='outlined' className='node-card-icon' />
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
