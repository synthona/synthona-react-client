import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';
import NodeCardHeader from '../../../components/elements/node/NodeCardHeader';

const Text = (props) => {
  const nodeCard = () => {
    return (
      <li className='nodelist-item'>
        <NodeCardHeader node={props.node} />
        <Link to={`/edit/text/${props.node.uuid}`} onClick={(e) => props.handleClick()}>
          <p>{props.node.preview}</p>
        </Link>
      </li>
    );
  };

  // how the node will appear in collections
  const collectionPreview = () => {
    return (
      <Fragment>
        <p>{props.node.preview}</p>
      </Fragment>
    );
  };

  const fullNode = () => {
    return (
      <div className='full-node-item'>
        <NodeCardHeaderFull node={props.node} />
        <Link to={`/edit/text/${props.node.uuid}`} /*target='_blank' */>
          <p>{props.node.preview}</p>
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

export { Text };
