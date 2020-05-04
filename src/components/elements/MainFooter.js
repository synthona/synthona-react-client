import React from 'react';
import { Layout } from 'antd';
// custom code
import './Page.less';
// destructure antd components
const { Footer } = Layout;

const MainFooter = () => {
  return <Footer className='page-footer' />;
};

export default MainFooter;
