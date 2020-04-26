import React, { Component } from 'react';
import { Layout } from 'antd';
// custom code
import '../elements/Page.less';
import InsonaContent from '../elements/InsonaContent';
import IOBar from '../elements/IOBar';
// import InsonaSider from '../elements/InsonaSider';
import InsonaFooter from '../elements/InsonaFooter';

class Collections extends Component {
  render() {
    return (
      <Layout className='page-layout'>
        <IOBar />
        <Layout>
          <InsonaContent>Collections</InsonaContent>
        </Layout>
        <InsonaFooter />
      </Layout>
    );
  }
}

export default Collections;
