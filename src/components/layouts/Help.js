import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
// custom code
import './css/Help.less';
import MainSider from '../elements/MainSider';
import IOBar from '../elements/IOBar';
// import defaultHeader from '../../resources/help.png';

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
						}}
					>
						<div style={{ position: 'fixed', width: '100%' }}>
							<IOBar />
						</div>
						{/* <img style={{ width: '100%' }} src={defaultHeader} alt='stars'></img>*/}
						<div className='help-container' style={{ padding: '5.7rem 17rem 1rem' }}>
							<h2 style={{ fontSize: '2rem' }}>Help Page</h2>
							<p>
								Hello there! Welcome to the help page! This is where you can get the help you need,
								so you can rest easy. Allow me to explain exactly what is going on here. First
								things first, you are on the help page! It's a nice place to hang out. There's all
								kinds of wonderful things you learn while you are here!
							</p>
							<h2>Keyboard Shortcuts</h2>
							<p>
								For now the main keyboard shortcuts, which currently only work in the core app (not
								in tabs you open in your web browser) are as follows:
							</p>
							<ul>
								<li>CMD/CTRL+G - jump to the graph constellation browser</li>
								<li>CMD/CTRL+H - jump to the home page</li>
								<li>CMD/CTRL+L - jump to the search bar</li>
								<li>CMD/CTRL+F - activate in-page search</li>
								<li>CMD/CTRL+J - jump to starboard</li>
								<li>CMD/CTRL+OPTION/ALT+1 - save the current node to the quick menu</li>
								<li>CMD/CTRL+1 - jump to #1 on the quick menu if you have saved something there</li>
								<li>Quick-Menu - the quick menu will also work with the number keys 1-9</li>
							</ul>
							<h2>What is Synthona?</h2>
							<p>
								Synthona is a way of being & thinking. Synthona allows you to create, explore, and
								share networks made out of content! You can use Synthona for whatever you want, some
								ideas include "building a mind palace, storing URL bookmarks, exploring your
								filesystem, thinking, note-taking, as a memory-expansion for your brain, for
								world-building, planning, and so forth...there are few limits!" That might sound
								overwhelming but it's really not so bad once you get familiar. Synthona tries its
								best not to make any changes to your computer outside of itself, so feel free to
								click around & experiment, that is the best way to learn after all!
							</p>
							<h2>What are nodes and associations?</h2>
							<p>
								Synthona is premised on the idea that all content is a <i>node</i> which can be
								associated, connected, related, to any other piece of content. A connection between
								any two pieces of content is called an <i>association</i>. If you understand these
								two ideas, you understand Synthona! That's all there is to it, the rest is just
								building on these two assumptions.
							</p>
							<h2>What should I do first?</h2>
							<p>
								You can start by uploading or creating some content, you do this by clicking the
								white circular button at the top of the page. This will transform it into a plus
								sign and put the IO bar into <i>create-mode</i>.
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
							<h2>The Graph Constellation Browser</h2>
							<p>
								The Graph Browser, sometimes known as the Constellation browser, is one way to
								browse through your nodes and associations! You can get there clicking the "graph"
								icon <Icon type={'deployment-unit'} theme='outlined' /> on any node, on the IO bar,
								or by clicking the "graph" option from the main menu. If you click it from a
								specific node, you'll see the associations for that node and their relationships to
								each other displayed. Accessing it from the IO bar or options menu will instead show
								a list of the most recently accessed nodes! Once you are in the constellation
								browser you can zoom in and out by scrolling up and down, jump to a node by double
								clicking it, or jump through the graph browser by right clicking on a node.
							</p>
							<h2>What are do all these icons mean?</h2>
							<p>
								If you hover over most icons for a couple of seconds a tooltip should show up which
								explains what the button does, but I've written out a guide here as well so you can
								be confident of what your clicks will accomplish.
							</p>
							<h3>
								Associations <Icon type={'branches'} theme='outlined' />
							</h3>
							<p>
								This is the associations icon. It mostly appears on node cards in the node explorer.
								Clicking it will typically bring up a menu which lists the associations for a given
								node and allows you to add new ones.
							</p>
							<Icon type={'branches'} theme='outlined' className='help-icon' />
							<h3>
								Light Bulb <Icon type={'bulb'} theme='outlined' />
							</h3>
							<p>
								The light bulb is the universal symbol for having a good idea, which is why it was
								chosen as the "good idea" button. Whenever you click the light bulb icon the node in
								question will be marked as viewed, bumped, jumped to the top of the page. You can
								click this button as much as you want and nothing bad will happen!
							</p>
							<Icon type={'bulb'} theme='outlined' className='help-icon' />
							<h3>
								Graph Icon <Icon type={'deployment-unit'} theme='outlined' />
							</h3>
							<p>
								This icon will take you to the graph constellation browser! I'll explain more about
								that a little later.
							</p>
							<Icon type={'deployment-unit'} theme='outlined' className='help-icon' />
							<h3>
								Star <Icon type={'star'} theme='outlined' />
							</h3>
							<p>
								This button will allow you to pin a node to your starboard! The Starboard is a sort
								of top-level root page, but you can think of it as one of those tackboards you would
								use pushpins on in real life to hang sticky notes on! Store stuff on the starboard
								for a short time or a long time, it's up to you!
							</p>
							<Icon type={'star'} theme='outlined' className='help-icon' />
							<h3>
								Open In Browser <Icon type={'global'} theme='outlined' />
							</h3>
							<p>
								This button will open the active node in your default web browser! This is useful
								for various reasons, like if you want to run the application in your browser as a
								tab, if you wanted to save images or files into your downloads folder, or as a way
								to manage additional Synthona tabs.
							</p>
							<Icon type={'global'} theme='outlined' className='help-icon' />
							<h3>
								Visible <Icon type={'eye'} theme='outlined' />
							</h3>
							<p>
								Clicking this icon allows you to toggle whether a node is visible on the homepage or
								not. Nodes which are hidden from the homepage will only be accessible through their
								associations. This allows you to hide content behind other content.
							</p>
							<Icon type={'eye'} theme='outlined' className='help-icon' />
							<h3>
								Searchable <Icon type={'search'} theme='outlined' />
							</h3>
							<p>
								Clicking this icon allows you to toggle whether a node will appear in a search or
								not.
							</p>
							<Icon type={'search'} theme='outlined' className='help-icon' />
							<h3>
								Image Picker & Replacer <Icon type={'picture'} theme='outlined' />
							</h3>
							<p>
								Clicking this is contextual, but has to do with picking or replacing an image on a
								node. In URL nodes, you can replace the node's preview image with the URL of any
								image from the internet or from elsewhere in Synthona (right click and "copy image
								address" to get replacement images). In File nodes, for the time being at least,
								this icon will allow you to pick a file from your filesystem to use as the preview
								image. LONG STORY SHORT...The Picture Icon has to do with customization of pictures
								& images! Experiment with it to customize appearances!
							</p>
							<Icon type={'picture'} theme='outlined' className='help-icon' />
							<h3>
								Show in Folder <Icon type={'folder-open'} theme='outlined' />
							</h3>
							<p>
								This icon appears on nodes which are files...Clicking it will show the file in the
								folder! This is really handy because it means Synthona can be used to create
								shortcuts to specific files in your filesystem.
							</p>
							<Icon type={'folder-open'} theme='outlined' className='help-icon' />
							<h3>
								Delete <Icon type={'delete'} theme='outlined' />
							</h3>
							<p>This is the garbage can, it lets you put delete nodes from the system!</p>
							<Icon type={'delete'} theme='outlined' className='help-icon' />
							<h3>
								Exports <Icon type={'save'} theme='outlined' />
							</h3>
							<p>
								Exports allow you to share nodes and their associations between computers as{' '}
								<i>.synth</i> files, which can be re-imported by anyone into any Synthona instance
								on any computer. These files are represented within Synthona by this{' '}
								<Icon type={'save'} theme='outlined' /> icon. If you click this icon on a node in
								your system, it will generate an export based on the node you clicked it from.
								Exports contain the node in question, all the nodes associated with it, and their
								associations with each other. More specificity in exports is a planned feature for
								the future as well.
							</p>
							<p>
								If you have created or imported a Synthona export into your Synthona instance, you
								will see this icon on the export page. Clicking it will "unpack" the export,
								importing all the nodes and associations it contains into your profile. Once you
								click this, it will be replaced by an "undo" <Icon type={'undo'} theme='outlined' />{' '}
								icon which will allow you to "repack" the export. The undo option will delete all
								the nodes which unpacking created, which makes unpacking a reversible operation. Be
								warned however! If you have made changes to any of the nodes you imported they will
								still be removed (at least that's how it works right now).
							</p>
							<p>
								Sythona Exports are great for all kinds of things...sharing your thoughts with
								others, sharing files for a project, sharing photo albums, and more! If you're a
								developer, you may also be interested to know that these exports are largely just
								JSON which means you could potentially integrate them with other software.
							</p>
							<Icon type={'save'} theme='outlined' className='help-icon' />
							<h2>How do I edit the name of a node?</h2>
							<p>If you double click the title it should turn into an editable text field.</p>
							<h2>How do files work starting in Synthona 1.2.3?</h2>
							<p>
								Starting with version 1.2.3, it is possible to link files in your filesystem to
								Synthona by creating file nodes. File nodes existed before, but they didn't do much.
								Starting with version 1.2.3, it is possible to open certain file types (photoshop
								projects, .txt files, word documents, images, .mp3s, .pdfs, 3D models, and so forth)
								in their default program directly from Synthona! The way this works is pretty
								straightforward...Once you create a file node you can either right click the node
								card to launch the file, or click through to the landing page to launch.
							</p>
							<p>
								When you delete a file node, it will not delete the file itself, only the node in
								Synthona. You should know however, that if you imported a node into Synthona from a
								.synth export and delete the node, it WILL delete the file...Why this difference?
								The idea is basically that Synthona cleans up after itself. If it creates a file, it
								will delete it, but if YOU created the file, Synthona will not delete it.
							</p>
							<p>
								In other words, Synthona will not mess with your stuff! If you want to keep imported
								files long-term it is recommended that you copy them out of the import-location into
								a better place!
							</p>
							<h2>Context Actions starting in Synthona 1.2.3</h2>
							<p>
								Starting with version 1.2.3, certain node types now have special actions which are
								automatically launched when you "right-click" a node. URLS will open in your browser
								when you right click them, files will open in their default program, text nodes will
								take you to their page in the association browser rather than to the editor...Give
								it a try and see how it goes! In the future this may be made configurable.
							</p>
							<h2>
								Help! I hid a node from both search and the explore page. How do I find it again?
							</h2>
							<p>
								No problem! The way to find your lost node is to set another node, preferably a
								well-connected one, temporarily to <i>hidden from explore</i> by clicking the{' '}
								<Icon type={'eye'} theme='outlined' /> icon so it toggles to{' '}
								<Icon type={'eye-invisible'} theme='outlined' />. Now, from that well-connected node
								which you've hidden from the explore page, go to add a new association. It is
								possible to associate hidden nodes to other hidden nodes, and so you should be able
								to associate to it and find it again that way.
							</p>
							<h2>Is my data being backed up anywhere?</h2>
							<p>
								Only in the app database which is stored on your computer. If you want to save a
								copy of your data elsewhere, you can generate manual backups as often as you want
								through the export functionality. If you go to the options menu there is a button
								labeled "export all user data". This will put all your nodes and associations into a
								.synth file which will be added to your homepage. You can then click through to
								download that file. That .synth file containing all your data can be imported back
								in later, onto a version on another computer, or stored as a backup. Also, although
								it's not really designed for this, you could break the .synth file open to get at
								the files themselves. If you need to get at the specific files in there, you can
								change the file extension from .synth to .zip which should allow your computer to
								de-compress the archive although some of the files might have...computery...names.
							</p>
							<h2>Where is the data stored on my computer?</h2>
							<p>
								Your data is stored in your user data folder. This will be different depending on
								your operating system, but you can see the specific folder by click 'advanced' in
								the top menu bar and 'show config'. The folder containing the config file also
								contains some core app files along with the core 'data' folder and sqlite database.
								You shouldn't have to ever mess with any of this unless you are a developer or you
								really know what you are doing, as it is possible to break the app if you start to
								mess with stuff in there!
							</p>
							<h2>Context Actions starting in Synthona 1.2.3</h2>
							<p>
								Starting with version 1.2.3, certain node types now have special actions which are
								automatically launched when you "right-click" a node. URLS will open in your browser
								when you right click them, files will open in their default program, text nodes will
								take you to their page in the association browser rather than to the editor...Give
								it a try and see how it goes! In the future this may be made configurable.
							</p>
							<h2>What is the license, do you accept pull requests?</h2>
							<p>
								Synthona is an open-source project and is licensed under GPLv3 which means if you
								want to take things into your own hands you're free to fork the project, but I am
								also more than willing to hear out your concerns and try to implement changes myself
								if I can or accept pull requests if they fit the project roadmap! There is a very
								clear vision for where the app is headed, but suggestions are still welcome. The
								goal here is to make something which benefits as many people as possible. If you're
								interested in taking a look at the code feel free to check out the project on{' '}
								<a
									href='https://www.github.com/Yarnpoint'
									target='_blank'
									rel='noopener noreferrer'
								>
									github
								</a>
								!
							</p>
							<h2>How do I get the latest update?</h2>
							<p>
								Easy! Just go to{' '}
								<a
									href='https://Yarnpoint.itch.io/Yarnpoint'
									target='_blank'
									rel='noopener noreferrer'
								>
									yarnpoint.itch.io
								</a>
								{', '}
								download the latest version, and install it! All your data will carry over, all you
								have to do is close the app, and run the installer for the new version. Because the
								data is stored outside the app, you can overwrite the old version with the new
								version without fear. If you're the type to worry, it couldn't hurt to make a little
								backup before updating just in case, but we do test everything before releasing as
								well! It's worth updating eventually, because updates often add new features which
								expand functionality.
							</p>
							<p>
								At some undecided point in the future we would like to add automatic updates, but
								unfortunately microsoft charges like $300 for a certificate to allow you to do that,
								and Mac has similar restrictions. A workaround may be possible, but we haven't
								gotten around to that yet. Maybe someday! For now updates are manual.
							</p>
							<h2>I want to financially support development, what should I do?</h2>
							<p>
								There is a{' '}
								<a
									href='https://www.patreon.com/yarnpoint'
									target='_blank'
									rel='noopener noreferrer'
								>
									patreon
								</a>{' '}
								or you can donate at{' '}
								<a
									href='https://yarnpoint.itch.io/yarnpoint'
									target='_blank'
									rel='noopener noreferrer'
								>
									yarnpoint.itch.io
								</a>{' '}
								where you downloaded the app originally, and I may add more options in the future.
								We have a lot of ideas for improvements to this application including things like
								P2P features, automatic updates, theme support, plugin support, a lot of other node
								types, maps, web-features, analytics, social features, 3D features, LAN connections
								between instances, and so much more, but we can't afford to work on features full
								time at the moment. This project was originally designed to function as a
								distrubuted P2P social network, but there is still a lot of work to be done before
								that is possible and funding would allow me to work on that and other features
								including a phone application. If we get enough funding I would like to eventually
								found a worker-owned democratic co-op organization around the project!
							</p>
							<p>
								I am also hoping to add some Patreon bonuses like a Discord, custom icons for
								Synthona (other colors than yellow for example), and more, but you should know that
								I have just been so busy that this has fallen into the background...never fear! It
								is on my long to-do list. If this sort of thing sounds interesting to you, feel free
								to say something on{' '}
								<a
									href='https://www.twitter.com/Yarnpoint'
									target='_blank'
									rel='noopener noreferrer'
								>
									twitter
								</a>{' '}
								about it or reach out to the synthona email account, and I could maybe bump it up as
								a priority! User feedback does play a role in what I decide to work on.
							</p>
							<h2>I have a bug report, feature request, or other inquiry?</h2>
							<p>
								Please send an email to{' '}
								<a
									href='mailto:synthona@gmail.com'
									target='_blank'
									rel='noopener noreferrer'
									type='email'
								>
									synthona@gmail.com
								</a>{' '}
								or reach out on{' '}
								<a
									href='https://www.twitter.com/yarnpoint'
									target='_blank'
									rel='noopener noreferrer'
								>
									twitter
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
