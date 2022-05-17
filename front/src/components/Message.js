import React from 'react';


const Message = ({message, currentUser}) => {
    console.log(message.message.from)
    if (message) {
        var {email} = message.message.from;
        var {time} = message;
    }
    console.log(time)
    return (  
        <div className={currentUser.email === email ? "containerMessage right" : "containerMessage"}>
            <div className="message">
                <div className="infoMessage">
                    <span className="username">{currentUser.email === email ? "Yo" : message.message.from.username}</span>
                    <span className="hour">{time}</span>
                </div>
                <p>{message.message.message}</p>
            </div>
        </div>
    );
}
 
export default Message;