import React, { Component } from "react";
import { connect } from "react-redux";
import ReactQuill, { Quill } from "react-quill";
import Delta from "quill-delta";
// import BlotFormatter, { AlignAction, DeleteAction, ImageSpec } from 'quill-blot-formatter';
import { Layout, message } from "antd";
import "react-quill/dist/quill.snow.css";
import AssociationList from "../elements/association/AssociationList";
import AssociationSider from "../elements/association/AssociationSider";
import NodeCardHeaderFull from "../elements/node/NodeCardHeaderFull";
import IOBar from "../elements/IOBar";
// custom components
import Spinner from "../elements/Spinner";
import { renderlink } from "../../utils/renderlink";
// redux handlers
import {
	editTextNode,
	processTextNode,
	createFileNode,
	setActiveNode,
	contextualCreate,
	updateNode,
	fetchAssociations,
	markNodeView,
} from "../../api/redux/actions";
// import custom editor css
import "./QuillEditor.less";
import MainSider from "../elements/MainSider";
// destructure antd components
const { Content } = Layout;

// register custom clipboard to handle bugs with the way the default one works
const Clipboard = Quill.import("modules/clipboard");
// https://github.com/quilljs/quill/issues/1374
class CustomClipboard extends Clipboard {
	onPaste(e) {
		// get current page offset before paste
		const top = window.scrollY;
		const left = window.scrollX;

		if (e.defaultPrevented || !this.quill.isEnabled()) return;
		let range = this.quill.getSelection();
		let delta = new Delta().retain(range.index);
		this.container.style.top =
			(
				window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop ||
				0
			).toString() + "px";
		this.container.focus();
		setTimeout(() => {
			this.quill.selection.update(Quill.sources.SILENT);
			delta = delta.concat(this.convert()).delete(range.length);
			this.quill.updateContents(delta, Quill.sources.USER);
			this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
			let bounds = this.quill.getBounds(delta.length() - range.length, Quill.sources.SILENT);
			this.quill.scrollingContainer.scrollTop = bounds.top;

			// scroll window to previous position after paste
			window.scrollTo({ top, left });
		}, 1);
	}
}

Quill.register("modules/clipboard", CustomClipboard, true);

// register custom LINK
var Link = Quill.import("formats/link");
class CustomLink extends Link {
	static create(value) {
		let node = super.create(value);
		// value = this.sanitize(value);
		node.setAttribute("href", value);
		node.removeAttribute("target");
		node.addEventListener("click", function (e) {
			if (e.shiftKey) {
				if (value.includes("renderlink")) {
					renderlink(value);
				} else {
					window.open(value, "_blank");
				}
			}
		});
		node.addEventListener("contextmenu", function (e) {
			e.preventDefault();
			if (value.includes("renderlink")) {
				renderlink(value);
			} else {
				window.open(value, "_blank");
			}
		});
		return node;
	}
}

Quill.register(CustomLink, true);

class QuillEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			name: "",
			expanded: localStorage.getItem("expanded"),
			uuid: null,
			error: null,
			initializing: false,
			readOnly: true,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	ref = (quill) => {
		this.quill = quill;
	};

	componentDidMount() {
		document.body.style.overflow = "auto";
		document.body.style.height = "100%";
		document.documentElement.style.height = "100%";
		// prevent quill from jumping to top
		document.querySelectorAll(".ql-picker").forEach((tool) => {
			tool.addEventListener("mousedown", function (event) {
				event.preventDefault();
				event.stopPropagation();
			});
		});
		// initialize
		this.initializeFromUrlParams();
	}

	componentDidUpdate = async () => {
		// prevent quill from jumping to top
		document.querySelectorAll(".ql-picker").forEach((tool) => {
			tool.addEventListener("mousedown", function (event) {
				event.preventDefault();
				event.stopPropagation();
			});
		});
		// if the url has changed reload
		var textUUID = this.props.match.params.uuid;
		if (this.state.uuid !== textUUID && this.state.initializing === false) {
			this.setState({
				text: "",
				name: "",
				expanded: localStorage.getItem("expanded"),
				uuid: null,
				error: null,
				initializing: true,
				readOnly: true,
			});
			this.regeneratePreview();
			this.initializeFromUrlParams();
		}
		let quillScrollY = JSON.parse(localStorage.getItem("quillScrollY"));
		if (quillScrollY && quillScrollY.uuid === textUUID) {
			window.scrollTo({ top: quillScrollY.scroll });
		}
	};

	// load the text node and set the local id state.
	initializeFromUrlParams = async () => {
		// check url params
		var textUUID = this.props.match.params.uuid;
		window.addEventListener("scroll", () => {
			localStorage.setItem(
				"quillScrollY",
				JSON.stringify({
					uuid: textUUID,
					scroll: window.scrollY,
				})
			);
		});
		// clear short term memory from last time
		localStorage.removeItem("exclusionData");
		// set the local state id equal to the value in the url
		this.setState({ uuid: textUUID });
		await this.props.setActiveNode(textUUID);
		if (this.props.nodeData && this.props.nodeData.content) {
			// if there is content set the local editor state equal to it
			document.title = this.props.nodeData.name || "Untitled";
			var textValue = JSON.parse(this.props.nodeData.content);
			this.setState({
				text: textValue,
				name: this.props.nodeData.name,
				initializing: false,
				readOnly: false,
			});
			this.props.markNodeView(this.props.nodeData);
			// clear undo history to prevent undo from deleting everything
			const editor = this.quill.getEditor();
			editor.history.clear();
			this.props.fetchAssociations({ nodeUUID: textUUID });
		} else {
			// if there's no content return an error message
			this.setState({ error: true });
			this.props.history.push("/");
		}
	};

	// toggle fullscreen
	expandHandler = () => {
		if (this.state.expanded === null) {
			this.setState({ expanded: "expanded" });
			localStorage.setItem("expanded", "expanded");
		} else {
			this.setState({ expanded: null });
			localStorage.removeItem("expanded");
		}
		this.quill.getEditor().disable();
	};

	// exit the editor and return to the home screen
	exitHandler = async () => {
		// generate the preview and do whatever processing will be
		// necessary to process the node
		// TODO: alter this so it stores a condensed version of the document instead of plain text
		localStorage.removeItem("exclusionData");
		this.regeneratePreview();
		this.props.history.push("/");
	};

	regeneratePreview = () => {
		if (!this.state.deleting && !this.state.error && this.state.uuid !== null && this.quill) {
			const previewLength = 500;
			const editor = this.quill.getEditor();
			// process the text node
			const content = editor.getText();
			const preview = content.substring(0, previewLength);
			this.props.nodeData.preview = preview;
			// wait for preview to update before going back to homepage so it will be up to date
			this.props.processTextNode({ uuid: this.state.uuid, preview });
		}
	};

	// select an image.
	selectLocalImage = () => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", ["image/gif", "image/jpg", "image/jpeg", "image/png"]);
		input.click();

		// Listen for uploading local image, then save to server
		input.onchange = async () => {
			const file = input.files[0];

			// make sure file is an image
			if (/^image\//.test(file.type)) {
				// save the image to the server
				const url = await this.props.createFileNode(
					file,
					null,
					JSON.stringify(this.props.nodeData)
				);
				// push image url to rich editor.
				const range = this.quill.getEditor().getSelection();
				this.quill.getEditor().insertEmbed(range.index, "image", url);
			} else {
				message.error("The file must be an image", 1);
			}
		};
	};

	isImageUrl = (url) => {
		var expression =
			/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);
		return regex.test(url);
	};

	// handle pasting of images
	// these could potentially be stored in a special database table? I'm not sure if
	// externally linked images would be a node type? I don't see why not. i think they're urls
	matcherImageHandler = (node, delta) => {
		const url = node.src;
		const newDelta = new Delta();
		return newDelta.insert({ image: url });
	};

	modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, false] }],
				[{ font: [] }],
				[{ indent: "-1" }, { indent: "+1" }],
				["bold", "italic", "underline", "strike"],
				[
					{
						color: [
							"",
							"#fff",
							"#bbbbbb",
							"#df0000",
							"#a80b44",
							"#ff0062",
							"#df1f95",
							"#9933ff",
							"#c06be2",
							"#c8f0ae",
							"#7fba00",
							"#45d458",
							"#31d697",
							"#00dfd3",
							"#67edff",
							"#00a4ef",
							"#4178df",
							"#4d2ff7",
							"#000080",
							"#56007a",
							"#007c25",
							"#e2d58a",
							"#f8cc52",
							"#fff12b",
							"#eb875f",
							"#ff4500",
							"#f40000",
							"#a0390d",
						],
					},
					{ background: [] },
				],
				[{ align: null }, { align: "center" }, { align: "right" }, { align: "justify" }],
				[{ list: "ordered" }, { list: "bullet" }],
				[{ script: "sub" }, { script: "super" }], // superscript/subscript
				["code-block", "blockquote"],
				["link", "image", "video"],
				["clean"],
				["expand", "exit"],
			],
			handlers: {
				expand: this.expandHandler,
				exit: this.exitHandler,
				image: this.selectLocalImage,
			},
		},
		clipboard: {
			matchVisual: false,
			matchers: [["img", this.matcherImageHandler]],
		},
		keyboard: {
			bindings: {
				renderLinkEnter: {
					key: "Enter",
					prefix: /\[\[.*?\]\]/g,
					handler: async (range, context) => {
						await this.handleRenderlinking(context);
						return;
					},
				},
				renderLinkSpace: {
					key: 32,
					prefix: /\[\[.*?\]\]/g,
					handler: async (range, context) => {
						await this.handleRenderlinking(context);
						return;
					},
				},
			},
		},
		// blotFormatter: {
		//   overlay: {
		//     style: {
		//       border: '2px solid #41e254',
		//     },
		//   },
		// },
	};

	allowedFormats = [
		"header",
		"font",
		"indent",
		"bold",
		"italic",
		"underline",
		"strike",
		"color",
		"background",
		"align",
		"list",
		"script",
		"code-block",
		"blockquote",
		"link",
		"image",
		"video",
	];

	handleRenderlinking = async (context) => {
		let regex = /\[\[.*?\]\]/g;
		let phraseLinks = [...context.prefix.matchAll(regex)];
		let linkedNodeUUID = this.props.nodeData.uuid;
		const editor = this.quill.getEditor();
		//============================================================================
		for (let phrase of phraseLinks) {
			let name;
			let renderlinkUrl;
			let phraseBase = phrase[0].substring(2, phrase[0].length - 2);
			let escapedPhraseString = phraseBase.replace(/[.*+?^${}()|[\]]/g, "\\$&");
			let phraseRegex = new RegExp("\\[\\[" + escapedPhraseString + "\\]\\]", "g");
			let duplicateList = [...editor.getText(0).matchAll(phraseRegex)];
			// editor.getText(0) omits non-text chars so we need to know the diff for later
			let lengthDiff = editor.getLength(0) - editor.getText(0).length;
			// variables for short term memory system
			let exclusionData = localStorage.getItem("exclusionData")
				? JSON.parse(localStorage.getItem("exclusionData"))
				: null;
			let lastCreatedPhrase = exclusionData ? exclusionData.name : null;
			let exclusionList = [];
			// we wanna clear short term memory if the user has typed a new phrase, or if
			// there are duplicates of this same phrase already in the document
			if (lastCreatedPhrase !== phraseBase || duplicateList.length > 1) {
				localStorage.removeItem("exclusionData");
				exclusionList = [];
			} else if (exclusionData) {
				// if we have typed the same phrase twice and yet there are no duplicates
				// we will go ahead and keep our short term memory exclusion list going
				exclusionList = [...exclusionData.list];
			}
			// we have to make the request
			let result = await this.props.contextualCreate(phraseBase, linkedNodeUUID, exclusionList);
			// if we get a result back lets format it in the document
			if (result) {
				renderlinkUrl = result.url;
				name = result.name;
				// now we're going to loop through to update the actual document
				if (duplicateList.length === 1) {
					// if theres only 1, we will also update the name contents
					let phraseIndex = duplicateList[0].index;
					if (name && renderlinkUrl) {
						editor.updateContents(
							new Delta()
								.retain(phraseIndex + lengthDiff)
								.delete(phraseBase.length + 4)
								.insert("[[" + name + "]]", { link: renderlinkUrl })
								.insert(" ")
						);
					}
				} else if (duplicateList.length > 1) {
					// if theres a lot of duplicates all we can do is set the links correctly
					// we're not going to replace any text in this case because it will mess up the indexes
					// and cause a whole bunch of problems. its not necessary anyways
					if (renderlinkUrl) {
						duplicateList.forEach((value) => {
							editor.formatText(value.index, phraseBase.length + 4, "link", renderlinkUrl);
						});
					}
				}
				// update the exclusion data based on our latest result as long as
				// the input phrase is not identical to the returned value from DB
				if (name !== phraseBase) {
					localStorage.setItem(
						"exclusionData",
						JSON.stringify({
							list: [...exclusionList, result.uuid],
							name: phraseBase,
						})
					);
				}
			}
		}
		return;
	};

	// render the main navbar
	renderHeader = () => {
		// Only render the header if the editor is  expanded
		if (this.state.expanded === null && this.props.nodeData) {
			return (
				<div>
					{/* <div style={{ height: '3rem' }}>
						<IOBar fixed={true} />
					</div>*/}
					<div style={{ height: "3rem" }}>
						<IOBar fixed={true} />
					</div>
					<NodeCardHeaderFull />
				</div>
			);
		}
	};

	handleChange(content, delta, source, editor) {
		// Check to see if the document has changed before saving.
		// TODO: i think this comparison is broken
		if (editor.getContents() !== this.state.text && this.state.initializing === false) {
			const fullDelta = JSON.stringify(editor.getContents());
			this.props.editTextNode({
				uuid: this.props.match.params.uuid,
				content: fullDelta,
			});
			this.setState({ text: content });
			this.regeneratePreview();
		}
	}

	renderMainSider = () => {
		if (this.props.mainSider) {
			return <MainSider />;
		}
	};

	renderClassName = () => {
		let documentWidth = JSON.parse(localStorage.getItem("quill-document-width")) || "";
		let documentClass = "quill-" + documentWidth.replace(" ", "-");
		// return the classname
		return documentClass;
	};

	componentWillUnmount() {
		// clear styles
		document.body.style.overflow = null;
		document.body.style.height = null;
		document.documentElement.style.overflow = null;
		document.documentElement.style.height = null;
		localStorage.removeItem("exclusionData");
		window.getSelection().removeAllRanges();
	}

	render() {
		if (this.props.isLoading) {
			return (
				<Layout className="page-layout">
					<Layout>
						<Layout>
							{this.renderHeader()}
							<Spinner />
						</Layout>
					</Layout>
				</Layout>
			);
		}

		return (
			<Layout className="page-layout">
				{this.renderMainSider()}
				<Content className={"text-editor-content " + this.state.expanded}>
					{this.renderHeader()}
					<ReactQuill
						value={this.state.text}
						style={{
							backgroundColor: this.props.editorTheme
								? this.props.editorTheme.textEditorBackground
								: null,
							color: this.props.editorTheme ? this.props.editorTheme.textEditorText : null,
						}}
						className={this.renderClassName()}
						onChange={this.handleChange}
						modules={this.modules}
						ref={this.ref}
						readOnly={this.state.readOnly}
						formats={this.allowedFormats}
						scrollingContainer={"body"}
						onKeyDown={(e) => {
							if (e.key !== "Enter") {
								localStorage.setItem(
									"quillScrollY",
									JSON.stringify({
										uuid: this.state.uuid,
										scroll: window.scrollY,
									})
								);
							} else {
								window.scrollBy({ top: 20 });
							}
						}}
						onBlur={() => {
							localStorage.setItem(
								"quillScrollY",
								JSON.stringify({
									uuid: this.state.uuid,
									scroll: window.scrollY,
								})
							);
							// check to see if we should regenerate preview
							if (this.props.nodeData.preview.length < 500) {
								this.regeneratePreview();
							}
						}}
					></ReactQuill>
					<AssociationSider />
					<AssociationList />
				</Content>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nodeData: state.nodes.activeNode,
		isLoading: state.nodes.isFetching,
		mainSider: state.components.componentList["mainSider"],
		editorTheme: state.components.editorTheme,
	};
};

export default connect(mapStateToProps, {
	editTextNode,
	processTextNode,
	createFileNode,
	contextualCreate,
	updateNode,
	setActiveNode,
	fetchAssociations,
	markNodeView,
})(QuillEditor);
