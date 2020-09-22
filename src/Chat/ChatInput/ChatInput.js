import React, {Component} from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }


    getInputMessage = (event) => {
        this.setState({
            message: event.currentTarget.value,
        });
    };

    sendMessage = () => {
        const newMessage = {text: this.state.message, role: 'customer'};
        this.props.inputNewMessage(newMessage);
        this.setState({
            message: '',
        });
    };

    render() {
        return (
            <footer className="ChatInput">
                <input type="text" onChange={this.getInputMessage} value={this.state.message}/>
                <button type="button" onClick={this.sendMessage}>
                    Send
                </button>
            </footer>
        );
    }
}

export default ChatInput;
