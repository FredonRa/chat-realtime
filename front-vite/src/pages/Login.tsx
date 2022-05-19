import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedIn, setUser } from '../store/actions/application.actions';
interface LoginProps {
    
}
 
const Login: React.FC<LoginProps> = () => {
    const dispatch = useDispatch();
    const [ user, setUSer ] = React.useState<{
        username: string,
        password: string,
        email: string
    }>({
        username: "",
        password: "",
        email:""
    });

    const [ errorUser, setErrorUser ] = React.useState<{
        username: boolean,
        password: boolean,
        email: boolean
    }>({
        username: false,
        password: false,
        email:false
    });

    const [errorMail, setErrorMail] = React.useState<boolean>(false);
    const [errorPassword, setErrorPassword] = React.useState<boolean>(false);
    const [errorUsername, setErrorUsername] = React.useState<boolean>(false);
    const store = useSelector((store) => store.applicationReducer.user);

    const URL = "http://localhost:3001/login";

    function isEmail(email: string) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(email)){
            return false;
        } else {
            return true;
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const { password, email } = user;
        if (!email) return setErrorUser({...errorUser, email: true});        
        if (!isEmail(email)) return setErrorUser({...errorUser, email: true});        
        if (!password) return setErrorUser({...errorUser, password: true});

        const res = await fetch(URL, {
            method: "POST",
            mode: "cors", 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                "email": email,
                "password": password,
            })
        })
        .then((result) => {
            console.log(result); // "initResolve"
            return result.json();
            })
        .then((result) => {
            if (result.ok) {
                dispatch(setLoggedIn());
                dispatch(setUser(result.user));
            } else {
                throw new Error(result.err.message)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    if (JSON.parse(localStorage.getItem("user") || "{}")) return window.location.href = "/";

    return (  
        <main className="container">
            <h2>Inciar sesión</h2>
            <form className="containerForm" encType="application/x-www-form-urlencoded" >
                <label htmlFor="username">E-mail </label>
                <input type="email" id='email' onChange={(e) => setUSer({...user, email: e.target.value})} placeholder='Ingrese su e-mail' />
                <span className='errorMessage'>{errorMail}</span>
                <label htmlFor="username">Password *</label>
                <input type="password" id='password' onChange={(e) => setUSer({...user, password: e.target.value})} placeholder='Ingrese su password' />
                <span className='errorMessage'>{errorPassword}</span>
                <button type='submit' onClick={submitForm}>Ingresar</button>
                <span className='registrarIngresar'>¿No tenés cuenta? <a href="/register">Registrate aquí</a></span>
            </form>
        </main>
    );
}
 
export default Login;