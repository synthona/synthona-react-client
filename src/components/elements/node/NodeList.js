import React, { Component } from 'react';
import { connect } from 'react-redux';
// custom code
import './NodeList.less';
import { searchNodes, fetchNodes } from '../../../redux/actions';
import NodeCard from './NodeCard';
import AssociationSider from '../association/AssociationSider';
import Spinner from '../Spinner';

class NodeList extends Component {
  componentDidMount() {
    this.props.fetchNodes(this.props.query);
    window.addEventListener('scroll', this.infiniteScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
  }

  infiniteScroll = (e) => {
    if (this.endReached()) {
      // fetch the next page
      this.props.fetchNodes({
        page: this.props.query.page + 1,
        type: this.props.query.type,
        searchQuery: this.props.query.searchQuery,
      });
    }
  };

  endReached = () => {
    // window calculations to tell when the user scrolls to the bottom
    const windowHeight =
      'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    // console.log(window.pageYOffset);
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

  renderNodeList = () => {
    // go through the list of nodes and render them to the page
    const nodeList = this.props.nodes;
    // the order the nodes should appear in
    const nodeOrder = this.props.order;
    if (nodeList !== null && nodeOrder !== null) {
      return nodeOrder.map((key) => {
        const node = nodeList[key];
        return <NodeCard key={key} node={node} />;
      });
    } else {
      return <Spinner></Spinner>;
    }
  };

  render() {
    return (
      <div>
        <ul className='nodelist'>{this.renderNodeList()}</ul>
        <AssociationSider />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes.nodeList,
    order: state.nodes.nodeOrder,
    query: state.nodes.query,
    totalNodes: state.nodes.totalItems,
  };
};

export default connect(mapStateToProps, { searchNodes, fetchNodes })(NodeList);
