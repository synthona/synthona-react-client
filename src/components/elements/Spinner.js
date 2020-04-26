import React from 'react';
import { Layout } from 'antd';
import { Spin } from 'antd';

const Spinner = props => {
  return (
    <Layout>
      <Spin
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        size='large'
      ></Spin>
    </Layout>
  );
};

export default Spinner;
