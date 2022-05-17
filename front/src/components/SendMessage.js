import React, { useState, useEffect } from 'react';

const SendMessage = ({socket, currentUser}) => {
    const [message, setMessage] = useState("");

    const sendMsg = (e) => {
        e.preventDefault();
        socket.emit('message', {message: message, from: currentUser})
        setMessage("");
        let objDiv = document.querySelector(".containerMessages");
        objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
    }

    // const listenerEnterKey = (e) => {
    //     if (e.code === "Enter" || e.code === "NumpadEnter") {
    //       e.preventDefault();
    //       console.log(message)
    //       socket.emit('message', {message: message, from: currentUser})
    //       setMessage("");
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener("keydown", listenerEnterKey);
    //     return () => {
    //         document.removeEventListener("keydown", listenerEnterKey);
    //     };
    // }, []);

    return ( 
        <div className="containerSendMessage">
            <form>
                <textarea placeholder="Escribe aquí un mensaje..." value={message} onChange={(e) => setMessage(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
                <button disabled={message.length > 0 ? false : true} className="sendMessage" onClick={sendMsg}>Enviar</button>
            </form>
        </div>
    );
}
 
export default SendMessage;