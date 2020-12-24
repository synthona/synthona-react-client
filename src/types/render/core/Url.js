import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import history from '../../../utils/history';
// for now these are in-common between nodes
import NodeCardHeaderFull from '../../../components/elements/node/NodeCardHeaderFull';
import NodeCardHeader from '../../../components/elements/node/NodeCardHeader';

const Url = (props) => {
  const urlIcon = 'bulb';

  const renderPreview = () => {
    if (props.node.preview) {
      return (
        <a
          href={props.node.path}
          target='_blank'
          rel='noopener noreferrer'
          // onClick={(e) => props.markNodeView(props.node)}
          style={{ width: '100%' }}
        >
          <img
            src={props.node.preview}
            alt={props.node.name}
            style={{
              objectFit: 'cover',
              minHeight: '100%',
              width: '100%',
            }}
          ></img>
        </a>
      );
    } else {
      return (
        <Icon
          type={urlIcon}
          // type={'star'}
          theme='outlined'
          style={{
            fontSize: '5rem',
            color: '#b8b8b8',
            display: 'block',
            textAlign: 'center',
            padding: '3.3rem',
            height: '100%',
          }}
        />
      );
    }
  };

  const nodeCard = () => {
    return (
      <li className='nodelist-item'>
        <NodeCardHeader node={props.node} />
        <a
          // href={props.node.preview}
          href={`/associations/${props.node.uuid}`}
          // target='_blank'
          rel='noopener noreferrer'
          onClick={(e) => history.push(`/associations/${props.node.uuid}`)}
          style={{ width: '100%' }}
        >
          {renderPreview()}
        </a>
        {/*   <Link to={`/associations/${props.node.uuid}`} onClick={(e) => props.handleClick()}>
          <Icon type={'star'} theme='outlined' className='node-card-icon' />
    </Link> */}
      </li>
    );
  };

  // how the node will appear in collections
  const collectionPreview = () => {
    return (
      <Fragment>
        <Icon type={urlIcon} theme='outlined' className='node-card-icon' />
      </Fragment>
    );
  };

  const fullNode = () => {
    return (
      <div className='full-node-item'>
        <NodeCardHeaderFull node={props.node} />
        {/* <p>{props.node.preview}</p> */}
        <a
          href={props.node.path}
          target='_blank'
          rel='noopener noreferrer'
          // onClick={(e) => props.markNodeView(props.node)}
          style={{ width: '100%' }}
        >
          <Icon
            // type={'link'}
            type={urlIcon}
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
      <a
        href={props.node.path}
        target='_blank'
        rel='noopener noreferrer'
        onClick={(e) => props.handleAssociatonClick()}
        style={{ wordBreak: 'break-all' }}
      >
        {props.node.name}
      </a>
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

export { Url };
