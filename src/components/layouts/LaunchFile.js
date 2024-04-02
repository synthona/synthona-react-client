import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { launchFileNode, markNodeView } from "../../api/redux/actions";
// custom code

class LaunchFile extends Component {
	componentDidMount() {
		var uuid = this.props.match.params.uuid;
		this.props.markNodeView({ uuid });
		this.props.launchFileNode(uuid);
		// go back
		if (window.document.referrer.includes("/edit/text/")) {
			window.location.replace(window.document.referrer);
		} else {
			window.location.replace(`/`);
		}
	}

	render() {
		return <Layout style={{ height: "100vh" }}></Layout>;
	}
}

export default connect(null, { launchFileNode, markNodeView })(LaunchFile);
