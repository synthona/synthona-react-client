import React, { Component } from 'react';
import { Layout } from 'antd';
// custom code
import '../elements/Page.less';
import HolsonaContent from '../elements/HolsonaContent';
import IOBar from '../elements/IOBar';
import HolsonaSider from '../elements/HolsonaSider';

class Activity extends Component {
  render() {
    return (
      <Layout className='page-layout'>
        <IOBar />
        <Layout>
          <HolsonaSider />
          <HolsonaContent />
        </Layout>
      </Layout>
    );
  }
}

export default Activity;
