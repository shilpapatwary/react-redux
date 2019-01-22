import React, { Component } from 'react';
import Workspace from './Workspace';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {WorkspaceData, WorkspaceState, UserData} from '../types';
import {addUserWorkspaceAction, createWorkspaceAction, enterWorkspaceAction, editWorkspaceAction, deleteWorkspaceAction} from '../actions';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';

interface workspaceContainerProps{
    workspaces?: WorkspaceData[],
    addWorkspace: any,
    onAddUserToWorkspace: any,
    openWorkspace: any,
    onWorkspaceTitleChange: any,
    deleteWorkspace: any
}
interface workspaceContainerState{
    showUserForm: boolean,
    selectedWorkspace: string
}
export class workspaceContainer extends Component<workspaceContainerProps, workspaceContainerState> {
constructor(props: workspaceContainerProps) {
    super(props);
    this.state = {
        showUserForm: false,
        selectedWorkspace: ''
    }
    this.addWorkspace = this.addWorkspace.bind(this);
    this.openAddUserForm = this.openAddUserForm.bind(this);
    this.addUserToWorkspace = this.addUserToWorkspace.bind(this);
}

addWorkspace() {
    const workspaceData ={
        id: Math.floor(Math.random() * 100000),
        name: 'My Workspace',
        users: [],
        channels: [],
      };
      this.props.addWorkspace(workspaceData);
}

openAddUserForm(wid: string) {
    this.setState({selectedWorkspace: wid, showUserForm: true});
}

addUserToWorkspace(event: React.MouseEvent<HTMLInputElement, MouseEvent>){
    event.preventDefault();
    const newUser = {
            id: `user${Math.floor(Math.random() * 100000)}`,
            name: (document.getElementById('workspaceUser') as HTMLInputElement).value,
            chat: false,
            threads: []
    }
    this.props.onAddUserToWorkspace(this.state.selectedWorkspace, newUser);
    this.setState({showUserForm: false});
}
  render() {
    return this.props.workspaces ? (
        <section>
            <section id="workspaceHeader">
                <AppBar  position="static" style= {{backgroundColor: 'inherit'}}>
                <Typography variant="title" color="inherit" style= {{lineHeight: '50px'}}>
                        My Workspaces
                    </Typography>
                </AppBar>
            </section>
            
            <section id="content">
                        <section id="workspaces">
                                <section id="workspaceContainer">
                                    <Grid container spacing={24} style={{padding: '24px 0 24px 0'}}>
                                        { this.props.workspaces.map(workspace => (
                                            <Grid key={workspace.id} item xs={12} sm={12} lg={12} xl={12}>
                                            <Workspace workspace={workspace} key={workspace.id}  openWorkspace={this.props.openWorkspace} onWorkspaceTitleChange={this.props.onWorkspaceTitleChange} openAddUserForm={this.openAddUserForm} deleteWorkspace={this.props.deleteWorkspace}></Workspace>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    
                                    <div id="addWorkspace" className="workspace" onClick={this.addWorkspace}>+ Add a workspace</div>
                               </section>
                        </section>
            </section>
           {
               this.state.showUserForm && <section id="addUserForm">
               <form id="addUserToWorkspace">
                   <input type="text" id="workspaceUser" className="userInput" placeholder="User Name"/>
                   <input type="submit" id="submitWorkspaceUser" onClick={this.addUserToWorkspace}/>
               </form>
       </section>
           } 
      </section>
    ) : <div>Loading...</div>;
  }
}

const matchStateToProps = (state: WorkspaceState) => {
    return{
        workspaces: state.workspaces,
    }
}
const matchDispatchToProps = (dispatch: Dispatch) => {
    return {
        addWorkspace: (workspace: WorkspaceData) => {dispatch(createWorkspaceAction(workspace))},
        onAddUserToWorkspace: (wid: string, user: UserData) => {dispatch(addUserWorkspaceAction(wid, user))},
        openWorkspace: (workspace: WorkspaceData) => {dispatch(enterWorkspaceAction(workspace))},
        onWorkspaceTitleChange: (id: string, name: string) => {dispatch(editWorkspaceAction(id, name))},
        deleteWorkspace: (wid: string) => {dispatch(deleteWorkspaceAction(wid))}
    }
}
export default connect(matchStateToProps, matchDispatchToProps)(workspaceContainer);
