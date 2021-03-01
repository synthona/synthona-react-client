import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';
import NodeCardHeader from '../../../components/elements/node/NodeCardHeader';

const Zip = (props) => {
  const nodeCard = () => {
    return (
      <li className='nodelist-item'>
        <NodeCardHeader node={props.node} />
        <Link to={`/associations/${props.node.uuid}`} onClick={(e) => props.handleClick()}>
          <Icon type={'file-zip'} theme='outlined' className='node-card-icon' />
        </Link>
      </li>
    );
  };

  // how the node will appear in collections
  const collectionPreview = () => {
    return (
      <Fragment>
        <Icon type={'file-zip'} theme='outlined' className='node-card-icon' />
      </Fragment>
    );
  };

  const fullNode = () => {
    return (
      <div className='full-node-item'>
        <NodeCardHeaderFull />
        <a
          href={props.node.preview}
          target='_blank'
          rel='noopener noreferrer'
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

export { Zip };
