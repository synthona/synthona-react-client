import React from 'react';
import { Layout } from 'antd';
// custom code
import './css/Page.less';
// destructure antd components
const { Content } = Layout;

const MainContent = (props) => {
  return (
    <Layout className='page-content'>
      <Content style={{ backgroundColor: '#272727' }}>{props.children}</Content>
    </Layout>
  );
};

export default MainContent;
