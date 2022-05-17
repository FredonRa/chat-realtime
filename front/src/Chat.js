import React, { useContext, useEffect } from 'react';
import { AuthContext } from "./auth";

import io from 'socket.io-client';
import SendMessage from './components/SendMessage';
import Messages from './components/Messages';

const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    
    const newSocket = io(`http://localhost:3000`);

    if(!currentUser){
        window.location.href = "/login";
    }

    useEffect(() => {
        newSocket.emit("connected", currentUser)
        return () => {newSocket.off()}
    }, [currentUser]); 

    return ( 
        <div className="container">
        {
            currentUser ?
                <>
                    <Messages socket={newSocket} currentUser={currentUser} />
                    <SendMessage socket={newSocket} currentUser={currentUser} />
                </>
            :
                <></>
        }
        </div>
    );
}
 
export default Chat;