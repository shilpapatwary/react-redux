import { action } from 'typesafe-actions';
import { SlackActionTypes, WorkspaceData, UserData, ChannelData, MessageData } from './types';

export const createWorkspaceAction = ( workspace : WorkspaceData) => action(SlackActionTypes.CREATE_WORKSPACE, {workspace});
export const editWorkspaceAction = (id: string, name:String) => action(SlackActionTypes.EDIT_WORKSPACE, {id, name});
export const deleteWorkspaceAction = (wid: String) => action(SlackActionTypes.DELETE_WORKSPACE,{wid});
export const enterWorkspaceAction = (workspace: WorkspaceData) => action(SlackActionTypes.ENTER_WORKSPACE,{workspace} );
export const addUserWorkspaceAction = (wid: string, user: UserData) => action(SlackActionTypes.ADD_USER_WORKSPACE, {wid, user});

export const addChannelAction = (channel: ChannelData) => action(SlackActionTypes.ADD_CHANNEL, {channel});

export const submitMessageAction = (cid: string, message: MessageData) => action(SlackActionTypes.SUBMIT_MESSAGE, {cid, message});
export const showWorkspacesAction = () => action(SlackActionTypes.SHOW_WORKSPACES);
export const setChannelAction = (channel: ChannelData) => action(SlackActionTypes.SET_CHANNEL, {channel});
export const startUserThreadAction = (username: string, chat:boolean) => action(SlackActionTypes.START_USER_THREAD, {username, chat});