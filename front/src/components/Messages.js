import React, { useState, useEffect } from 'react';
import Message from './Message';

const Messages = ({socket, currentUser}) => {
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        socket.on('messages', newMessage => {
            setAllMessages([...allMessages, newMessage])
        })
        return () => {socket.off()}
    }, [allMessages]) 

    return (  
        <div className="containerMessages">
            {allMessages.map((message, index) => <Message message={message} currentUser={currentUser} className="message" key={index} />)}
        </div>
    );
}
 
export default Messages;