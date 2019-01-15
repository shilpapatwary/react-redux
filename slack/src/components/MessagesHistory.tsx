import React, { Component } from 'react';
import SendMessage from './SendMessage';
import Message from './Message';
import { ChannelData, MessageData } from '../store/SlackApp/types';

interface MessageHistoryProps{
    channel: ChannelData,
    saveMessages: any
}
interface MessageHistoryState{
    channel: ChannelData,
    messages: MessageData[]
}
class MessagesHistory extends Component<MessageHistoryProps, MessageHistoryState> {
constructor(props: MessageHistoryProps){
    super(props);
    this.state = {
        channel: props.channel,
        messages: props.channel.messages
    };
    this.submitMessage = this.submitMessage.bind(this);
}

submitMessage(message: MessageData) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({messages: messages});
    this.props.saveMessages(this.state.channel.id, this.state.messages);
}

  render() {
    return (
        <div className="channelMessages" id={`messageContainer${this.state.channel.id}`}>
            <div className="messageContainer">
            {
                
                  this.state.messages.map( (message, index) => {
                    return <Message key={index} message={message}></Message>
                    })
                    
            }
            </div>
            <SendMessage channel={this.state.channel} submitMessage={this.submitMessage}></SendMessage>
        </div>
    );
  }
}

export default MessagesHistory;
