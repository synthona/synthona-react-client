import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes, showComponent, fetchGraphData, setActiveNode } from '../../api/redux/actions';
import { Layout, message } from 'antd';
// import * as d3 from 'd3';
import { select, selectAll } from 'd3-selection';
import { drag } from 'd3-drag';
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceX, forceY } from 'd3-force';
import { zoom } from 'd3-zoom';
//custom components
import './css/GraphBrowser.less';
// import Spinner from '../elements/Spinner';
import IOBar from '../elements/IOBar';
import MainSider from '../elements/MainSider';
import AssociationSider from '../elements/association/AssociationSider';
// destructure antd layout
const { Content } = Layout;

class GraphBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      uuid: null,
    };
  }

  componentDidMount() {
    if (!this.state.initialized) {
      this.initializeFromUrlParams();
    }
  }

  componentDidUpdate() {
    var uuid = this.props.match.params.uuid;
    // re-initialize if the URL changes
    if (this.state.initialized && this.state.uuid !== uuid) {
      this.setState({ initialized: false });
      this.initializeFromUrlParams();
    }
  }

  // intialize the association page
  initializeFromUrlParams = async () => {
    var uuid = this.props.match.params.uuid;
    // fetch the graph data
    await this.props.fetchGraphData({
      anchorNode: uuid,
      type: this.props.query.type,
      searchQuery: this.props.query.searchQuery,
    });
    // if all that was successful, finish initialization
    if (this.props.graphData !== null) {
      this.setState({
        initialized: true,
        uuid: uuid,
      });
      // render graph
      this.renderGraph();
    } else {
      message.error('there was a problem loading the data');
      this.props.history.push('/');
    }
  };

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
    // node data
    const nodeData = this.props.graphData.nodes;
    // link data
    const linkData = this.props.graphData.associations;

    // ================================
    // ATTEMPT 2
    // ================================
    // // // width and height
    // const height = window.innerHeight;
    // const width = window.innerWidth;

    // const simulation = forceSimulation(nodeData)
    //   .force(
    //     'link',
    //     forceLink(linkData).id((d) => d.id)
    //   )
    //   .force('charge', forceManyBody().strength(-400))
    //   .force('x', forceX())
    //   .force('y', forceY());

    // const zoomData = zoom().scaleExtent([1, 40]).on('zoom', zoomed);

    // const svg = select(this.node)
    //   .attr('viewBox', [-width / 2, -height / 2, width, height])
    //   .style('font', '12px sans-serif');

    // const g = svg.append('g');

    // // Per-type markers, as they don't inherit styles.
    // g.append('defs')
    //   .selectAll('marker')
    //   // .data(types)
    //   .join('marker')
    //   // .attr('id', (d) => `arrow-${d}`)
    //   .attr('viewBox', '0 -5 10 10')
    //   .attr('refX', 15)
    //   .attr('refY', -0.5)
    //   .attr('markerWidth', 6)
    //   .attr('markerHeight', 6)
    //   .attr('orient', 'auto')
    //   .append('path')
    //   // .attr('fill', color)
    //   .attr('d', 'M0,-5L10,0L0,5');

    // const link = g
    //   .append('g')
    //   .attr('stroke', 'grey')
    //   .attr('stroke-opacity', 0.6)
    //   .selectAll('line')
    //   .data(linkData)
    //   .join('line')
    //   .attr('class', 'graph-link')
    //   .attr('stroke-width', (d) => Math.sqrt(d.value));

    // const node = g
    //   .append('g')
    //   .selectAll('circle')
    //   .data(nodeData)
    //   .join('g')
    //   .call(this.drag(simulation))
    //   .append('circle')
    //   .on('dblclick', (e, d) => {
    //     window.location.replace('/graph/' + d.uuid);
    //   })
    //   // .on('click', (e, d) => {
    //   //   e.preventDefault();
    //   //   this.props.showComponent('associationSider', d);
    //   // })
    //   .on('contextmenu', (e, d) => {
    //     e.preventDefault();
    //     if (d.type !== 'text') {
    //       window.location.replace('/associations/' + d.uuid);
    //     } else {
    //       window.location.replace('/edit/text/' + d.uuid);
    //     }
    //   })
    //   .attr('r', 5)
    //   // .attr('cursor', 'grab')
    //   .attr('cursor', 'none')
    //   .attr('fill', '#16e998')
    //   .attr('class', 'graph-node');

    // // const text = selectAll('g g')
    // //   .append('text')
    // //   .text((d) => d.name.substring(0, 50))
    // //   .attr('font-size', '0.9rem')
    // //   .attr('cursor', 'grab')
    // //   .attr('cursor', 'none')
    // //   // .attr('stroke', 'white')
    // //   .attr('stroke-width', 0.1)
    // //   .attr('class', 'graph-text');
    // // // .call(this.drag(simulation));

    // svg.call(zoomData);

    // function zoomed({ transform }) {
    //   g.attr('transform', transform);
    // }

    // simulation.on('tick', () => {
    //   // link.attr('d', linkArc);
    //   node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    //   //   // update link location values
    //   link
    //     .attr('x1', (d) => d.source.x)
    //     .attr('y1', (d) => d.source.y)
    //     .attr('x2', (d) => d.target.x)
    //     .attr('y2', (d) => d.target.y);
    //   // update node location values
    //   node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    //   // update text location values
    //   text.attr('x', (d) => d.x + 7).attr('y', (d) => d.y - 7);
    // });

    // // invalidation.then(() => simulation.stop());

    // return svg.node();

    // ================================
    // ATTEMPT 1
    // ================================
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
      .force('charge', forceManyBody().strength(-100000 / linkData.length))
      .force('x', forceX())
      .force('y', forceY())
      .force('center', forceCenter());

    const zoomData = zoom().scaleExtent([1, 40]).on('zoom', zoomed);

    const svg = select(this.node)
      .append('svg')
      .attr('class', 'graph-svg')
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    const g = svg.append('g');

    const link = g
      .append('g')
      .attr('stroke', 'grey')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('class', 'graph-link')
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = g
      .append('g')
      .selectAll('circle')
      .data(nodeData)
      .join('g')
      .call(this.drag(simulation))
      .append('circle')
      .on('dblclick', (e, d) => {
        window.location.replace('/graph/' + d.uuid);
      })
      // .on('click', (e, d) => {
      //   e.preventDefault();
      //   this.props.showComponent('associationSider', d);
      // })
      .on('contextmenu', (e, d) => {
        e.preventDefault();
        if (d.type !== 'text') {
          window.location.replace('/associations/' + d.uuid);
        } else {
          window.location.replace('/edit/text/' + d.uuid);
        }
      })
      .attr('r', 5)
      // .attr('cursor', 'grab')
      .attr('cursor', 'none')
      .attr('fill', '#16e998')
      .attr('class', 'graph-node');

    const text = selectAll('g g g')
      .append('text')
      .text((d) => d.name.substring(0, 50))
      .attr('font-size', '0.9rem')
      .attr('cursor', 'grab')
      // .attr('cursor', 'none')
      // .attr('stroke', 'white')
      .attr('stroke-width', 0.1)
      .attr('class', 'graph-text');
    // .call(this.drag(simulation));

    svg.call(zoomData);

    function zoomed({ transform }) {
      g.attr('transform', transform);
    }

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
            }}
          >
            {/*  <IOBar />*/}
            <IOBar />
            <div className='graph-container' ref={(node) => (this.node = node)}></div>
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
    associationSider: state.components.componentList['associationSider'],
    mainSider: state.components.componentList['mainSider'],
    nodeList: state.nodes.nodeList,
    query: state.nodes.query,
    isFetching: state.nodes.isFetching,
  };
};

export default connect(mapStateToProps, {
  fetchNodes,
  showComponent,
  fetchGraphData,
  setActiveNode,
})(GraphBrowser);
