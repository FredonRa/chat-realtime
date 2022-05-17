import { useState, useContext } from "react";
import { AuthContext } from "./auth";
import { useForm } from "react-hook-form";

const Login = () => {
    const [ password, setPassword ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [errorMail, setErrorMail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const { handleSubmit, register, formState: { errors } } = useForm();
    const URL = "http://localhost:3000/login";
    
    const { currentUser } = useContext(AuthContext);

    function isEmail(email) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(email)){
            return false;
        } else {
            return true;
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        let formReady = true;

        if (!email) {
            formReady = false;
            setErrorMail("Debe ingresar su dirección de e-mail para continuar")
        } else if (!isEmail(email)) {
            formReady = false;
            setErrorMail("Debe ingresar una dirección de e-mail correcta para continuar")
        } else {
            setErrorMail("")
        }

        if (!password) {
            formReady = false;
            setErrorPassword("Debe ingresar su contraseña para continuar")
        } else {
            setErrorPassword("")
        }

        if (formReady) {
            fetch(URL, {
                method: "POST",
                mode: "cors", 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    "password": password,
                    "email": email
                })
            })
            .then((result) => {
                console.log(result); // "initResolve"
                return result.json();
              })
            .then((result) => {
                if (result.ok) {
                    localStorage.setItem('user', JSON.stringify(result.usuario));
                    window.location.href = "/";
                } else {
                    throw Error(result.err.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }


    if(currentUser){
        window.location.href = "/";
    }
     
    return ( 
        <div className="container">
            {currentUser ? 
                <></> 
            :
                <form className="containerForm" onSubmit={handleSubmit(submitForm)} encType="application/x-www-form-urlencoded" >
                    <h2>Ingres&aacute; aqu&iacute;!</h2>
                    <label htmlFor="username">E-mail *</label>
                    <input 
                    type="email" 
                    id='email' 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Ingrese su e-mail' 
                    />
                    <span className='errorMessage'>{errorMail}</span>
                    <label htmlFor="password">Password *</label>
                    <input 
                    type="password" 
                    id='password' 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Ingrese su password' 
                    />
                    <span className='errorMessage'>{errorPassword}</span>
                    <button type='submit' onClick={submitForm}>Ingresar</button>
                    <span className='registrarIngresar'>¿No tenés cuenta? <a href="/register">Registrate aquí</a></span>
                </form>
            }
        </div>
     );
}

export default Login;