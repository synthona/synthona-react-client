import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
// import * as d3 from 'd3';
import { select, selectAll } from 'd3-selection';
import {} from 'd3-force';
//custom components
// import Spinner from '../elements/Spinner';
import IOBar from '../elements/IOBar';
import MainSider from '../elements/MainSider';
// destructure antd layout
const { Content } = Layout;

class Graphspace extends Component {
  // constructor(props) {
  //   super();

  // }

  componentDidMount() {
    this.renderGraphspace();
  }

  renderMainSider = () => {
    if (this.props.mainSider) {
      return <MainSider />;
    }
  };

  renderGraphspace = () => {
    // data to render
    const graphData = [
      { name: 'London', population: 8674000 },
      { name: 'New York', population: 8406000 },
      { name: 'Sydney', population: 4293000 },
      { name: 'Paris', population: 2244000 },
      { name: 'Beijing', population: 11510000 },
    ];
    // select the render area
    const renderSpace = select(this.node);
    // add a circle for each data point
    var i;
    for (i = 0; i < graphData.length; i++) {
      renderSpace.append('circle');
    }
    // select all the generated circles
    const circles = selectAll('circle');
    // append the data to the generated circles
    circles.data(graphData);
    // modify the style for the circles
    circles
      .attr('r', function (d) {
        var scaleFactor = 0.000005;
        return d.population * scaleFactor;
      })
      .attr('cx', function (d, i) {
        return i * 120;
      });
    // done
    return;
  };

  render() {
    return (
      <Layout className='page-layout'>
        {this.renderMainSider()}
        <Layout>
          <Content
            style={{
              paddingTop: '0',
              backgroundColor: 'black',
              minHeight: '100vh',
            }}
          >
            <IOBar />
            <svg
              width={500}
              height={500}
              style={{ textAlign: 'center', padding: '200px', overflow: 'visible' }}
            >
              <g ref={(node) => (this.node = node)}></g>
            </svg>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // associations: state.associations.associationList,
    // isLoading: state.nodes.isFetching,
    // activeNode: state.nodes.activeNode,
    mainSider: state.components.componentList['mainSider'],
  };
};

export default connect(mapStateToProps, {})(Graphspace);
