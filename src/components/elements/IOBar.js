import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Button, Input, Select, Icon, message } from 'antd';
// custom code
import { validUrl, isImageUrl } from '../../utils/inputValidation';
import './IOBar.less';
import {
  signOut,
  createTextNode,
  createImageNode,
  createNode,
  searchNodes,
  showComponent,
  hideComponent,
} from '../../redux/actions';
// destructure antd components
const { Header } = Layout;
const { Option } = Select;

class IOBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.query.searchQuery || '',
      nodeTypes: this.props.query.type || 'all',
      createType: null,
      queryType: null,
      inputMode: 'query',
      modeIcon: 'search',
      placeholder: 'query',
    };
  }
  // show modal to confirm deletion
  toggleInputMode = () => {
    if (this.state.inputMode === 'query') {
      this.setState({
        inputMode: 'create',
        modeIcon: 'plus',
        placeholder: 'create',
        nodeTypes: 'text',
      });
    } else {
      this.setState({
        inputMode: 'query',
        modeIcon: 'search',
        placeholder: 'query',
        nodeTypes: 'all',
      });
    }
  };

  toggleMainSider = async () => {
    // await this.props.showComponent('mainSider');
    if (this.props.mainSider) {
      this.props.hideComponent('mainSider');
    } else {
      this.props.showComponent('mainSider');
    }
    console.log(this.props.mainSider);
  };

  // handle text input
  commandHandler = () => {
    switch (this.state.inputMode) {
      case 'query':
        return this.props.searchNodes({
          searchQuery: this.state.input,
          type: this.state.nodeTypes,
        });
      case 'create':
        return this.createNodeHandler();
      default:
        return;
    }
  };
  // handle the creation of different node types
  createNodeHandler = () => {
    switch (this.state.nodeTypes) {
      case 'text':
        this.props.createTextNode(this.state.input);
        // clear the input bar
        this.setState({ input: '' });
        break;
      case 'image':
        this.selectLocalImage();
        break;
      case 'url':
        // if the URL is an image add an image node
        if (isImageUrl(this.state.input)) {
          this.props.createNode({
            local: false,
            type: 'image',
            name: this.state.input,
            summary: this.state.input,
            content: this.state.input,
          });
          this.setState({ input: '' });
          // otherwise add a regular URL
        } else if (validUrl(this.state.input)) {
          this.props.createNode({
            local: false,
            type: 'url',
            name: this.state.input,
            summary: this.state.input,
            content: this.state.input,
          });
          // clear the input bar
          this.setState({ input: '' });
        } else {
          message.error('You must enter a valid URL', 1);
        }
        break;
      case 'collection':
        this.props.createNode({
          local: true,
          type: 'collection',
          name: this.state.input,
          summary: '',
          content: this.state.input,
        });
        // clear the input bar
        this.setState({ input: '' });
        break;
      default:
        return;
    }
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
        await this.props.createImageNode(file, this.state.input);
        // clear the input bar
        this.setState({ input: '' });
      } else {
        message.error('The file must be an image', 1);
      }
    };
  };

  // include an "all" option for queries
  renderSelectBefore = () => {
    if (this.state.inputMode === 'query') {
      return (
        <Select
          showSearch
          showArrow={false}
          value={this.state.nodeTypes}
          style={{ width: '7rem' }}
          onChange={(value) => this.setState({ nodeTypes: value })}
        >
          <Option value='all'>all</Option>
          <Option value='text'>text</Option>
          <Option value='image'>images</Option>
          <Option value='url'>urls</Option>
          <Option value='collection'>collections</Option>
        </Select>
      );
    } else {
      // exclude "all" option for creating nodes
      return (
        <Select
          showSearch
          showArrow={false}
          value={this.state.nodeTypes}
          style={{ width: '7rem' }}
          onChange={(value) => this.setState({ nodeTypes: value })}
        >
          <Option value='text'>text</Option>
          <Option value='url'>url</Option>
          <Option value='image'>image</Option>
          <Option value='collection'>collection</Option>
          {/* <Option value='file'>file</Option> */}
        </Select>
      );
    }
  };

  render() {
    return (
      <div>
        <Header className='page-header'>
          <ul className='nav-list'>
            <li className='nav-item io-sider-button'>
              <Link type='default' to={`/`}>
                <Icon type={'home'} theme='outlined' />
              </Link>
            </li>
            <li className='nav-item io-sider-button'>
              <Button type='default' shape='circle' onClick={(e) => this.toggleMainSider()}>
                <Icon type={'bars'} theme='outlined' />
              </Button>
            </li>
            <li className='nav-item create-node-button'>
              <Button type='default' shape='circle' onClick={(e) => this.toggleInputMode()}>
                <Icon type={this.state.modeIcon} theme='outlined' />
              </Button>
            </li>
            <li className='nav-search'>
              <Input
                onPressEnter={(value, event) => this.commandHandler()}
                maxLength={500}
                value={this.state.input}
                onChange={(e) => this.setState({ input: e.target.value })}
                defaultValue={this.props.query.searchQuery || ''}
                placeholder={this.state.placeholder}
                addonBefore={this.renderSelectBefore()}
                className='nav-search-input'
              />
            </li>
            <li className='mode-toggle nav-item'>
              <Button
                type='ghost'
                shape='circle'
                onClick={this.commandHandler}
                style={{ color: 'rgba(249, 247, 188, 1) ' }}
              >
                <Icon type={this.state.modeIcon} theme='outlined' />
              </Button>
            </li>
          </ul>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    query: state.nodes.query,
    mainSider: state.components.componentList['mainSider'],
  };
};

export default connect(mapStateToProps, {
  signOut,
  createTextNode,
  searchNodes,
  createNode,
  createImageNode,
  showComponent,
  hideComponent,
})(IOBar);
