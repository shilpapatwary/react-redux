import { WorkspaceState, SlackActionTypes } from "../types";
import { AnyAction } from 'redux';
import { Reducer } from 'redux';
import {createWorkspaceReducer, removeWorksapceReducer, editWorkspaceReducer, enterWorkspaceReducer, addUserWorkspaceReducer, showWorkspaces} from './WorkspaceReducer';
import {addChannelReducer, setChannelReducer, submitMessageReducer, startUserThreadAction} from './ChannelsReducer';

const initialState: WorkspaceState = {
    workspaces: undefined,
    currentWorkspace: undefined,
    showWorkspaces: undefined,
    channelsList: undefined,
    currentChannel: undefined,
    showChannels: undefined
}

const SlackApplicationReducer: Reducer<WorkspaceState> = (currentState: WorkspaceState = initialState, action: AnyAction) => {
    switch(action.type) {
        case SlackActionTypes.CREATE_WORKSPACE:
           return createWorkspaceReducer(currentState, action);
        case SlackActionTypes.DELETE_WORKSPACE:
             return removeWorksapceReducer(currentState, action);
         case SlackActionTypes.EDIT_WORKSPACE:
            return editWorkspaceReducer(currentState, action);
        case SlackActionTypes.ENTER_WORKSPACE:
            return enterWorkspaceReducer(currentState, action);
         case SlackActionTypes.ADD_USER_WORKSPACE:
             return addUserWorkspaceReducer(currentState, action);
        case SlackActionTypes.SHOW_WORKSPACES:
             return showWorkspaces(currentState, action);
        case SlackActionTypes.ADD_CHANNEL:
             return addChannelReducer(currentState, action);
        case SlackActionTypes.SET_CHANNEL:
            return setChannelReducer(currentState, action);
         case SlackActionTypes.SUBMIT_MESSAGE:
              return submitMessageReducer(currentState, action);
        case SlackActionTypes.START_USER_THREAD:
            return startUserThreadAction(currentState, action);
        default:
            return currentState;
        
    }
}

export default SlackApplicationReducer;