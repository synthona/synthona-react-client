import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { markNodeView, hideModal } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
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
            <Link to={`/edit/text/${this.props.node.id}`} replace>
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
            <a
              href={this.props.node.summary}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => this.props.markNodeView(this.props.node.id)}
              style={{ width: '100%' }}
            >
              <Icon
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
          </li>
        );
      case 'collection':
        // create the collection grid
        var previewCount = 0;
        var preview = null;
        var summary = null;
        // check if the collection has a summary
        if (node.summary) {
          summary = JSON.parse(node.summary);
          previewCount = summary.length;
        }
        // create the different grid types
        switch (previewCount) {
          case 0:
            preview = (
              <li className='nodelist-item'>
                <NodeCardHeader node={this.props.node} />
                <Link to={`/associations/${this.props.node.id}`} replace>
                  <NodeCardPreview node={this.props.node} />
                </Link>
              </li>
            );
            return preview;
          case 1:
            preview = (
              <li className='nodelist-item nodelist-collection-item'>
                <NodeCardHeader node={this.props.node} />
                <Link to={`/associations/${this.props.node.id}`} replace>
                  <div className='nodelist-collection-item-single'>
                    <NodeCardPreview node={summary[0]} />
                  </div>
                </Link>
              </li>
            );
            return preview;
          case 2:
            preview = (
              <li className='nodelist-item nodelist-item-collection'>
                <NodeCardHeader node={this.props.node} />
                <Link to={`/associations/${this.props.node.id}`} replace>
                  <ul className='nodelist-collection-grid'>
                    <li className='nodelist-collection-grid-full-width'>
                      <NodeCardPreview node={summary[0]} />
                    </li>
                    <li className='nodelist-collection-grid-full-width'>
                      <NodeCardPreview node={summary[1]} />
                    </li>
                  </ul>
                </Link>
              </li>
            );
            return preview;
          case 3:
            preview = (
              <li className='nodelist-item nodelist-item-collection'>
                <NodeCardHeader node={this.props.node} />
                <Link to={`/associations/${this.props.node.id}`} replace>
                  <ul className='nodelist-collection-grid'>
                    <li className='nodelist-collection-grid-full-width'>
                      <NodeCardPreview node={summary[0]} />
                    </li>
                    <li>
                      <NodeCardPreview node={summary[1]} />
                    </li>
                    <li>
                      <NodeCardPreview node={summary[2]} />
                    </li>
                    <li></li>
                  </ul>
                </Link>
              </li>
            );
            return preview;
          case 4:
            preview = (
              <li className='nodelist-item nodelist-item-collection'>
                <NodeCardHeader node={this.props.node} />
                <Link to={`/associations/${this.props.node.id}`} replace>
                  <ul className='nodelist-collection-grid'>
                    <li>
                      <NodeCardPreview node={summary[0]} />
                    </li>
                    <li>
                      <NodeCardPreview node={summary[1]} />
                    </li>
                    <li>
                      <NodeCardPreview node={summary[2]} />
                    </li>
                    <li>
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
