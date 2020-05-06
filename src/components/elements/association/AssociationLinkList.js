import React, { Component } from 'react';
import { connect } from 'react-redux';
// custom code
import '../node/NodeList.less';
import { searchNodes, fetchAssociationLinkList } from '../../../redux/actions';
// import NodeCard from './NodeCard';
import Spinner from '../Spinner';
import AssociationLink from './AssociationLink';

class AssociationLinkList extends Component {
  componentDidMount() {
    this.props.fetchAssociationLinkList({ nodeUUID: this.props.nodeUUID });
  }

  loadMore = () => {
    this.props.fetchAssociationLinkList({
      nodeUUID: this.props.nodeUUID,
      page: this.props.page + 1,
    });
  };

  renderAssociationLinkList = () => {
    // go through the list of nodes and render them to the page
    const list = this.props.associations;
    // the order the nodes should appear in
    const order = this.props.order;
    if (list && order) {
      return order.map((key) => {
        const association = list[key];
        return <AssociationLink key={association.uuid} association={association} />;
      });
    } else {
      return <Spinner></Spinner>;
    }
  };

  renderLoadMoreButton = () => {
    const listLength = Object.keys(this.props.associations).length;
    // if the total items is more than what is loaded show the load more button
    if (this.props.totalItems > listLength) {
      return (
        <li style={{ listStyle: 'none', marginTop: '0.5rem', textAlign: 'center' }}>
          <button
            style={{
              margin: '1rem 0',
              width: '90%',
              backgroundColor: '#272727',
              color: '#16e998',
            }}
            onClick={(e) => this.loadMore()}
          >
            load more
          </button>
        </li>
      );
    }
  };

  render() {
    return (
      <ul id='node-info-list' className='association-list'>
        {this.renderAssociationLinkList()}
        {this.renderLoadMoreButton()}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    associations: state.associations.associationLinkList,
    order: state.associations.associationLinkListOrder,
    page: state.associations.associationLinkListPage,
    totalItems: state.associations.totalLinkListItems,
  };
};

export default connect(mapStateToProps, {
  searchNodes,
  fetchAssociationLinkList,
})(AssociationLinkList);