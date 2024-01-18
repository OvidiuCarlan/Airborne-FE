import { useState, useEffect } from "react";
import styles from "./chat.module.css";
import { Link } from "react-router-dom";
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesPlaceholder from "./ChatMessagesPlaceHolder";


function Chat({friend, userId}) {

    const[stompClient, setStompClient] = useState();
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [messageContent, setMessageContent] = useState('');

    useEffect(() => {
        if (userId) {
            setupStompClient(userId);
        }
    }, [userId]);

    useEffect(() => {
        setMessagesReceived([]);
        setupStompClient(userId);
    }, [friend]);

    const setupStompClient = (userId) => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });

        stompClient.onConnect = () => {
            console.log('Connected to Stomp server');
            stompClient.subscribe(`/userId/${userId}/queue/inboxmessages`, (data) => {
                onMessagesReceived(data);
            });
        };     

        stompClient.onStompError = (error) => {
            console.error('Stomp error:', error);
        };

        stompClient.activate();   
        setStompClient(stompClient);
    };

    const onMessagesReceived = (data) => {
        const message = JSON.parse(data.body);
        console.log('Received message:', message);
        setMessagesReceived((prevMessages) => [...prevMessages, message]);
    };

    const sendMessage = () => {
        if (stompClient && messageContent.trim() !== '') {
            const newMessage = {
                to: friend.id,
                text: messageContent.trim()
            };

            const payload = { 'id': uuidv4(), 'from': userId, 'to': newMessage.to, 'text': newMessage.text };
            console.log('Sending message:', payload);
            stompClient.publish({ 'destination': `/userId/${payload.to}/queue/inboxmessages`, body: JSON.stringify(payload) });
            console.log(newMessage);
            console.log(payload);

            setMessageContent('');
        }
      };
      


      return (
        <div className={styles.chat_container}>
            <div className={styles.name}>
                <Link to={`/UserProfilePage/${friend.id}`} className={styles.friend}>
                    {friend.name}
                </Link>
            </div>
            <div className={styles.chat}>
                {/* {messagesReceived.map((message) => (
                    <div key={message.id} className={styles.message}>
                        <p>{message.text}</p>
                    </div>
                ))} */}
                <ChatMessagesPlaceholder userId={userId} messagesReceived={messagesReceived} />
            </div>
            <div className={styles.type_container}>
                <textarea
                    className={styles.message}
                    placeholder="Type a message"
                    required
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                ></textarea>
                <button className={styles.message_button} type="button" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}
export default Chat;