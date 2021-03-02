import React, { Component } from 'react';
import { Layout } from 'antd';
// custom code
import '../elements/css/Page.less';
import MainContent from '../elements/MainContent';
import IOBar from '../elements/IOBar';
import MainSider from '../elements/MainSider';

class Activity extends Component {
  render() {
    return (
      <Layout className='page-layout'>
        <IOBar />
        <Layout>
          <MainSider />
          <MainContent />
        </Layout>
      </Layout>
    );
  }
}

export default Activity;
