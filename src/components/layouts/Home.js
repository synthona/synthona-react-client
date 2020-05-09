import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
// custom code
import MainSider from '../elements/MainSider';
import IOBar from '../elements/IOBar';
import NodeList from '../elements/node/NodeList';

const { Content } = Layout;

class Home extends Component {
  componentDidMount() {
    document.title = 'home';
  }

  renderMainSider = () => {
    if (this.props.mainSider) {
      return <MainSider />;
    }
  };

  render() {
    return (
      <Layout className='page-layout'>
        <Layout>
          {this.renderMainSider()}
          <Content style={{ minHeight: '100vh' }}>
            <IOBar />
            <div className='list-container'>
              <NodeList />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    mainSider: state.components.componentList['mainSider'],
  };
};

export default connect(mapStateToProps)(Home);
