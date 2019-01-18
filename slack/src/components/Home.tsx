import React, { Component } from 'react';
import '../Slack.css';
import 'font-awesome/css/font-awesome.min.css';
import WorkspaceContainer from '../components/WorkspaceContainer';
import ChannelsContainer from '../components/ChannelsContainer';
import {MessageData, WorkspaceData, UserData, ChannelData, SlackActionTypes} from '../store/SlackApp/types';
import { store } from '..';
import {Provider} from 'react-redux';

interface HomeState{
      workspaces?: WorkspaceData[],
      channels?:ChannelData[],
      showWorkspaces?: boolean,
      showChannels?: boolean,
      currentWorkspace?:WorkspaceData,
      currentChannel?: ChannelData
}
class Home extends Component<any, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      workspaces: store.getState().workspaces,
      channels:store.getState().channelsList,
      showWorkspaces: store.getState().showWorkspaces,
      showChannels: store.getState().showChannels,
      currentWorkspace:store.getState().currentWorkspace,
      currentChannel: store.getState().currentChannel
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        workspaces: store.getState().workspaces,
        channels:store.getState().channelsList,
        showWorkspaces: store.getState().showWorkspaces,
        showChannels: store.getState().showChannels,
        currentWorkspace:store.getState().currentWorkspace,
        currentChannel: store.getState().currentChannel
      })
    })
  }
  render() {
    return (
    <Provider store={store}>
      <section id="workspaceParentContainer">
        {this.state.showWorkspaces && this.state.workspaces && 
        <WorkspaceContainer key={Math.random()*12345} ></WorkspaceContainer>}
      </section>
      <section id="channelParentContainer">
      {this.state.currentWorkspace &&this.state.showChannels && this.state.channels && this.state.currentChannel && 
      <ChannelsContainer key={Math.random()*12345}></ChannelsContainer>}
      
      </section>
    </Provider>
    );
  }
}

export default Home;
 