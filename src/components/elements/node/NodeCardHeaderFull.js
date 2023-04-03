import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Icon, Modal, Tooltip, message } from 'antd';
import { validUrl, isImageUrl } from '../../../utils/validation';
import { isElectron } from '../../../utils/environment';
import {
	showComponent,
	unpackImport,
	updateActiveNode,
	clearNodePreview,
	openFileInExplorer,
	deleteNode,
	clearActiveNode,
	generateExportByUUID,
	removeImportsByPackage,
} from '../../../api/redux/actions';

class NodeCardHeaderFull extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.nodeData.name,
			preview: this.props.nodeData.preview,
			pinned: this.props.nodeData.pinned,
			pinnedState: 'outlined',
			editable: false,
			showDeleteModal: null,
			showExportModal: null,
			showUrlPreviewImageModal: false,
		};
	}

	componentDidMount() {
		// set initial pinned state
		if (this.props.nodeData.pinned) {
			this.setState({ pinnedState: 'filled' });
		} else {
			this.setState({ pinnedState: 'outlined' });
		}
	}

	// update and save the document name
	saveName = (name) => {
		if (this.state.name !== name) {
			this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, name });
		}
		this.setState({ name: name });
	};

	// show modal to confirm deletion
	toggleDeleteModal = () => {
		if (this.state.showDeleteModal) {
			this.setState({ showDeleteModal: false });
		} else {
			this.setState({ showDeleteModal: true });
		}
	};

	// delete the node
	deleteHandler = async () => {
		this.setState({ showDeleteModal: false });
		this.setState({ deleting: true });
		await this.props.deleteNode(this.props.nodeData.uuid);
		this.props.clearActiveNode();
	};

	// show confirm export modal
	toggleExportModal = () => {
		if (this.state.showExportModal) {
			this.setState({ showExportModal: false });
		} else {
			this.setState({ showExportModal: true });
		}
	};

	// delete the node
	exportHandler = async () => {
		this.setState({ showExportModal: false });
		await this.props.generateExportByUUID(this.props.nodeData.uuid);
	};

	// select an image.
	setUrlPreviewImage = (preview) => {
		// update the URL
		if (isImageUrl(preview) && validUrl(preview)) {
			message.success('updated the preview image');
			this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, preview: preview });
		} else if (preview === '') {
			message.success('removed the preview image');
			this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, preview: '' });
		} else {
			message.error('there was a problem setting the preview image', 1);
		}
	};

	togglePinned = () => {
		if (this.state.pinned === true) {
			this.setState({ pinned: false, pinnedState: 'outlined' });
			this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, pinned: false });
		} else {
			this.setState({ pinned: true, pinnedState: 'filled' });
			this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, pinned: true });
		}
	};

	// select an image.
	setPreviewToLocalFilePath = () => {
		if (this.props.nodeData.preview === null) {
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', [
				'image/gif',
				'image/jpg',
				'image/jpeg',
				'image/png',
				'image/webp',
			]);
			input.click();
			// Listen for uploading local file, then save to server
			input.onchange = async () => {
				const file = input.files[0];
				this.props.updateActiveNode({ uuid: this.props.nodeData.uuid, preview: file.path });
			};
		} else {
			this.props.clearNodePreview(this.props.nodeData);
		}
	};

	// render the title
	renderTitle = () => {
		if (!this.state.editable) {
			// if it is not editable render the plain title
			return (
				<h3
					className='full-card-title'
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
					className='full-card-title'
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

	// render header buttons for node types which need them
	// at the moment it's just .synth packages
	renderContextualButtons = () => {
		switch (this.props.nodeData.type) {
			case 'package':
				if (this.props.nodeData.metadata && this.props.nodeData.metadata.importing) {
					return <Fragment></Fragment>;
				} else if (this.props.nodeData.metadata && this.props.nodeData.metadata.expanded) {
					return (
						<Tooltip title={'restore'} mouseEnterDelay={1.1}>
							<li>
								<button
									onClick={(e) => {
										// show the modal
										this.props.removeImportsByPackage(this.props.nodeData.uuid);
									}}
								>
									<Icon type={'undo'} theme='outlined' className='full-card-button' />
								</button>
							</li>
						</Tooltip>
					);
				} else {
					return (
						<Tooltip title={'expand'} mouseEnterDelay={1.1}>
							<li>
								<button
									onClick={(e) => {
										// show the modal
										this.props.unpackImport(this.props.nodeData.uuid);
									}}
								>
									<Icon type={'gift'} theme='filled' className='full-card-button' />
								</button>
							</li>
						</Tooltip>
					);
				}
			case 'url':
				return (
					<Tooltip title={'preview image'} mouseEnterDelay={1.1}>
						<li>
							<button
								onClick={(e) => {
									// show the modal
									this.setState({ showUrlPreviewImageModal: true });
								}}
							>
								<Icon type={'picture'} theme='outlined' className='full-card-button' />
							</button>
						</li>
					</Tooltip>
				);
			case 'file':
				if (isElectron()) {
					return (
						<Tooltip title={'replace preview image'} mouseEnterDelay={1.1}>
							<li>
								<button
									onClick={(e) => {
										// show the modal
										this.setPreviewToLocalFilePath();
									}}
								>
									<Icon type={'picture'} theme='outlined' className='full-card-button' />
								</button>
							</li>
						</Tooltip>
					);
				} else {
					return;
				}
			case 'audio':
				return (
					<Tooltip title={'replace preview image'} mouseEnterDelay={1.1}>
						<li>
							<button
								onClick={(e) => {
									// show the modal
									this.setPreviewToLocalFilePath();
								}}
							>
								<Icon type={'picture'} theme='outlined' className='full-card-button' />
							</button>
						</li>
					</Tooltip>
				);
			case 'zip':
				return (
					<Tooltip title={'replace preview image'} mouseEnterDelay={1.1}>
						<li>
							<button
								onClick={(e) => {
									// show the modal
									this.setPreviewToLocalFilePath();
								}}
							>
								<Icon type={'picture'} theme='outlined' className='full-card-button' />
							</button>
						</li>
					</Tooltip>
				);
			case 'image':
				return (
					<Tooltip title={'set as app background'} mouseEnterDelay={1.1}>
						<li>
							<button
								onClick={(e) => {
									// set the app background to this image
									localStorage.setItem('background-image', this.props.nodeData.preview);
									window.location.reload();
								}}
							>
								<Icon type={'layout'} className='full-card-button' />
							</button>
						</li>
					</Tooltip>
				);
			default:
				return;
		}
	};

	renderRevealInExplorerButton = () => {
		if (this.props.nodeData.isFile) {
			return (
				<Tooltip title={'open in file explorer'} mouseEnterDelay={1.1}>
					<li>
						<button
							onClick={(e) => {
								// show the modal
								this.props.openFileInExplorer(this.props.nodeData.uuid);
							}}
						>
							<Icon type={'folder-open'} theme='outlined' className='full-card-button' />
						</button>
					</li>
				</Tooltip>
			);
		}
	};

	// render the export button on non-package nodes
	renderExportButton = () => {
		if (this.props.nodeData.type !== 'package') {
			return (
				<Tooltip title={'generate export'} mouseEnterDelay={1.1}>
					<li>
						<button
							onClick={(e) => {
								this.toggleExportModal();
							}}
						>
							<Icon type={'gift'} theme='outlined' className='full-card-button' />
						</button>
					</li>
				</Tooltip>
			);
		}
	};

	render() {
		return (
			<div
				className='full-card-options'
				style={{
					backgroundColor: this.props.theme.cardHeaderColor,
				}}
			>
				{this.renderTitle()}
				{/* <p className='full-card-options-date'>{this.props.nodeData.updatedAt}</p> */}
				<ul className='full-card-buttons-list'>
					<Tooltip title={'associations'} mouseEnterDelay={1.1}>
						<li className='mobile-visible'>
							<button
								onClick={(e) => {
									// show the modal
									this.props.showComponent('associationSider', this.props.nodeData);
								}}
							>
								<Icon type={'branches'} theme='outlined' className='full-card-button' />
							</button>
						</li>
					</Tooltip>
					<Tooltip title={'constellation'} mouseEnterDelay={1.1}>
						<li className='mobile-visible'>
							<button
								onClick={(e) => window.location.replace(`/graph/${this.props.nodeData.uuid}`)}
							>
								<Icon type={'deployment-unit'} theme='outlined' className='full-card-button' />
							</button>
						</li>
					</Tooltip>
					<Tooltip title={'star'} mouseEnterDelay={1.1}>
						<li className='mobile-visible'>
							<button onClick={(e) => this.togglePinned()}>
								<Icon type={'star'} theme={this.state.pinnedState} className='full-card-button' />
							</button>
						</li>
					</Tooltip>
					{this.renderContextualButtons()}
					{this.renderExportButton()}
					{this.renderRevealInExplorerButton()}
					<Tooltip title={'open in browser'} mouseEnterDelay={1.1}>
						<li>
							<button
								onClick={(e) => window.open(`/associations/${this.props.nodeData.uuid}`, '_blank')}
							>
								<Icon type={'global'} theme='outlined' className='full-card-button' />
							</button>
						</li>
					</Tooltip>
					<Tooltip title={'delete'} mouseEnterDelay={1.1}>
						<li className='mobile-visible'>
							<button onClick={(e) => this.toggleDeleteModal()}>
								<Icon type={'delete'} theme='outlined' className='full-card-button delete' />
							</button>
						</li>
					</Tooltip>
				</ul>
				<Modal
					title='Confirm Deletion'
					visible={this.state.showDeleteModal}
					className='delete-modal'
					centered
					onOk={this.deleteHandler}
					afterClose={() => document.body.style.removeProperty('overflow')}
					okType='danger'
					okText='Delete'
					closable={false}
					onCancel={this.toggleDeleteModal}
				>
					<p>
						Are you sure you want to delete <b>{this.props.nodeData.name || 'untitled'}</b>?
					</p>
				</Modal>
				<Modal
					title='Confirm Export'
					visible={this.state.showExportModal}
					className='delete-modal'
					centered
					onOk={this.exportHandler}
					afterClose={() => document.body.style.removeProperty('overflow')}
					okText='Generate'
					closable={false}
					onCancel={this.toggleExportModal}
				>
					<p>
						Generate export from <b>{this.props.nodeData.name || 'untitled'}</b>? The export will
						contain <b>{this.props.nodeData.name || 'untitled'}</b> along with all its associations,
						and appear in the favorites when it is completed.
					</p>
				</Modal>
				<Modal
					title='Preview Image'
					visible={this.state.showUrlPreviewImageModal}
					className='full-card-modal'
					centered
					onOk={(e) => {
						this.setState({ showUrlPreviewImageModal: false });
						this.setUrlPreviewImage(this.state.preview);
					}}
					afterClose={() => {
						document.body.style.removeProperty('overflow');
					}}
					okText='save'
					closable={false}
					onCancel={(e) => {
						this.setState({
							preview: this.props.nodeData.preview,
							showUrlPreviewImageModal: false,
						});
						window.getSelection().removeAllRanges();
					}}
				>
					<input
						type='text'
						className='full-card-modal-input'
						autoFocus
						maxLength='250'
						onFocus={(e) => {
							e.target.select();
						}}
						placeholder='image URL'
						value={this.state.preview || ''}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								this.setState({ showUrlPreviewImageModal: false });
								this.setUrlPreviewImage(this.state.preview);
							}
						}}
						onChange={(e) => this.setState({ preview: e.target.value })}
					></input>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nodeData: state.nodes.activeNode,
		theme: state.components.theme,
	};
};

export default connect(mapStateToProps, {
	showComponent,
	updateActiveNode,
	clearNodePreview,
	unpackImport,
	openFileInExplorer,
	deleteNode,
	clearActiveNode,
	generateExportByUUID,
	removeImportsByPackage,
})(NodeCardHeaderFull);
