import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import Delta from 'quill-delta';
// import BlotFormatter, { AlignAction, DeleteAction, ImageSpec } from 'quill-blot-formatter';
import { Layout, message } from 'antd';
import 'react-quill/dist/quill.snow.css';
// import AssociationList from '../elements/association/AssociationList';
import AssociationSider from '../elements/association/AssociationSider';
import NodeCardHeaderFull from '../elements/node/NodeCardHeaderFull';
// custom components
import Spinner from '../elements/Spinner';
// redux handlers
import {
  fetchTextNode,
  editTextNode,
  deleteTextNode,
  processTextNode,
  createImageNode,
  setActiveNode,
  updateNode,
  fetchAssociations,
} from '../../redux/actions';
// import custom editor css
import './QuillEditor.less';
// destructure antd components
const { Content } = Layout;

// Quill.register('modules/blotFormatter', BlotFormatter);

class QuillEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      name: '',
      expanded: localStorage.getItem('expanded'),
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
    document.body.style.overflow = 'auto';
    document.body.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    this.initializeFromUrlParams();
  }

  componentDidUpdate() {
    var textUUID = this.props.match.params.uuid;
    if (this.state.uuid !== textUUID && this.state.initializing === false) {
      this.setState({ initializing: true });
      this.initializeFromUrlParams();
    }
  }

  // load the text node and set the local id state.
  initializeFromUrlParams = async () => {
    var textUUID = this.props.match.params.uuid;
    // set the local state id equal to the value in the url
    this.setState({ uuid: textUUID });
    // fetch the node values from the server
    await this.props.fetchTextNode(textUUID);
    if (this.props.nodeData && this.props.nodeData.content) {
      // if there is content set the local editor state equal to it
      document.title = this.props.nodeData.name || 'Untitled';
      this.setState({
        text: JSON.parse(this.props.nodeData.content),
        name: this.props.nodeData.name,
        initializing: false,
        readOnly: false,
      });
      this.props.fetchAssociations({ nodeUUID: textUUID });
      // clear undo history to prevent undo from deleting everything
      const editor = this.quill.getEditor();
      editor.history.clear();
    } else {
      // if there's no content return an error message
      this.setState({ error: true });
      this.props.history.push('/');
    }
  };

  // toggle fullscreen
  expandHandler = () => {
    if (this.state.expanded === null) {
      this.setState({ expanded: 'expanded' });
      localStorage.setItem('expanded', 'expanded');
    } else {
      this.setState({ expanded: null });
      localStorage.removeItem('expanded');
    }
  };

  // exit the editor and return to the home screen
  exitHandler = async () => {
    // generate the summary and do whatever processing will be
    // necessary to process the node
    // TODO: alter this so it stores a condensed version of the document instead of plain text
    if (!this.state.deleting && !this.state.error) {
      const summaryLength = 500;
      const editor = this.quill.getEditor();
      // process the text node
      const content = editor.getText();
      const summary = content.substring(0, summaryLength);
      // wait for summary to update before going back to homepage so it will be up to date
      await this.props.processTextNode(this.props.match.params.uuid, summary);
    }
    this.props.history.goBack();
  };

  // select an image.
  selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    // Listen for uploading local image, then save to server
    input.onchange = async () => {
      const file = input.files[0];

      // make sure file is an image
      if (/^image\//.test(file.type)) {
        // save the image to the server
        const url = await this.props.createImageNode(file);
        // push image url to rich editor.
        const range = this.quill.getEditor().getSelection();
        this.quill.getEditor().insertEmbed(range.index, 'image', url);
      } else {
        message.error('The file must be an image', 1);
      }
    };
  };

  isImageUrl = (url) => {
    var expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    return regex.test(url);
  };

  // handle pasting of images
  // these could potentially be stored in a special database table? I'm not sure if
  // externally linked images would be a node type? I don't see why not. i think they're urls
  matcherImageHandler = (node, delta) => {
    // check to see if the image is a URL
    if (this.isImageUrl(node.src)) {
      // if it is, insert the image
      const url = node.src;
      const delta = new Delta();
      return delta.insert({ image: url });
    } else {
      // otherwise, don't paste it
      return new Delta();
    }
  };

  // on pasting text, add line breaks after paragraphs
  matcherLineBreakHandler = (node, delta) => {
    return delta.compose(new Delta().retain(delta.length()).insert('\n'));
  };

  modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ font: [] }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['bold', 'italic', 'underline', 'strike'],
        [
          {
            color: [
              '#fff',
              '#bbbbbb',
              '#272727',
              '#a80b44',
              '#ff0062',
              '#df1f95',
              '#9933ff',
              '#7fba00',
              '#45d458',
              '#31d697',
              '#00a4ef',
              '#4178df',
              '#000080',
              '#56007a',
              '#007c25',
              '#e2d58a',
              '#f8cc52',
              '#fff12b',
              '#ff4500',
              '#f40000',
              '#a0390d',
            ],
          },
          { background: [] },
        ],
        [{ align: null }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        ['code-block', 'blockquote'],
        ['link', 'image', 'video'],
        ['clean'],
        ['expand', 'exit'],
      ],
      handlers: {
        expand: this.expandHandler,
        exit: this.exitHandler,
        image: this.selectLocalImage,
      },
    },
    clipboard: {
      matchVisual: false,
      matchers: [
        ['img', this.matcherImageHandler],
        ['p', this.matcherLineBreakHandler],
      ],
    },
    // blotFormatter: {
    //   overlay: {
    //     style: {
    //       border: '2px solid #41e254'
    //     }
    //   }
    // }
  };

  allowedFormats = [
    'header',
    'font',
    'indent',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'align',
    'list',
    'script',
    'code-block',
    'blockquote',
    'link',
    'image',
    'video',
  ];

  // render the main navbar
  renderHeader = () => {
    // Only render the header if the editor is  expanded
    if (this.state.expanded === null && this.props.nodeData) {
      return <NodeCardHeaderFull node={this.props.nodeData} />;
    }
  };

  // update and save the document name
  saveName = (name) => {
    if (this.state.name !== name) {
      this.props.updateNode({ uuid: this.props.match.params.uuid, name });
    }
    document.title = name || 'Untitled';
    this.setState({ name });
  };

  handleChange(content, delta, source, editor) {
    // Check to see if the document has changed before saving.
    if (content !== this.state.text && this.props.isLoading !== true) {
      const fullDelta = JSON.stringify(editor.getContents());
      this.props.editTextNode({
        uuid: this.props.match.params.uuid,
        content: fullDelta,
      });
      this.setState({ text: content });
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = null;
    document.body.style.height = null;
    document.documentElement.style.overflow = null;
    document.documentElement.style.height = null;
    window.getSelection().removeAllRanges();
  }

  render() {
    if (this.props.isLoading) {
      return (
        <Layout className='page-layout'>
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
      <Layout className='page-layout'>
        <Content className={'text-editor-content ' + this.state.expanded}>
          {this.renderHeader()}
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange}
            modules={this.modules}
            ref={this.ref}
            readOnly={this.state.readOnly}
            formats={this.allowedFormats}
            scrollingContainer={'body'}
          ></ReactQuill>
          <AssociationSider />
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    nodeData: state.nodes.nodeList[ownProps.match.params.uuid],
    isLoading: state.nodes.isFetching,
  };
};

export default connect(mapStateToProps, {
  fetchTextNode,
  editTextNode,
  deleteTextNode,
  processTextNode,
  createImageNode,
  updateNode,
  setActiveNode,
  fetchAssociations,
})(QuillEditor);
