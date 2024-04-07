export const setupTheme = () => {
	let theme = JSON.parse(localStorage.getItem("theme"));
	let colors = {};
	switch (theme) {
		case "classic":
			colors = {
				cardTitleColor: "#03fc88",
				cardButtonColor: "white",
				cardHeaderColor: "#111111",
				cardBodyColor: "#111111",
				cardTextColor: "#e7e7e7",
				graphNodeColor: "#ffffff",
				graphNodeBorderColor: "#fff019",
				graphNodeHoverColor: "#f0ff99",
				graphNodeBorderHoverColor: "#f0ff99",
				textEditorBackground: "white",
				textEditorText: "black",
			};
			break;
		case "light":
			colors = {
				cardTitleColor: "black",
				cardButtonColor: "black",
				cardHeaderColor: "#e7e7e7",
				cardBodyColor: "#e7e7e7",
				cardTextColor: "grey",
				graphNodeColor: "#f0ff99",
				graphNodeBorderColor: "#f0ff99",
				graphNodeHoverColor: "white",
				graphNodeBorderHoverColor: "white",
				textEditorBackground: "white",
				textEditorText: "black",
			};
			break;
		case "translucent":
			colors = {
				cardTitleColor: "#03fc88",
				cardButtonColor: "white",
				cardHeaderColor: "rgba(0, 0, 0, .6)",
				cardBodyColor: "rgba(0, 0, 0, .8)",
				cardTextColor: "#e7e7e7",
				graphNodeColor: "#ffffff",
				graphNodeBorderColor: "#fff019",
				graphNodeHoverColor: "rgba(255, 255, 255, .4)",
				graphNodeBorderHoverColor: "rgba(255, 255, 255, .4)",
				textEditorBackground: "white",
				textEditorText: "#272727",
			};
			break;
		case "translucent green":
			colors = {
				cardTitleColor: "#03fc88",
				cardButtonColor: "#03fc88",
				cardHeaderColor: "rgba(0, 0, 0, .6)",
				cardBodyColor: "rgba(0, 0, 0, .8)",
				cardTextColor: "#e7e7e7",
				graphNodeColor: "#03fc88",
				graphNodeBorderColor: "#03fc88",
				graphNodeHoverColor: "rgba(3, 252, 136, .5)",
				graphNodeBorderHoverColor: "rgba(3, 252, 136, .5)",
				textEditorBackground: "white",
				textEditorText: "#272727",
			};
			break;
		case "translucent blue":
			colors = {
				cardTitleColor: "#7bf2e2",
				cardButtonColor: "#7bf2a7",
				cardHeaderColor: "rgba(0, 0, 0, .6)",
				cardBodyColor: "rgba(0, 0, 0, .8)",
				cardTextColor: "#e7e7e7",
				graphNodeColor: "#c3f9f2",
				graphNodeBorderColor: "#3651ff",
				graphNodeHoverColor: "rgba(50, 66, 168, .5)",
				graphNodeBorderHoverColor: "rgba(50, 66, 168, .5)",
				textEditorBackground: "white",
				textEditorText: "#272727",
			};
			break;
		case "translucent red":
			colors = {
				cardTitleColor: "#ff709b",
				cardButtonColor: "#ff3d78",
				cardHeaderColor: "rgba(0, 0, 0, .6)",
				cardBodyColor: "rgba(0, 0, 0, .8)",
				cardTextColor: "#e7e7e7",
				graphNodeColor: "#ff3d78",
				graphNodeBorderColor: "#c70a43",
				graphNodeHoverColor: "rgba(255, 61, 120, .5)",
				graphNodeBorderHoverColor: "rgba(255, 61, 120, .5)",
				textEditorBackground: "white",
				textEditorText: "#272727",
			};
			break;
		case "translucent yellow":
			colors = {
				cardTitleColor: "#faff63",
				cardButtonColor: "#faff63",
				cardHeaderColor: "rgba(0, 0, 0, .6)",
				cardBodyColor: "rgba(0, 0, 0, .8)",
				cardTextColor: "#e7e7e7",
				graphNodeColor: "#faff63",
				graphNodeBorderColor: "#e7e7e7",
				graphNodeHoverColor: "rgba(250, 255, 99, .5)",
				graphNodeBorderHoverColor: "rgba(250, 255, 99, .5)",
				textEditorBackground: "white",
				textEditorText: "#272727",
			};
			break;
		case "translucent orange":
			colors = {
				cardTitleColor: "#ffa424",
				cardButtonColor: "#ffa424",
				cardHeaderColor: "rgba(0, 0, 0, .6)",
				cardBodyColor: "rgba(0, 0, 0, .8)",
				cardTextColor: "#e7e7e7",
				graphNodeColor: "#ffa424",
				graphNodeBorderColor: "#e7e7e7",
				graphNodeHoverColor: "rgba(255, 164, 36, .5)",
				graphNodeBorderHoverColor: "rgba(255, 164, 36, .5)",
				textEditorBackground: "white",
				textEditorText: "#272727",
			};
			break;
		default:
			break;
	}
	return colors;
};

export const setupEditorTheme = () => {
	let theme = JSON.parse(localStorage.getItem("quill-theme"));
	let colors = {};
	switch (theme) {
		case "classic":
			colors = {
				textEditorBackground: "white",
				textEditorText: "black",
			};
			break;
		case "dark":
			colors = {
				textEditorBackground: "#272727",
				textEditorText: "white",
			};
			break;
		case "warm":
			colors = {
				textEditorBackground: "#FFF1DE",
				textEditorText: "#272727",
			};
			break;
		case "off white":
			colors = {
				textEditorBackground: "#FAF9F6",
				textEditorText: "#272727",
			};
			break;
		case "green hacker":
			colors = {
				textEditorBackground: "rgba(0, 0, 0, .8)",
				textEditorText: "#03fc88",
			};
			break;
		case "iris hacker":
			colors = {
				textEditorBackground: "rgba(0, 0, 0, .8)",
				textEditorText: "#5D3FD3",
			};
			break;
		case "dark translucent":
			colors = {
				textEditorBackground: "rgba(0, 0, 0, .8)",
				textEditorText: "white",
			};
			break;
		default:
			colors = {
				textEditorBackground: "white",
				textEditorText: "black",
			};
			break;
	}
	return colors;
};
