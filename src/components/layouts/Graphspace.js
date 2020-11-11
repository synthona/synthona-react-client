import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes, showComponent } from '../../api/redux/actions';
import { Layout } from 'antd';
// import * as d3 from 'd3';
import { select, selectAll } from 'd3-selection';
import { drag } from 'd3-drag';
import { forceSimulation, forceLink, forceManyBody, forceX, forceY } from 'd3-force';
//custom components
import './css/Graphspace.less';
// import Spinner from '../elements/Spinner';
import IOBar from '../elements/IOBar';
import MainSider from '../elements/MainSider';
import AssociationSider from '../elements/association/AssociationSider';
// destructure antd layout
const { Content } = Layout;

class Graphspace extends Component {
  // constructor(props) {
  //   super();
  // }

  componentDidMount() {
    // if (this.props.nodeList) {
    // this.renderGraphspace();
    // }
    this.renderGraphspace();
  }

  // componentWillUnmount() {
  //   this.clearGraphspace();
  // }

  renderMainSider = () => {
    if (this.props.mainSider) {
      return <MainSider />;
    }
  };

  renderAssociationSider = () => {
    if (this.props.associationSider) {
      return <AssociationSider />;
    }
  };

  renderGraphspace = async () => {
    if (this.props.nodeList[0] !== null) {
      await this.props.fetchNodes({
        page: 1,
        type: this.props.query.type,
        searchQuery: this.props.query.searchQuery,
      });

      await this.props.fetchNodes({
        page: 2,
        type: this.props.query.type,
        searchQuery: this.props.query.searchQuery,
      });
    }

    // await this.props.fetchNodes({
    //   page: 2,
    //   type: this.props.query.type,
    //   searchQuery: this.props.query.searchQuery,
    // });

    // await this.props.fetchNodes({
    //   page: 3,
    //   type: this.props.query.type,
    //   searchQuery: this.props.query.searchQuery,
    // });
    // node data
    const nodeData = this.props.nodeList;
    // console.log(nodeData);
    // link data
    const linkData = [
      // {
      //   source: 'fa99a41a-eded-4911-acad-6592acc5a54b',
      //   target: '8de5a17f-55c1-444e-ab17-e9e0a67487f2',
      // },
      // { source: 3, target: 7 },
      // { source: 6, target: 2 },
      // { source: 2, target: 5 },
      // { source: 7, target: 2 },
      // { source: 7, target: 4 },
    ];
    // width and height
    const height = window.innerHeight;
    const width = window.innerWidth;

    // simulation
    const simulation = forceSimulation(nodeData)
      .force(
        'link',
        forceLink(linkData).id((d) => {
          return d.id;
        })
      )
      .force('charge', forceManyBody().strength(-500))
      .force('x', forceX())
      .force('y', forceY());

    const svg = select(this.node)
      .append('svg')
      .attr('class', 'graphspace-svg')
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    const link = svg
      .append('g')
      .attr('stroke', 'grey')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('class', 'graphspace-link')
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .selectAll('circle')
      .data(nodeData)
      .join('g')
      .append('circle')
      .on('dblclick', (e, d) => window.location.replace('/associations/' + d.uuid))
      .on('contextmenu', (e, d) => {
        e.preventDefault();
        this.props.showComponent('associationSider', d);
      })
      .attr('r', 5)
      // .attr('cursor', 'grab')
      .attr('fill', '#16e998')
      .attr('class', 'graphspace-node')
      .call(this.drag(simulation));

    const text = selectAll('g g')
      .append('text')
      .text((d) => d.name.substring(0, 40))
      .attr('font-size', '0.7rem')
      // .attr('fill', 'black')
      // .attr('fill', 'white')
      .attr('cursor', 'grab')
      .attr('stroke', 'white')
      .attr('stroke-width', 0.1)
      .attr('class', 'graphspace-text')
      .call(this.drag(simulation));

    simulation.on('tick', () => {
      // update link location values
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
      // update node location values
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      // update text location values
      text.attr('x', (d) => d.x + 7).attr('y', (d) => d.y - 7);
    });

    return svg.node();
  };

  drag = (simulation) => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
  };

  render() {
    return (
      <Layout className='page-layout'>
        {this.renderMainSider()}
        {this.renderAssociationSider()}
        <Layout>
          <Content
            style={{
              paddingTop: '0',
              backgroundColor: 'black',
              minHeight: '100vh',
            }}
          >
            <div className='graphspace-container' ref={(node) => (this.node = node)}></div>
            {/*  <svg
              width={500}
              height={500}
              style={{ textAlign: 'center', padding: '200px', overflow: 'visible' }}
            >
              <g ref={(node) => (this.node = node)}></g>
          </svg> */}
          </Content>
          <IOBar />
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
    associationSider: state.components.componentList['associationSider'],
    mainSider: state.components.componentList['mainSider'],
    nodeList: state.nodes.nodeList,
    query: state.nodes.query,
    isFetching: state.nodes.isFetching,
  };
};

export default connect(mapStateToProps, { fetchNodes, showComponent })(Graphspace);
