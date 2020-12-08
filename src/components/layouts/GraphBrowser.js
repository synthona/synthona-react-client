import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes, showComponent, fetchGraphData } from '../../api/redux/actions';
import { Layout } from 'antd';
// import * as d3 from 'd3';
import { select, selectAll } from 'd3-selection';
import { drag } from 'd3-drag';
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceX, forceY } from 'd3-force';
//custom components
import './css/GraphBrowser.less';
// import Spinner from '../elements/Spinner';
import IOBar from '../elements/IOBar';
import MainSider from '../elements/MainSider';
import AssociationSider from '../elements/association/AssociationSider';
// destructure antd layout
const { Content } = Layout;

class GraphBrowser extends Component {
  componentDidMount() {
    this.renderGraph();
  }

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

  renderGraph = async () => {
    if (this.props.graphData === null) {
      await this.props.fetchGraphData({
        page: 1,
        type: this.props.query.type,
        searchQuery: this.props.query.searchQuery,
      });
    }
    // node data
    const nodeData = this.props.graphData.nodes;
    // link data
    const linkData = this.props.graphData.associations;
    // width and height
    const height = window.innerHeight;
    const width = window.innerWidth;

    // simulation
    const simulation = forceSimulation(nodeData)
      .force(
        'link',
        forceLink(linkData)
          // .distance(0.7)
          .id((d) => {
            return d.id;
          })
      )
      .force('charge', forceManyBody().strength(-333))
      .force('x', forceX())
      .force('y', forceY())
      .force('center', forceCenter());

    const svg = select(this.node)
      .append('svg')
      .attr('class', 'graph-svg')
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    const link = svg
      .append('g')
      .attr('stroke', 'grey')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('class', 'graph-link')
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = svg
      .append('g')
      // .attr('stroke', '#fff')
      .selectAll('circle')
      .data(nodeData)
      .join('g')
      .call(this.drag(simulation))
      .append('circle')
      .on('dblclick', (e, d) => {
        // .on('click', (e, d) => {
        if (d.type !== 'text') {
          window.location.replace('/associations/' + d.uuid);
        } else {
          window.location.replace('/edit/text/' + d.uuid);
        }
      })
      .on('contextmenu', (e, d) => {
        e.preventDefault();
        this.props.showComponent('associationSider', d);
      })
      .attr('r', 5)
      // .attr('cursor', 'grab')
      .attr('cursor', 'none')
      .attr('fill', '#16e998')
      .attr('class', 'graph-node');

    const text = selectAll('g g')
      .append('text')
      .text((d) => d.name.substring(0, 55))
      .attr('font-size', '0.9rem')
      // .attr('cursor', 'grab')
      .attr('cursor', 'none')
      // .attr('stroke', 'white')
      .attr('stroke-width', 0.1)
      .attr('class', 'graph-text');
    // .call(this.drag(simulation));

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
              // backgroundColor: 'black',
              // minHeight: '100vh',
            }}
          >
            {/*  <IOBar />*/}
            <IOBar />
            <div className='graph-container' ref={(node) => (this.node = node)}></div>
            {/*  <svg
              width={500}
              height={500}
              style={{ textAlign: 'center', padding: '200px', overflow: 'visible' }}
            >
              <g ref={(node) => (this.node = node)}></g>
          </svg> */}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    associations: state.associations.associationList,
    graphData: state.graph.graphData,
    loading: state.graph.isFetching,
    activeNode: state.nodes.activeNode,
    associationSider: state.components.componentList['associationSider'],
    mainSider: state.components.componentList['mainSider'],
    nodeList: state.nodes.nodeList,
    query: state.nodes.query,
    isFetching: state.nodes.isFetching,
  };
};

export default connect(mapStateToProps, { fetchNodes, showComponent, fetchGraphData })(
  GraphBrowser
);
