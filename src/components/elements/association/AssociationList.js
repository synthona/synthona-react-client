import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// custom code
import '../node/NodeList.less';
import { searchNodes, fetchAssociations } from '../../../redux/actions';
import NodeCard from '../node/NodeCard';
import AssociationSider from './AssociationSider';
import Spinner from '../Spinner';

class AssociationList extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.infiniteScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
  }

  infiniteScroll = (e) => {
    if (this.endReached() && this.props.activeNode) {
      // fetch the next page
      this.props.fetchAssociations({
        page: this.props.page + 1,
        nodeId: this.props.activeNode.id,
      });
    }
  };

  endReached = () => {
    // window calculations to tell when the user scrolls to the bottom
    const windowHeight =
      'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    // TODO: need to find a way to calculate the "window top" as well
    // so i can decrement the page number when the user scrolls up
    // this is necessary so redux doesn't have to store everything
    return windowBottom >= docHeight - 300;
  };

  renderNodes = () => {
    // go through the list of nodes and render them to the page
    const associationList = this.props.associations;
    // the order the nodes should appear in
    const associationOrder = this.props.order;
    if (this.props.assocations !== null && this.props.order !== null) {
      return associationOrder.map((key) => {
        const node = associationList[key];
        return <NodeCard key={key} node={node} />;
      });
    } else {
      return <Spinner></Spinner>;
    }
  };

  renderList = () => {
    if (this.props.totalNodes < 0) {
      return <Fragment></Fragment>;
    } else if (this.props.totalNodes > 0) {
      return (
        <ul style={{ backgroundColor: 'black' }} className='nodelist'>
          {this.renderNodes()}
        </ul>
      );
    }
  };

  render() {
    return (
      <div>
        {/* <ul className='nodelist'>{this.renderNodes()}</ul> */}
        {this.renderList()}
        <AssociationSider />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    associations: state.associations.associationList,
    isFetching: state.associations.isFetching,
    order: state.associations.associationOrder,
    activeNode: state.nodes.activeNode,
    page: state.associations.associationListPage,
    totalNodes: state.associations.totalAssociationListItems,
  };
};

export default connect(mapStateToProps, { searchNodes, fetchAssociations })(AssociationList);
