import React, {Component} from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            shop: {},
            messages: [],
        };
    }

    componentDidMount() {
        const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
        const messages = this.state.messages.concat(defaultMessage);

        setTimeout(() => {
            this.setState({
                shop: shopData,
                messages,
            });
        }, 1000);
    }

    addNewMessage = (newMessage) => {
        this.setState((preState) => ({
            messages: [...preState.messages, newMessage],
        }));
    };

    autoResponseMessage = async (text) => {
        const tags = answersData.flatMap(answer => answer.tags);
        tags.forEach(tag => {
            if (text.includes(tag)) {
                const responseMessage = answersData.find(answer > answer.tags.includes(tag));
                this.addNewMessage(responseMessage);
            }
        });
    };

    updateMessages = (newMessage) => {
        this.addNewMessage(newMessage);
        this.autoResponseMessage(newMessage.text)
            .catch(err => console.log(err));
    };


    render() {
        const {shop, messages} = this.state;
        return (
            <main className="Chat">
                <ChatHeader shop={shop}/>
                <ChatBox messages={messages}/>
                <ChatInput inputNewMessage={this.updateMessages}/>
            </main>
        );
    }
}

export default Chat;
