import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { markNodeView, showComponent, updateNode } from '../../../api/redux/actions';

class NodeCardHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.node.name,
			editable: false,
		};
	}

	// render the title
	renderTitle = () => {
		if (!this.state.editable) {
			// if it is not editable render the plain title
			return (
				<h3
					className='nodelist-item-title'
					tabIndex={0}
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							this.setState({ editable: true });
						}
					}}
					style={{
						color: this.props.theme.cardTitleColor,
					}}
					onDoubleClick={(e) => {
						e.preventDefault();
						this.setState({ editable: true });
					}}
				>
					{this.state.name}
				</h3>
			);
		} else {
			// when title is double clicked render the input field
			return (
				<input
					type='text'
					className='nodelist-item-title'
					style={{
						backgroundColor: 'transparent',
					}}
					onBlur={() => this.setState({ editable: null })}
					maxLength='250'
					autoFocus
					placeholder='name'
					value={this.state.name}
					onKeyPress={(e) => {
						// remove input on enter
						if (e.key === 'Enter') {
							this.setState({ editable: null });
						}
					}}
					onChange={(e) => {
						this.saveName(e.target.value);
					}}
					onFocus={(e) => {
						e.target.select();
					}}
				></input>
			);
		}
	};

	// the jump to top icon is only available when sorting by most recent
	renderLightbulbIcon = () => {
		let sortType = localStorage.getItem('sortType');
		if (sortType === 'recent' || window.location.href.includes('associations')) {
			return (
				<button onClick={(e) => this.props.markNodeView(this.props.node)}>
					<Icon
						type={'bulb'}
						theme='outlined'
						style={{
							fontSize: '0.9rem',
							display: 'block',
							textAlign: 'center',
							padding: '0',
							color: this.props.theme.cardButtonColor,
						}}
					/>
				</button>
			);
		}
	};

	// update and save the document name
	saveName = (name) => {
		if (this.state.name !== name) {
			this.props.updateNode({ uuid: this.props.node.uuid, name });
			this.props.node.name = name;
			this.setState({ name: name });
		}
	};

	render() {
		return (
			<div
				className='nodelist-options'
				style={{
					backgroundColor: this.props.theme.cardHeaderColor,
				}}
			>
				{this.renderTitle()}
				<div className='nodelist-options-buttons' style={{ marginLeft: 'auto' }}>
					<button
						tabIndex={0}
						onClick={(e) => window.location.replace('/graph/' + this.props.node.uuid)}
					>
						<Icon
							type={'deployment-unit'}
							theme='outlined'
							style={{
								fontSize: '0.9rem',
								display: 'block',
								textAlign: 'center',
								padding: '0',
								color: this.props.theme.cardButtonColor,
							}}
						/>
					</button>
					{this.renderLightbulbIcon()}
					<button
						onClick={(e) => {
							// set the active node so the modal has the node data
							// show the modal
							this.props.showComponent('associationSider', this.props.node);
						}}
					>
						<Icon
							type={'branches'}
							theme='outlined'
							style={{
								fontSize: '0.9rem',
								display: 'block',
								textAlign: 'center',
								padding: '0',
								color: this.props.theme.cardButtonColor,
							}}
						/>
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		theme: state.components.theme,
	};
};

export default connect(mapStateToProps, {
	markNodeView,
	showComponent,
	updateNode,
})(NodeCardHeader);
