import React, { Component } from 'react';
import { Layout } from 'antd';
// custom code
import '../elements/Page.less';
import HolsonaContent from '../elements/HolsonaContent';
import IOBar from '../elements/IOBar';
// import HolsonaSider from '../elements/HolsonaSider';
import HolsonaFooter from '../elements/HolsonaFooter';

class Collections extends Component {
  render() {
    return (
      <Layout className='page-layout'>
        <IOBar />
        <Layout>
          <HolsonaContent>Collections</HolsonaContent>
        </Layout>
        <HolsonaFooter />
      </Layout>
    );
  }
}

export default Collections;
