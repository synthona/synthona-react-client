import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchNodes,
  fetchAssociations,
  showComponent,
  fetchGraphData,
  setActiveNode,
} from '../../api/redux/actions';
import { Layout, message } from 'antd';
// import * as d3 from 'd3';
import { select, selectAll } from 'd3-selection';
import { drag } from 'd3-drag';
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceX, forceY } from 'd3-force';
import { zoom, zoomIdentity } from 'd3-zoom';
//custom components
import './css/GraphBrowser.less';
// import Spinner from '../elements/Spinner';
// import IOBar from '../elements/IOBar';
// import NodeCardFull from '../elements/node/NodeCardFull';
import MainSider from '../elements/MainSider';
import AssociationSider from '../elements/association/AssociationSider';
import AssociationList from '../elements/association/AssociationList';
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
      if (uuid) {
        await this.props.setActiveNode(uuid);
        await this.props.fetchAssociations({ nodeUUID: uuid });
      }
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

  // renderBackgroundImage = () => {
  //   if (this.props.graphData) {
  //     const graphData = this.props.graphData.nodes;
  //     for (let item of graphData) {
  //       if (item.type === 'image') {
  //         // const imageUrl = item.path || item.preview;
  //         // return { backgroundImage: `url(${imageUrl})` };
  //         return null;
  //       }
  //     }
  //     // return { backgroundImage: `url(${})` };
  //     return null;
  //   }
  // };

  renderAssociationSider = () => {
    if (this.props.associationSider) {
      return <AssociationSider />;
    }
  };

  renderAssociationList = () => {
    if (this.props.associations && this.props.associations.length > 0) {
      // let graphData = this.props.graphData;
      // return (
      //   <div>
      //   <NodeCardFull node={this.props.graphData.nodes[0]} />
      //   <div>
      // )
      return <AssociationList />;
    }
  };

  renderGraph = async () => {
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
      .force('charge', forceManyBody().strength(-100000 / nodeData.length))
      .force('x', forceX())
      .force('y', forceY())
      .force('center', forceCenter());
    // initial zoom
    // var initialZoom = zoomIdentity.scale(0.55).translate(0, -15);
    var initialZoom = zoomIdentity.scale(0.77).translate(0, -15);
    const zoomData = zoom().scaleExtent([0.3, 3.7]).on('zoom', zoomed);

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
        if (d.type === 'text') {
          window.location.replace('/edit/text/' + d.uuid);
        } else if (d.type === 'user') {
          window.location.replace(`/profile/${this.props.user.username}`);
        } else {
          window.location.replace('/associations/' + d.uuid);
        }
      })
      .attr('r', 7)
      // .attr('cursor', 'grab')
      .attr('cursor', 'none')
      .attr('fill', '#16e998')
      .attr('class', 'graph-node');

    const text = selectAll('g g g')
      .append('text')
      .text((d) => d.name.substring(0, 100))
      .attr('font-size', '0.8rem')
      .attr('cursor', 'grab')
      // .attr('cursor', 'none')
      // .attr('stroke', 'white')
      // .attr('stroke-width', 0.1)
      .attr('class', 'graph-text');
    // .call(this.drag(simulation));

    svg.call(zoomData).call(zoomData.transform, initialZoom);

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
            <div
              className='graph-container'
              // style={this.renderBackgroundImage()}
              ref={(node) => (this.node = node)}
            ></div>
            {this.renderAssociationList()}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    associations: state.associations.associationList,
    user: state.auth.user,
    activeNode: state.nodes.activeNode,
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
  fetchAssociations,
  setActiveNode,
})(GraphBrowser);
