import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
// custom code
import MainSider from '../elements/MainSider';
import PinList from '../elements/node/PinList';
import PinHeader from '../elements/PinHeader';
// import IOBar from '../elements/IOBar';

const { Content } = Layout;

class Pins extends Component {
  componentDidMount() {
    document.title = 'pins';
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
            <PinHeader />
            <div className='list-container'>
              <PinList />
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

export default connect(mapStateToProps)(Pins);
