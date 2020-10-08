import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';
import NodeCardHeader from '../../../components/elements/node/NodeCardHeader';
import defaultHeader from '../../../resources/synthona-header.png';

const User = (props) => {
  const nodeCard = () => {
    return (
      <li className='nodelist-item'>
        <NodeCardHeader node={props.node} />
        <Link to={`/profile/${props.node.path}`} replace onClick={(e) => props.handleClick()}>
          <img
            src={props.node.preview || defaultHeader}
            alt={props.node.name}
            style={{
              objectFit: 'cover',
              minHeight: '100%',
              width: '100%',
            }}
          ></img>
        </Link>
      </li>
    );
  };

  // how the node will appear in collections
  const collectionPreview = () => {
    return (
      <Fragment>
        <img
          src={props.node.preview || defaultHeader}
          alt={props.node.name}
          style={{
            objectFit: 'cover',
            minHeight: '100%',
            width: '100%',
          }}
        ></img>
      </Fragment>
    );
  };

  const fullNode = () => {
    return (
      <div className='full-node-item'>
        <NodeCardHeaderFull node={props.node} />
        <Link to={`/profile/${props.node.path}`} /*target='_blank' */>
          <p>{props.node.name}</p>
        </Link>
      </div>
    );
  };

  // render the requested element
  const renderNode = () => {
    switch (props.element) {
      case 'card':
        return <Fragment>{nodeCard()}</Fragment>;
      case 'preview':
        return <Fragment>{collectionPreview()}</Fragment>;
      case 'full':
        return <Fragment>{fullNode()}</Fragment>;
      default:
        return;
    }
  };

  return <Fragment>{renderNode()}</Fragment>;
};

export { User };
