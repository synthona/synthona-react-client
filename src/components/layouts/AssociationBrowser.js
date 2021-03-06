import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import {
  setActiveNode,
  clearActiveNode,
  fetchAssociations,
  markNodeView,
  updateNode,
} from '../../api/redux/actions';
import MainSider from '../elements/MainSider';
import NodeCardFull from '../elements/node/NodeCardFull';
import Spinner from '../elements/Spinner';
import IOBar from '../elements/IOBar';
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

  componentWillUnmount() {
    this.props.clearActiveNode();
  }

  // intialize the association page
  initializeFromUrlParams = async () => {
    var uuid = this.props.match.params.uuid;
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0 });
    await this.props.setActiveNode(uuid);
    if (this.props.activeNode !== null) {
      this.props.markNodeView(this.props.activeNode);
    }
    // fetch the user info from the server
    await this.props.fetchAssociations({ nodeUUID: uuid });
    if (this.props.associations !== null && this.props.activeNode !== null) {
      this.setState({
        initialized: true,
        uuid: uuid,
      });
      // update collection preview if necessary
      if (this.props.activeNode.type && this.props.activeNode.type === 'collection') {
        this.regenerateCollectionPreview(this.props.activeNode, this.props.associations);
      }
      document.title = this.props.activeNode.name;
    } else {
      message.error('there was a problem loading the associations');
      this.props.history.push('/');
    }
  };

  regenerateCollectionPreview = async (collectionNode, associationList) => {
    try {
      if (collectionNode && associationList) {
        var i = 0;
        var node;
        var preview = [];
        // get the first 4 non-collection non-user associated nodes and add them to the new preview
        while (i < associationList.length && preview.length < 4) {
          node = associationList[i];
          if (node.type !== 'collection' && node.type !== 'user') {
            preview.push({
              type: node.type,
              preview: node.preview,
            });
          }
          i++;
        }
        this.props.updateNode({ uuid: collectionNode.uuid, preview: JSON.stringify(preview) });
      }
    } catch (err) {
      this.props.history.push('/');
    }
  };

  renderNode = () => {
    if (this.state.uuid !== null && this.state.uuid === this.props.activeNode.uuid) {
      return <NodeCardFull node={this.props.activeNode} />;
    } else {
      return <Spinner></Spinner>;
    }
  };

  renderMainSider = () => {
    if (this.props.mainSider) {
      return <MainSider />;
    }
  };

  render() {
    return (
      <Layout className='page-layout'>
        {this.renderMainSider()}
        <Layout>
          <Content
            style={{
              paddingTop: '0',
              backgroundColor: 'black',
              minHeight: '100vh',
            }}
          >
            <IOBar />
            <div className='list-container'>{this.renderNode()}</div>
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
    isLoading: state.nodes.isFetching,
    activeNode: state.nodes.activeNode,
    mainSider: state.components.componentList['mainSider'],
    isDeleting: state.nodes.isDeleting,
  };
};

export default connect(mapStateToProps, {
  setActiveNode,
  clearActiveNode,
  fetchAssociations,
  markNodeView,
  updateNode,
})(AssociationBrowser);
