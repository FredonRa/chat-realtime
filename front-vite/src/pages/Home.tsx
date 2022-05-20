import * as React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import io from 'socket.io-client';

interface HomeProps {
    
}
 
const Home: React.FC<HomeProps> = () => {
    const [message, setMessage] = React.useState("");
    const newSocket = io(`http://localhost:3001`);
    const isLoggedIn = useSelector((store) => store.applicationReducer.isLoggedIn);

    const sendMsg = (e) => {
        e.preventDefault();
        newSocket.emit('message', {message: message, from: currentUser})
        setMessage("");
    }

    React.useEffect(() => {
        newSocket.emit("connected", "fede")
        return () => {newSocket.off()}
    }, []); 

    if (!isLoggedIn) return <Navigate to="/login" replace={true} />;
    
    return (  
        <div className="containerSendMessage">
            <form>
                <textarea placeholder="Escribe aquí un mensaje..." value={message} onChange={(e) => setMessage(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
                <button disabled={message.length > 0 ? false : true} className="sendMessage" onClick={sendMsg}>Enviar</button>
            </form>
        </div>
    );
}
 
export default Home;