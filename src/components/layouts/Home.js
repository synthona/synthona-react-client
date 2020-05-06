import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
// custom code
import MainSider from '../elements/MainSider';
import IOBar from '../elements/IOBar';
import NodeList from '../elements/node/NodeList';

const { Content } = Layout;

// i should really move the fetchNodes call into the nodeList component asap

class Home extends Component {
  componentDidMount() {
    document.title = 'home';
  }

  render() {
    return (
      <Layout className='page-layout'>
        <MainSider />
        <Layout>
          <Content style={{ minHeight: '100vh', marginLeft: '12.3rem' }}>
            <IOBar />
            <div style={{ marginTop: '2.5rem' }}>
              <NodeList />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Home);
