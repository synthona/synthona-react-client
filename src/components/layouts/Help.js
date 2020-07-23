import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
// custom code
import './css/Help.less';
import MainSider from '../elements/MainSider';
import IOBar from '../elements/IOBar';

const { Content } = Layout;

class Help extends Component {
  componentDidMount() {
    document.title = 'Help';
    // temporary fix to undo whatever is setting overflow hidden on-login
    document.body.style.removeProperty('overflow');
  }

  renderMainSider = () => {
    if (this.props.mainSider) {
      return <MainSider />;
    }
  };

  render() {
    return (
      <Layout className='page-layout'>
        <Layout>
          {this.renderMainSider()}
          <Content
            style={{
              minHeight: '100vh',
              backgroundColor: '#e0dcc7',
              textAlign: 'left',
              paddingBottom: '3rem',
            }}
          >
            <IOBar />
            <div className='help-container' style={{ padding: '3rem 17rem 1rem' }}>
              <h2>Help!</h2>
              <p>
                Hello there! Welcome to the help page! This is where you can get the help you need,
                so you can rest easy. Allow me to explain exactly what is going on here. First
                things first, you are on the help page! You can leave whenever you want or if you
                like you can hang out here for a while. It's a nice place to hang out. There's all
                kinds of wonderful things you learn while you are here.
              </p>
              <h2>What is Synthona?</h2>
              <p>
                Synthona allows you to create, explore, and share associative-maps made out of
                content! That might sound confusing but it's really not so bad once you get
                familiar. It's like learning to read, once you understand Synthona interactions with
                the interface become second nature.{' '}
                <b>
                  The good news is that you cannot mess anything up, Synthona will not make any
                  changes to any content outside itself.
                </b>{' '}
                Even if you upload a file, Synthona will only make a copy, the original file will
                still exist on your computer. The worst thing you can do is delete something from
                Synthona, but that action is clearly marked by a garbage can.
              </p>
              <h2>What should I do first?</h2>
              <p>
                You can start by uploading or creating some content, you do this by clicking the
                rainbow button at the top of the page. This will transform it into a plus sign and
                put the IO bar into <i>create-mode</i>.
              </p>
              <p>
                From there, to the left of the input field there is a dropdown menu which contains
                some content types. You can select one of those which will prepare the IO bar to
                create that content. For most content types you can type a name for the node you're
                about to create into the input field and it will automatically be added to the
                generated node. The exception is urls which don't allow a name on creation since you
                have to paste the url into that space instead. To finish creating a node, hit enter
                in the input bar or click the button to the right side of the text input. That's it!
                Now it's in the system.
              </p>
              <h2>What are nodes and associations?</h2>
              <p>
                That is a very specific question! I'm glad you asked it, because it cuts right to
                the heart of what Synthona is and does. This application is premised on the idea
                that all content is a <i>node</i> which can be associated, connected, related, to
                any other piece of content. A connection between any two pieces of content is called
                an <i>association</i>. If you understand these two ideas, you understand Synthona!
                That's all there is to it, the rest is just building on these two assumptions.
              </p>
              <h2>How do I edit the name of a node?</h2>
              <p>If you double click the title it should turn into an editable text field.</p>
              <h2>What are do all these icons mean?</h2>
              <p>
                If you hover over most icons for a couple of seconds a tooltip should show up which
                explains what the button does, but I've written out a guide here as well so you can
                be confident of what your clicks will accomplish.
              </p>
              <h3>
                1) Associations <Icon type={'branches'} theme='outlined' />
              </h3>
              <p>
                This is the icon you'll see whenever associations are in-play. It mostly appears on
                node cards in the node explorer. Clicking it will typically bring up a menu which
                lists the associations for a given node and allows you to add new ones.
              </p>
              <Icon type={'branches'} theme='outlined' className='help-icon' />
              <h3>
                2) Light Bulb <Icon type={'bulb'} theme='outlined' />
              </h3>
              <p>
                The light bulb is the universal symbol for having a good idea, which is why it was
                chosen as the "good idea" button. Whenever you click the light bulb icon the node in
                question will be pushed to the top of the home page. You can click this button as
                much as you want and nothing bad will happen!
              </p>
              <Icon type={'bulb'} theme='outlined' className='help-icon' />
              <h3>
                3) Synthona Package <Icon type={'deployment-unit'} theme='outlined' />
              </h3>
              <p>
                Synthona packages allow you to share nodes and their associations between computers
                as <i>.synth</i> files, which can be re-imported by anyone into any synthona
                instance on any computer. These files are represented within synthona by this icon.
                If you click this icon, it will generate an export package based on the node you
                clicked it from. Synthona packages contain the node in question, all the nodes
                associated with it, and their associations with each other.
              </p>
              <Icon type={'deployment-unit'} theme='outlined' className='help-icon' />
              <h3>
                4) Visible <Icon type={'eye'} theme='outlined' />
              </h3>
              <p>
                Clicking this icon allows you to toggle whether a node is visible on the homepage or
                not. Nodes which are hidden from the homepage will only be accessible through their
                associations. This allows you to hide content behind other content.
              </p>
              <Icon type={'eye'} theme='outlined' className='help-icon' />
              <h3>
                5) Searchable <Icon type={'search'} theme='outlined' />
              </h3>
              <p>
                Clicking this icon allows you to toggle whether a node will appear in a search or
                not.
              </p>
              <Icon type={'search'} theme='outlined' className='help-icon' />
              <h3>
                5) Delete <Icon type={'delete'} theme='outlined' />
              </h3>
              <p>
                This is the garbage can, it lets you put delete nodes from the system! Where do they
                go after that? Nobody knows!
              </p>
              <Icon type={'delete'} theme='outlined' className='help-icon' />
              <h2>Why are there so many concepts here!?</h2>
              <p>
                That's a good question! I tried to explain everything as best I could but I'm
                worried it may still be confusing, if you have critiques of specific concepts or
                ideas I am happy to hear them, because this application is always a work in progress
                and I would like to make it easier to use! That said, there were certain concepts I
                had to invent because they just didn't exist. My hope is that as people interact
                with Synthona they will come up with their own ideas for improvements and ways to
                increase the clarity of presentation.
              </p>
              <h2>What if I have an idea for a change to the app?</h2>
              <p>
                Synthona is an open-source project and is licensed under GPLv3 which means if you
                want to take things into your own hands you're free to fork the project, but I am
                also more than willing to hear out your concerns and try to implement changes myself
                if I can! The goal here is to make something which benefits as many people as
                possible.
              </p>
              <h2>I want to financially support development, what should I do?</h2>
              <p>
                There is a{' '}
                <a
                  href='https://www.patreon.com/synthona'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  patreon
                </a>{' '}
                you can donate to if you want, and I may add more donation options in the future.
                Anything helps, I spent quite a bit of time developing this idea and am currently
                between jobs. I have a lot of ideas for improvements to this application including
                things like P2P features, theme support, plugin support, and a lot of other node
                types, but I can't really afford to work on this full-time without funding.
              </p>
              <h2>Can I contact you with a bug report, feature request, or other inquiry?</h2>
              <p>
                Yes, please send an email to{' '}
                <a
                  href='mailto:synthona@gmail.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  type='email'
                >
                  synthona@gmail.com
                </a>{' '}
                and we will get things sorted out as soon as possible!
              </p>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    mainSider: state.components.componentList['mainSider'],
  };
};

export default connect(mapStateToProps)(Help);
