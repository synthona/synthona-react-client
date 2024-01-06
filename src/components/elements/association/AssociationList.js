import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// custom code
import '../node/NodeList.less';
import { fetchAssociations, getRandomNode } from '../../../api/redux/actions';
import NodeCard from '../node/NodeCard';
import AssociationSider from './AssociationSider';
import Spinner from '../Spinner';

class AssociationList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topOfPage: false,
			// redirectInterval: setInterval(this.advanceToRandomNode, 333),
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.infiniteScroll);
		// window.addEventListener('mousemove', this.resetAdvanceCounter);
		// this.advanceToRandomNode();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.infiniteScroll);
	}

	// resetAdvanceCounter = () => {
	// 	console.log('removing interval');
	// 	console.log(this.state.redirectInterval);
	// 	if (this.state.redirectInterval) {
	// 		clearInterval(this.state.redirectInterval);
	// 		this.setState({ redirectInterval: setInterval(this.advanceToRandomNode, 10000) });
	// 	}
	// };

	// commenting this out for now.
	// was experimenting with random automated wandering, screensaver style
	// maybe will revisit this
	// advanceToRandomNode = () => {
	// 	let flash = localStorage.getItem('flash');
	// 	console.log(flash);
	// 	if (flash) {
	// 		window.location.replace(`/flash`);
	// 		return;
	// 	}
	// 	let maxNumber = Math.floor(Math.random() * this.props.associations.length + 1);
	// 	if (this.props.associations.length > 0) {
	// 		let uuid = this.props.associations[this.props.associations.length - maxNumber].uuid;
	// 		window.location.replace(`/associations/${uuid}`);
	// 	} else {
	// 		this.props.getRandomNode();
	// 	}
	// 	localStorage.setItem('flash', true);
	// };

	infiniteScroll = (e) => {
		var currentListLength = this.props.associations.length;
		if (
			this.endReached() &&
			this.props.activeNode &&
			currentListLength < this.props.totalNodes &&
			!this.props.isFetching
		) {
			this.setState({ topOfPage: false });
			// fetch the next page
			this.props.fetchAssociations({
				page: this.props.page + 1,
				nodeUUID: this.props.activeNode.uuid,
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
			// at the top of the page, reset the associationlist
			this.props.fetchAssociations({
				page: 1,
				nodeUUID: this.props.activeNode.uuid,
			});
		}
		// TODO: need to find a way to calculate the "window top" as well
		// so i can decrement the page number when the user scrolls up
		// this is necessary so redux doesn't have to store everything
		return windowBottom >= docHeight - 733;
	};

	renderNodes = () => {
		// go through the list of nodes and render them to the page
		const associationList = this.props.associations;
		// render the association list as cards
		if (associationList !== null) {
			return associationList.map((association) => {
				return (
					<NodeCard key={association.uuid} node={association} activeNode={this.props.activeNode} />
				);
			});
		} else {
			return <Spinner></Spinner>;
		}
	};

	renderList = () => {
		if (this.props.totalNodes > 0) {
			return (
				<ul style={{ backgroundColor: 'black' }} className='nodelist'>
					{this.renderNodes()}
				</ul>
			);
		} else {
			return <Fragment></Fragment>;
		}
	};

	render() {
		return (
			<div>
				{this.renderList()}
				<AssociationSider />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		associations: state.associations.associationList,
		isFetching: state.associations.isFetching,
		activeNode: state.nodes.activeNode,
		page: state.associations.associationListPage,
		totalNodes: state.associations.totalAssociationListItems,
	};
};

export default connect(mapStateToProps, { fetchAssociations, getRandomNode })(AssociationList);
