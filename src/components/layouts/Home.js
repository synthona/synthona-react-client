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
    // temporary fix to undo whatever is setting overflow hidden on-login
    document.body.style.removeProperty('overflow');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
