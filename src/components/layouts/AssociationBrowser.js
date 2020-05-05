import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { setActiveNode, fetchAssociations, markNodeView, updateNode } from '../../redux/actions';
// import IOBar from '../elements/IOBar';
import MainSider from '../elements/MainSider';
import NodeCardFull from '../elements/node/NodeCardFull';
// import IOBar from '../elements/IOBar';
import Spinner from '../elements/Spinner';
import AssociationList from '../elements/association/AssociationList';
import { message } from 'antd';
const { Content } = Layout;

class AssociationBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      uuid: null,
    };
  }

  componentDidMount() {
    if (!this.state.initialized) {
      this.initializeFromUrlParams();
    }
  }

  componentDidUpdate() {
    var uuid = this.props.match.params.uuid;
    // re-initialize if the URL changes
    if (this.state.initialized && this.state.uuid !== uuid) {
      this.setState({ initialized: false });
      this.initializeFromUrlParams();
    }
  }

  // // load the image node and set the local id state.
  initializeFromUrlParams = async () => {
    var uuid = this.props.match.params.uuid;
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0 });
    await this.props.setActiveNode(uuid);
    // fetch the user info from the server
    await this.props.fetchAssociations({ nodeUUID: uuid });
    if (
      this.props.associations !== null &&
      this.props.activeNode !== null &&
      this.props.associationOrder !== null
    ) {
      this.setState({
        initialized: true,
        uuid: uuid,
      });
      // update collection preview if necessary
      // TODO: find a way to have it update even less often if possible
      if (this.props.activeNode.type === 'collection') {
        this.regenerateCollectionPreview(
          this.props.activeNode,
          this.props.associations,
          this.props.associationOrder
        );
      }
      this.props.markNodeView(uuid);
      document.title = this.props.activeNode.name;
    } else {
      message.error('there was a problem loading the associations');
      this.props.history.push('/');
    }
  };

  regenerateCollectionPreview = async (collectionNode, associationList, associationOrder) => {
    if (collectionNode && associationList) {
      var i = 0;
      var key;
      var preview = [];
      while (i < associationOrder.length && preview.length < 4) {
        key = associationOrder[i];
        if (associationList[key].type !== 'collection' && associationList[key].type !== 'user') {
          preview.push({ type: associationList[key].type, summary: associationList[key].summary });
        }
        i++;
      }
      this.props.updateNode({ uuid: collectionNode.uuid, summary: JSON.stringify(preview) });
    }
  };

  renderNode = () => {
    if (this.props.activeNode !== null && this.state.uuid === this.props.activeNode.uuid) {
      return (
        // <h1
        //   style={{
        //     textAlign: 'center',
        //     color: 'white',
        //     padding: '0.3rem 0 0.1rem',
        //     fontSize: '1.2rem'
        //   }}
        // >
        //   {this.props.activeNode.name}
        // </h1>
        <NodeCardFull node={this.props.activeNode} />
      );
    } else {
      return <Spinner></Spinner>;
    }
  };

  render() {
    return (
      <Layout className='page-layout'>
        <MainSider />
        <Layout>
          <Content
            style={{
              paddingTop: '0',
              backgroundColor: '#272727',
              marginLeft: '12.3rem',
            }}
          >
            {/* <IOBar /> */}
            {this.renderNode()}
            <AssociationList />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    associations: state.associations.associationList,
    associationOrder: state.associations.associationOrder,
    isLoading: state.nodes.isFetching,
    activeNode: state.nodes.activeNode,
  };
};

export default connect(mapStateToProps, {
  setActiveNode,
  fetchAssociations,
  markNodeView,
  updateNode,
})(AssociationBrowser);
