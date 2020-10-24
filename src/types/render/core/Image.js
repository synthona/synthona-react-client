import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';
import NodeCardHeader from '../../../components/elements/node/NodeCardHeader';

const Image = (props) => {
  const nodeCard = () => {
    return (
      <li className='nodelist-item'>
        <NodeCardHeader node={props.node} />
        <Link to={`/associations/${props.node.uuid}`} onClick={(e) => props.handleClick()}>
          <Fragment>
            <img
              src={props.node.preview}
              alt={props.node.name}
              style={{
                objectFit: 'cover',
                minHeight: '100%',
                width: '100%',
              }}
            ></img>
          </Fragment>
        </Link>
      </li>
    );
  };

  // how the node will appear in collections
  const collectionPreview = () => {
    return (
      <Fragment>
        <img
          src={props.node.preview}
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
        <img src={props.node.preview} alt={props.node.name}></img>
      </div>
    );
  };

  const associationLink = () => {
    return (
      <Link
        to={`/associations/${props.node.uuid}`}
        onClick={(e) => props.handleAssociatonClick()}
        // target='_blank'
      >
        {props.node.name}
      </Link>
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
      case 'association-link':
        return <Fragment>{associationLink()}</Fragment>;
      default:
        return;
    }
  };

  return <Fragment>{renderNode()}</Fragment>;
};

export { Image };
