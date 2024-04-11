// SPECIAL COMPONENT
// this is a special component to integrate with redux
// while also sending & recieving messages from electron
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ElectronSearch from "./ElectronSearch";
import { showComponent, hideComponent, linkFileNodes } from "../../api/redux/actions";
import { message, Modal } from "antd";
import history from "../../utils/history";

// a place to send & recieve messages to & from electron
class ElectronMessage extends Component {
	componentDidMount() {
		// load up window.api.recieve function
		if (window.api) {
			window.api.receive("fromMain", async (data) => {
				var linkedNode;

				switch (data.message) {
					case "search":
						if (!this.props.electronSearchData) {
							this.props.showComponent("electronSearch");
						} else {
							this.props.hideComponent("electronSearch");
						}
						return;
					case "update-available":
						if (!this.props.updateAvailable) {
							this.props.showComponent("updateAvailable");
						} else {
							this.props.hideComponent("updateAvailable");
						}
						return;
					case "search-all":
						// autofocus on the search bar, if it is onscreen & not selected
						if (document.getElementById("nav-primary-search")) {
							window.scrollTo({ top: 0 });
							document.getElementById("nav-primary-search").select();
						} else {
							history.push("/");
							window.scrollTo({ top: 0 });
							document.getElementById("nav-primary-search").select();
						}
						return;
					case "latest-version":
						message.success("Synthona Is Up To Date", 2);
						return;
					case "load-backend-config":
						window.localStorage.setItem("backend-config", JSON.stringify(data.config));
						return;
					case "file-pick-success":
						if (this.props.activeNode) {
							linkedNode = JSON.stringify(this.props.activeNode);
						}
						// okay! well pretty much this is when we should take this list of files and send it to the backend. that simple
						let fileName;
						let fileList = [];
						for (let file of data.files) {
							// in order to get the fileName we have to replace windows backslashes \ with /
							let simplifiedPath = file.replace(/\\/g, "/");
							// get the filename out of the corrected paths
							fileName = simplifiedPath.substring(simplifiedPath.lastIndexOf("/") + 1);
							// add to the filelist, for the path, use whichever was provided by the system
							fileList.push({ name: fileName, path: file });
						}
						await this.props.linkFileNodes(fileList, linkedNode);
						// redirect to homepage
						history.push("/");
						return;
					case "folder-pick-success":
						if (this.props.activeNode) {
							linkedNode = JSON.stringify(this.props.activeNode);
						}
						// okay! well pretty much this is when we should take this list of files and send it to the backend. that simple
						let folderName;
						let folderList = [];
						for (let folder of data.files) {
							// in order to get the fileName we have to replace windows backslashes \ with /
							let simplifiedPath = folder.replace(/\\/g, "/");
							// get the filename out of the corrected paths
							folderName = simplifiedPath.substring(simplifiedPath.lastIndexOf("/") + 1);
							// add to the filelist, for the path, use whichever was provided by the system
							folderList.push({ name: folderName, path: folder });
						}
						await this.props.linkFileNodes(folderList, linkedNode);
						// redirect to homepage
						history.push("/");
						return;
					default:
						break;
				}
			});
		}
	}

	renderElectronSearch = () => {
		if (this.props.electronSearchData && this.props.electronSearchData.visible) {
			return <ElectronSearch />;
		}
	};

	renderUpdateAvailableModal = () => {
		if (this.props.updateAvailable && this.props.updateAvailable.visible) {
			return (
				<Modal
					title={"A New Version Is Available!"}
					visible={true}
					className="signout-modal"
					centered
					onOk={(e) => window.open("http://www.synthona.net", "_blank")}
					okType="primary"
					okText="Yes!"
					closable={false}
					onCancel={() => this.props.hideComponent("updateAvailable")}
				>
					<p>An upgrade for Synthona is available. Do you want to know more?</p>
				</Modal>
			);
		}
	};

	render() {
		return (
			<Fragment>
				{this.renderElectronSearch()}
				{this.renderUpdateAvailableModal()}
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		electronSearchData: state.components.componentList["electronSearch"],
		updateAvailable: state.components.componentList["updateAvailable"],
		activeNode: state.nodes.activeNode,
	};
};

export default connect(mapStateToProps, { showComponent, hideComponent, linkFileNodes })(
	ElectronMessage
);
