import React, { Fragment } from 'react';
//custom components
import NodeRenderer from '../../../types/render/NodeRenderer';
import './NodeCardFull.less';

const NodeCardFull = (props) => {
  const renderNodeCard = () => {
    if (props.node) {
      return <NodeRenderer type={props.node.type} element={'full'} node={props.node} />;
    }
  };

  return <Fragment>{renderNodeCard()}</Fragment>;
};

export default NodeCardFull;
