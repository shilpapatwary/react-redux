import chai from 'chai';
import store from '.';
import {editWorkspaceAction, addChannelAction, setChannelAction, submitMessageAction, deleteWorkspaceAction} from '../../actions';

chai.should();
describe('SlackApplicationStore', function() {
  describe('store.dispatch(editWorkspaceAction("updated workspace"))', function() {
    it('should update workpace name', function() {
      store.dispatch(editWorkspaceAction('123456','updated workspace'));
      const currentWorkspace =  store.getState().currentWorkspace || {};
      currentWorkspace.should.have.property('name').and.equal('updated workspace');
    });
  });
  describe('store.dispatch(addChannelAction()', function() {
    it('should create a new channel in workspace', function() {
      store.dispatch(addChannelAction({
        id : "abcde123",
        name : "random2",
        users:[],
        messages:[]
    }));
    const currentWorkspace =  store.getState().currentWorkspace || {};
      currentWorkspace.should.have.property('channels').to.be.an('array').that.is.not.empty;
      currentWorkspace.should.have.property('channels').to.be.an('array').to.have.lengthOf(3);
    });
  });
  describe('store.dispatch(setChannelAction()', function() {
    it('should create a new channel in workspace', function() {
      store.dispatch(setChannelAction({
        id : "abcde123",
        name : "random2",
        users:[],
        messages:[]
    }));
    const currentChannel =  store.getState().currentChannel || {};
    currentChannel.should.not.be.empty;
    currentChannel.should.have.property('name').and.equal('random2');
    currentChannel.should.have.property('id').and.equal('abcde123');  });
  });
  describe('store.dispatch(submitMeessageAction()', function() {
    it('should create a new channel in workspace', function() {
      store.dispatch(submitMessageAction("abcde123", "hi"));
      const currentChannel =  store.getState().currentChannel || {};
      currentChannel.should.have.property('messages').to.be.an('array').that.is.not.empty;
      currentChannel.should.have.property('messages').to.include.members(["hi"]);
  });
  describe('store.dispatch(deleteWorkspaceAction("updated workspace"))', function() {
    it('should delete workpace', function() {
      const workspaces = store.getState().workspaces || {};
      workspaces.should.be.of.length(3);
      store.dispatch(deleteWorkspaceAction('123456'));
      const newWorkspaces = store.getState().workspaces || {};
     newWorkspaces.should.be.of.length(2);
    });
  });
})
});

