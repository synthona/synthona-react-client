export const renderlink = (renderlink) => {
	let type = renderlink.split("/")[3];
	let uuid = renderlink.split("/")[4];

	switch (type) {
		case "text":
			window.location.replace(`/edit/text/${uuid}`);
			break;
		case "file":
			window.location.replace(`/launch-file/${uuid}`);
			break;
		case "folder":
			window.location.replace(`/launch-file/${uuid}`);
			break;
		case "image":
			window.location.replace(`/associations/${uuid}`);
			break;
		case "collection":
			window.location.replace(`/associations/${uuid}`);
			break;
		default:
			window.location.replace(`/associations/${uuid}`);
			break;
	}
};
