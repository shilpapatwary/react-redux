import React, { Component } from 'react';
import Channel from './Channel';
import MessageContainer from './MessageContainer';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { ChannelData, WorkspaceState, WorkspaceData, MessageData } from '../types';
import {showWorkspacesAction, addChannelAction, submitMessageAction, setChannelAction, startUserThreadAction} from '../actions';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';

interface ChannelContainerProps{
    channels?: ChannelData[],
    currentWorkspace?: WorkspaceData,
    showWorkspaceContainer: any,
    onAddChannel: any,
    onMessageSent: any,
    currentChannel?: ChannelData,
    setCurrentChannel: any,
    startUserThread: any
}
interface  ChannelContainerState {
         showChannelForm: boolean,
         showMessageSection: boolean,
         showUserForm: boolean,
         hasChannels: boolean
}
export class channelsContainer extends Component <ChannelContainerProps, ChannelContainerState>{
 constructor(props: ChannelContainerProps){
     super(props);
     this.state = {
         showChannelForm: false,
         showMessageSection: true,
         showUserForm: false,
         hasChannels: props.channels ? props.channels.length > 0 : false
     }
     this.addChannelToWorkspace = this.addChannelToWorkspace.bind(this);
     this.openChannelForm = this.openChannelForm.bind(this);
     this.openUserForm = this.openUserForm.bind(this);
     this.closeForm = this.closeForm.bind(this);
     this.startUserThread = this.startUserThread.bind(this);
 }

 addChannelToWorkspace(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    event.preventDefault();
    this.props.onAddChannel({
        id: `channel${Math.floor(Math.random() * 100000)}`,
        name: (document.getElementById('workspaceChannel') as HTMLInputElement).value,
        users:[],
        messages:[]
    });
    this.setState({showChannelForm: false,
        showMessageSection: true})
 }

 openChannelForm() {
     this.setState({ showChannelForm: true,
        showMessageSection: false})
 }

 startUserThread(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    event.preventDefault();
    const username = (document.getElementById('workspaceUsername') as HTMLInputElement).value;
    this.props.startUserThread(username, true);
 }
 
 openUserForm() {
    this.setState({ showChannelForm: false,
        showMessageSection: false,showUserForm: true})
 }

 closeForm() {
     this.setState({ showChannelForm: false,
        showMessageSection: true,
        showUserForm: false});
 }

  render() {
    return  this.props.channels && this.props.currentWorkspace && this.props.currentChannel ? (
        <section id="channelSectionContainer">
            <section id="workspaceHeader">
                <AppBar  position="static" style= {{backgroundColor: 'inherit', textAlign:'left'}}>
                <Typography className="backButton" variant="title" color="inherit" style= {{lineHeight: '50px'}} onClick={this.props.showWorkspaceContainer}>
                <i className="fa fa-arrow-left"></i> Back To Workspaces
                    </Typography>
                </AppBar>
            </section>
            
            <section className="mainSection">
                <div className="channelsSection">
                    <div className="channelHeaderSection"><span >Channels </span><i className="fa fa-plus-square addChannel" onClick={this.openChannelForm}></i></div>
                    <ul id="channelsContainer">
                             {
                                this.props.channels.map(channel => {
                                    return <Channel key={channel.id} channel={channel} setSelectedChannel={this.props.setCurrentChannel}></Channel>
                                })
                            }
                    </ul>  
                    <div className="channelHeaderSection"><span >Direct Messages </span><i className="fa fa-plus-square" onClick={this.openUserForm}></i></div>
                    <ul id="usersThreadContainer">
                             {
                                this.props.currentWorkspace.users.map(user => {
                                   return user.chat ? <li className="workspaceUser" key={Math.random()*12345}>{user.name}</li> : null;
                                })
                            }
                    </ul> 
                </div>
               {
                   this.state.showMessageSection && this.state.hasChannels &&
                  <MessageContainer key={this.props.currentChannel.id} selectedChannel={this.props.currentChannel} saveMessages={this.props.onMessageSent}></MessageContainer>
               } 
                
            {
                this.state.showChannelForm && 
                <section id="addChannelForm">
                    <span><i className="fa fa-window-close close-form" aria-hidden="true" onClick={this.closeForm}></i></span>
                    <form id="addChannelToWorkspace">
                        <input type="text" id="workspaceChannel" className="channelInput" placeholder="Channel Name"/>
                        <input type="submit" id="submitWorkspaceChannel" onClick={this.addChannelToWorkspace}/>
                    </form>
                </section>
            }
            {
                this.state.showUserForm && 
                <section id="addUserForm">
                    <span><i className="fa fa-window-close close-form" aria-hidden="true" onClick={this.closeForm}></i></span>
                    <form>
                        <input type="text" id="workspaceUsername" className="userInput" placeholder="User Name"/>
                        <input type="submit" onClick={this.startUserThread}/>
                    </form>
            </section>
            }
                
            </section>
            
    </section>
    ): <div>Loading...</div>;
  }
}

const mapStateToProps = (state: WorkspaceState) => {
    return{
        channels: state.channelsList,
        currentChannel: state.currentChannel,
        currentWorkspace: state.currentWorkspace
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        showWorkspaceContainer: () => {dispatch(showWorkspacesAction())},
        onAddChannel: (channel: ChannelData) => {dispatch(addChannelAction(channel))},
        onMessageSent: (cid: string, message:string) => {dispatch(submitMessageAction(cid, message))},
        setCurrentChannel: (channel: ChannelData) => {dispatch(setChannelAction(channel))},
        startUserThread: (username: string, chat: boolean) => {dispatch(startUserThreadAction(username, chat))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(channelsContainer);