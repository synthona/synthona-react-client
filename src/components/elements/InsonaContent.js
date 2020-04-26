import React from 'react';
import { Layout } from 'antd';
// custom code
import './Page.less';
// destructure antd components
const { Content } = Layout;

const InsonaContent = props => {
  return (
    <Layout className='page-content'>
      <Content style={{ backgroundColor: 'white' }}>{props.children}</Content>
    </Layout>
  );
};

export default InsonaContent;
