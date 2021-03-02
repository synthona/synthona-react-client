import React from 'react';
import { Layout } from 'antd';
// custom code
import './css/Page.less';
// destructure antd components
const { Footer } = Layout;

const MainFooter = () => {
  return <Footer className='page-footer' />;
};

export default MainFooter;
