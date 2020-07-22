import React from 'react';
//custom components
import NodeRenderer from '../../../types/render/NodeRenderer';

const NodeCard = (props) => {
  const renderNodeCard = () => {
    if (props.node) {
      return (
        <NodeRenderer
          type={props.node.type}
          element={'card'}
          node={props.node}
          activeNode={props.activeNode}
        />
      );
    }
  };

  return <div>{renderNodeCard()}</div>;
};

export default NodeCard;
