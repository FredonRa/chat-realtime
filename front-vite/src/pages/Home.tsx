import * as React from 'react'
import io from 'socket.io-client';

interface HomeProps {
    
}
 
const Home: React.FC<HomeProps> = () => {
    const newSocket = io(`http://localhost:3001`);
    React.useEffect(() => {
        newSocket.emit("connected", "fede")
        return () => {newSocket.off()}
    }, []); 
    
    return (  
        <h1>HOME</h1>
    );
}
 
export default Home;