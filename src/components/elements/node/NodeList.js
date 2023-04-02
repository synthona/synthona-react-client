import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// custom code
import './NodeList.less';
import { fetchNodes } from '../../../api/redux/actions';
import NodeCard from './NodeCard';
import AssociationSider from '../association/AssociationSider';
// import NodeCardFull from '../node/NodeCardFull';

class NodeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topOfPage: false,
		};
	}

	componentDidMount() {
		this.props.fetchNodes({
			// page: this.props.query.page > 1 ? this.props.query.page - 1 : this.props.query.page,
			page: 1,
			type: this.props.query.type,
			searchQuery: this.props.query.searchQuery,
			sortType: this.props.query.sortType,
			sortOrder: this.props.query.sortOrder,
		});
		window.addEventListener('scroll', this.infiniteScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.infiniteScroll);
	}

	infiniteScroll = (e) => {
		if (this.endReached() && !this.props.isFetching) {
			this.setState({ topOfPage: false });
			// fetch the next page
			this.props.fetchNodes({
				page: this.props.query.page + 1,
				type: this.props.query.type,
				searchQuery: this.props.query.searchQuery,
				sortType: this.props.query.sortType,
				sortOrder: this.props.query.sortOrder,
			});
		}
	};

	endReached = () => {
		// window calculations to tell when the user scrolls to the bottom
		const windowHeight =
			'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);
		const windowBottom = windowHeight + window.pageYOffset;
		// check if the top is reached
		if (window.pageYOffset < 1 && !this.props.isFetching && !this.state.topOfPage) {
			this.setState({ topOfPage: true });
			// at the top of the page, reset the nodelist
			this.props.fetchNodes({
				page: 1,
				type: this.props.query.type,
				searchQuery: this.props.query.searchQuery,
				sortType: this.props.query.sortType,
				sortOrder: this.props.query.sortOrder,
			});
		}
		// if it's not the top of the page go ahead and fetch more
		// return windowBottom >= docHeight - 733;
		return windowBottom >= docHeight - 1000;
	};

	renderNodeList = () => {
		// go through the list of nodes and render them to the page
		const nodeList = this.props.nodes;
		// if there are nodes go ahead and render
		if (nodeList !== null && nodeList.length > 0) {
			return nodeList.map((node) => {
				if (node.uuid) {
					// return <NodeCardFull key={node.uuid} node={node} />
					return <NodeCard key={node.uuid} node={node} />;
				} else {
					return <Fragment></Fragment>;
				}
			});
		}
		// adding a bit of a fallback search. more to come on this probably
		else if (this.props.query.searchQuery && !this.props.isFetching) {
			return (
				<div
					style={{
						// height: '100vh',
						marginTop: '1rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'top',
						color: 'white',
					}}
				>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href={`https://www.google.com/search?q=${encodeURIComponent(
							this.props.query.searchQuery
						)}`}
						style={{
							backgroundColor: '#272727',
							color: 'white',
							borderRadius: '3px',
							padding: '0.5rem 1rem',
						}}
					>
						no matches ~ search google instead?
					</a>
				</div>
			);
		}
	};

	render() {
		return (
			<div className='nodelist-container'>
				<ul className='nodelist'>{this.renderNodeList()}</ul>
				<AssociationSider />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nodes: state.nodes.nodeList,
		query: state.nodes.query,
		totalNodes: state.nodes.totalItems,
		isFetching: state.nodes.isFetching,
	};
};

export default connect(mapStateToProps, { fetchNodes })(NodeList);
