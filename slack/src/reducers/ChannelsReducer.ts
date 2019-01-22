import { WorkspaceState, SlackActionTypes } from "../types";
import { AnyAction } from 'redux';

export function startUserThreadAction(currentState: WorkspaceState, action: AnyAction) {
    if(currentState.workspaces !== undefined && currentState.currentWorkspace !== undefined){
        const oldWorkspaceUsers = currentState.currentWorkspace.users;
        const oldCurrentWorkspace = currentState.currentWorkspace;
        const user = oldWorkspaceUsers.filter(u => u.name === action.payload.username)[0];
        if(user){
            const newUser = Object.assign({}, user, {chat: action.payload.chat});
        const newUsers = oldWorkspaceUsers.map(u => u.id === user.id ? newUser : u);
        const newWorkspace = Object.assign({}, currentState.currentWorkspace, {users: newUsers});
        const newWorkspaces = currentState.workspaces.map(w => w.id === oldCurrentWorkspace.id ? newWorkspace : w);
        return Object.assign({}, currentState, {currentWorkspace: newWorkspace, workspaces: newWorkspaces});
        }else{
            return currentState;
        }
        
    }else{
        return currentState;
    }
    
}
export function setChannelReducer(currentState: WorkspaceState, action: AnyAction) {
    return Object.assign({}, currentState, {currentChannel: action.payload.channel});
}


export function addChannelReducer(currentState: WorkspaceState , action: AnyAction) {
   if(currentState.currentWorkspace && currentState.workspaces) {
    const oldWorkspace = currentState.currentWorkspace;
    const oldChannels = oldWorkspace.channels;
    const newChannels = [...oldChannels, action.payload.channel];
   
    const newWorkspace = Object.assign({}, oldWorkspace, {channels: newChannels});
    const newWorkspaces = currentState.workspaces.map(i => i.id === oldWorkspace.id ? newWorkspace : i);
    return Object.assign({}, currentState, {workspaces: newWorkspaces, currentChannel: action.payload.channel ,currentWorkspace: newWorkspace, channelsList: newChannels});
    }else{
        return currentState;
    }
}


 export function submitMessageReducer(currentState: WorkspaceState , action: AnyAction) {
    if(currentState.currentChannel && currentState.currentWorkspace && currentState.workspaces){
        const oldWorkspace = currentState.currentWorkspace;
        const newChannelMessages = [...currentState.currentChannel.messages, action.payload.message];
        const newChannel = {...currentState.currentChannel, messages: newChannelMessages};
        const newChannels = currentState.currentWorkspace.channels.map(c => c.id === action.payload.cid ? {...c, messages: newChannelMessages} : c);
       
        const newWorkspace = Object.assign({}, oldWorkspace, {channels: newChannels});
        const newWorkspaces = currentState.workspaces.map(i => i.id === oldWorkspace.id ? newWorkspace : i);
        return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: newWorkspace, currentChannel: newChannel, channelsList: newChannels});
   
    } else{
        return currentState;
    }
 }