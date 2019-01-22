import { WorkspaceState, SlackActionTypes } from "../types";
import { AnyAction } from 'redux';

export function enterWorkspaceReducer(currentState: WorkspaceState, action: AnyAction) {
    return Object.assign({}, currentState, {workspaces: currentState.workspaces, currentWorkspace: action.payload.workspace, showWorkspaces: false,
        showChannels: true, channelsList: action.payload.workspace.channels, currentChannel: action.payload.workspace.channels[0] });
}

export function showWorkspaces(currentState: WorkspaceState, action: AnyAction) {
    return Object.assign({}, currentState, {workspaces: currentState.workspaces, currentWorkspace:undefined, showWorkspaces: true,
        showChannels: false, channelsList: undefined, currentChannel: undefined});
}

export function createWorkspaceReducer(currentState: WorkspaceState , action: AnyAction) {
    const oldWorkspaces = currentState.workspaces || [];
    const newWorkspace = Object.assign({}, action.payload.workspace);
    const newWorkspaces = [...oldWorkspaces, newWorkspace];
    return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: newWorkspace});
}

export function editWorkspaceReducer(currentState: WorkspaceState , action: AnyAction) {
    const oldWorkspaces = currentState.workspaces || [];
    const oldWorkspace = oldWorkspaces.filter(i => i.id === action.payload.id)[0];
    const newWorkspace = Object.assign({}, oldWorkspace, {name: action.payload.name});
    const newWorkspaces = oldWorkspaces.map(i => i.id === action.payload.id ? newWorkspace : i);
    return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: newWorkspace});
}

export function removeWorksapceReducer(currentState: WorkspaceState , action: AnyAction) {
    const oldWorkspaces = currentState.workspaces || [];
    const newWorkspaces = oldWorkspaces.filter(i => i.id !== action.payload.wid);
    return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: undefined});
}

export function addUserWorkspaceReducer(currentState: WorkspaceState , action: AnyAction) {
    if(currentState.workspaces){
        const oldWorkspaces = currentState.workspaces;
        const oldWorkspace = oldWorkspaces.filter(w => w.id === action.payload.wid)[0];
        const oldUsers = oldWorkspace.users;
        const newUsers = [oldUsers, action.payload.user];
       
        const newWorkspace = Object.assign({}, oldWorkspace, {users: newUsers});
        const newWorkspaces = oldWorkspaces.map(i => i.id === action.payload.wid ? newWorkspace : i);
        return Object.assign({}, currentState, {workspaces: newWorkspaces, currentWorkspace: newWorkspace});
    }else{
        return currentState;
    }
   
}