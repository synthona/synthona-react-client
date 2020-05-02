import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { markNodeView, hideModal } from '../../redux/actions';
import { Link } from 'react-router-dom';
// import { Icon } from 'antd';
//custom components
import NodeCardHeader from './NodeCardHeader';
import NodeCardPreview from './NodeCardPreview';

class NodeCard extends Component {
  // render card types
  renderCardTypes = (node) => {
    switch (node.type) {
      case 'text':
        return (
          <li className='nodelist-item'>
            <NodeCardHeader node={this.props.node} />
            <Link to={`/associations/${this.props.node.id}`} replace>
              {/* <Link to={`/edit/text/${this.props.node.id}`} replace> */}
              <NodeCardPreview node={this.props.node} />
            </Link>
          </li>
        );
      case 'image':
        return (
          <li className='nodelist-item'>
            <NodeCardHeader node={this.props.node} />
            <Link to={`/associations/${this.props.node.id}`} replace /*target='_blank' */>
              <NodeCardPreview node={this.props.node} />
            </Link>
          </li>
        );
      case 'url':
        return (
          <li className='nodelist-item'>
            <NodeCardHeader node={this.props.node} />
            <Link
              to={`/associations/${this.props.node.id}`}
              replace
              // onClick={e => this.props.markNodeView(this.props.node.id)} /*target='_blank' */
            >
              <NodeCardPreview node={this.props.node} />
            </Link>
          </li>
        );
      case 'collection':
        var previewCount = 0;
        var preview = null;
        var summary = null;

        if (node.summary) {
          summary = JSON.parse(node.summary);
          previewCount = summary.length;
        }

        switch (previewCount) {
          case 0:
            console.log('length of 0!');
            preview = (
              <li className='nodelist-item'>
                <NodeCardHeader node={this.props.node} />
                <Link
                  to={`/associations/${this.props.node.id}`}
                  replace
                  // onClick={e => this.props.markNodeView(this.props.node.id)} /*target='_blank' */
                >
                  <NodeCardPreview node={this.props.node} />
                </Link>
              </li>
            );
            return preview;
          case 1:
            console.log('length of 1!');
            preview = (
              <li className='nodelist-item nodelist-item-collection'>
                <NodeCardHeader node={this.props.node} />
                <Link
                  to={`/associations/${this.props.node.id}`}
                  replace
                  // onClick={e => this.props.markNodeView(this.props.node.id)} /*target='_blank' */
                >
                  {/* <NodeCardPreview node={summary[0]} /> */}
                  <ul
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      listStyle: 'none',
                      padding: '0',
                      margin: '0',
                    }}
                  >
                    <li
                      style={{
                        width: '12.5rem',
                        maxHeight: '6.7rem',
                        overflow: 'hidden',
                        border: '0.1px solid #b8b8b8',
                      }}
                    >
                      <NodeCardPreview node={summary[0]} />
                    </li>
                  </ul>
                </Link>
              </li>
            );
            return preview;
          case 2:
            console.log('length of 2!');
            preview = (
              <li className='nodelist-item nodelist-item-collection'>
                <NodeCardHeader node={this.props.node} />
                <Link
                  to={`/associations/${this.props.node.id}`}
                  replace
                  // onClick={e => this.props.markNodeView(this.props.node.id)} /*target='_blank' */
                >
                  {/* <NodeCardPreview node={this.props.node} /> */}
                  <ul
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      listStyle: 'none',
                      padding: '0',
                      margin: '0',
                    }}
                  >
                    <li
                      style={{
                        width: '12.5rem',
                        maxHeight: '6.7rem',
                        overflow: 'hidden',
                        border: '0.1px solid #b8b8b8',
                      }}
                    >
                      <NodeCardPreview node={summary[0]} />
                    </li>
                    <li
                      style={{
                        width: '12.5rem',
                        maxHeight: '6.7rem',
                        overflow: 'hidden',
                        border: '0.1px solid #b8b8b8',
                      }}
                    >
                      <NodeCardPreview node={summary[1]} />
                    </li>
                  </ul>
                </Link>
              </li>
            );
            return preview;
          case 3:
            console.log('length of 3!');
            preview = (
              <li className='nodelist-item nodelist-item-collection'>
                <NodeCardHeader node={this.props.node} />
                <Link
                  to={`/associations/${this.props.node.id}`}
                  replace
                  // onClick={e => this.props.markNodeView(this.props.node.id)} /*target='_blank' */
                >
                  {/* <NodeCardPreview node={this.props.node} /> */}
                  <ul
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      listStyle: 'none',
                      padding: '0',
                      margin: '0',
                    }}
                  >
                    <li
                      style={{
                        width: '12.5rem',
                        maxHeight: '6.7rem',
                        overflow: 'hidden',
                        border: '0.1px solid #b8b8b8',
                      }}
                    >
                      <NodeCardPreview node={summary[0]} />
                    </li>
                    <li
                      style={{
                        width: '12.5rem',
                        maxHeight: '6.7rem',
                        overflow: 'hidden',
                        border: '0.1px solid #b8b8b8',
                      }}
                    >
                      <NodeCardPreview node={summary[1]} />
                    </li>
                    <li
                      style={{
                        width: '12.5rem',
                        maxHeight: '6.7rem',
                        overflow: 'hidden',
                        border: '0.1px solid #b8b8b8',
                      }}
                    >
                      <NodeCardPreview node={summary[2]} />
                    </li>
                  </ul>
                </Link>
              </li>
            );
            return preview;
          case 4:
            console.log('length of 4!');
            console.log(summary[1]);
            preview = (
              <li className='nodelist-item nodelist-item-collection'>
                <NodeCardHeader node={this.props.node} />
                <Link to={`/associations/${this.props.node.id}`} replace>
                  <ul
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      listStyle: 'none',
                      padding: '0',
                      margin: '0',
                    }}
                  >
                    <li
                      style={{
                        width: '12.5rem',
                        height: '6.7rem',
                        overflow: 'hidden',
                        border: '0.1px solid #b8b8b8',
                      }}
                    >
                      <NodeCardPreview node={summary[0]} />
                    </li>
                    <li
                      style={{
                        width: '12.5rem',
                        height: '6.7rem',
                        overflow: 'hidden',
                        border: '0.1px solid #b8b8b8',
                      }}
                    >
                      <NodeCardPreview node={summary[1]} />
                    </li>
                    <li
                      style={{
                        width: '12.5rem',
                        height: '6.7rem',
                        overflow: 'hidden',
                        border: '0.1px solid #b8b8b8',
                      }}
                    >
                      <NodeCardPreview node={summary[2]} />
                    </li>
                    <li
                      style={{
                        width: '12.5rem',
                        height: '6.7rem',
                        overflow: 'hidden',
                        border: '0.1px solid #b8b8b8',
                      }}
                    >
                      <NodeCardPreview node={summary[3]} />
                    </li>
                  </ul>
                </Link>
              </li>
            );
            return preview;
          default:
            return;
        }
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
