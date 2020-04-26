import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { setActiveNode, fetchAssociations, markNodeView } from '../../redux/actions';
// import IOBar from '../elements/IOBar';
import HolsonaSider from '../elements/HolsonaSider';
import NodeCardFull from '../elements/NodeCardFull';
// import IOBar from '../elements/IOBar';
import Spinner from '../elements/Spinner';
import AssociationList from '../elements/AssociationList';
import { message } from 'antd';
const { Content } = Layout;

class AssociationBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      id: null,
    };
  }

  componentDidMount() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!this.state.initialized) {
      this.initializeFromUrlParams();
    }
  }

  componentDidUpdate() {
    var id = parseInt(this.props.match.params.id);
    // re-initialize if the URL changes
    if (this.state.initialized && this.state.id !== id) {
      this.setState({ initialized: false });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.initializeFromUrlParams();
    }
  }

  // // load the image node and set the local id state.
  initializeFromUrlParams = async () => {
    var id = parseInt(this.props.match.params.id);
    await this.props.setActiveNode(id);
    // fetch the user info from the server
    await this.props.fetchAssociations({ nodeId: id });
    if (this.props.associations !== null && this.props.activeNode !== null) {
      this.setState({
        initialized: true,
        id: id,
      });
      this.props.markNodeView(id);
      document.title = this.props.activeNode.name;
    } else {
      message.error('there was a problem loading the associations');
      this.props.history.push('/');
    }
  };

  renderNode = () => {
    if (this.props.activeNode !== null && this.state.id === this.props.activeNode.id) {
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
        <HolsonaSider />
        <Layout>
          <Content
            style={{
              paddingTop: '0',
              backgroundColor: '#272727',
              marginLeft: '12.5rem',
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

const mapStateToProps = (state, ownProps) => {
  return {
    associations: state.associations.associationList,
    isLoading: state.nodes.isFetching,
    activeNode: state.nodes.activeNode,
  };
};

export default connect(mapStateToProps, { setActiveNode, fetchAssociations, markNodeView })(
  AssociationBrowser
);
