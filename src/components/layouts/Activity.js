import React, { Component } from 'react';
import { Layout } from 'antd';
// custom code
import '../elements/Page.less';
import InsonaContent from '../elements/InsonaContent';
import IOBar from '../elements/IOBar';
import InsonaSider from '../elements/InsonaSider';

class Activity extends Component {
  render() {
    return (
      <Layout className='page-layout'>
        <IOBar />
        <Layout>
          <InsonaSider />
          <InsonaContent />
        </Layout>
      </Layout>
    );
  }
}

export default Activity;
