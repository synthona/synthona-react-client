import React, { Component } from 'react';
import { Layout } from 'antd';
// custom code
import '../elements/css/Page.less';
import MainContent from '../elements/MainContent';
import IOBar from '../elements/IOBar';
// import MainSider from '../elements/MainSider';
import MainFooter from '../elements/MainFooter';

class Collections extends Component {
  render() {
    return (
      <Layout className='page-layout'>
        <IOBar />
        <Layout>
          <MainContent>Collections</MainContent>
        </Layout>
        <MainFooter />
      </Layout>
    );
  }
}

export default Collections;
