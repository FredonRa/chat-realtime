import React, { useState, useContext } from 'react';
import { AuthContext } from "./auth";

const Register = () => {
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [errorMail, setErrorMail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [errorUsername, setErrorUsername] = useState(null);

    const { currentUser } = useContext(AuthContext);

    const URL = "http://localhost:3000/register";

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

        if (!username) {
            formReady = false;
            setErrorUsername("Debe ingresar un nombre de usuario para continuar");
        } else {
            setErrorUsername("");
        }

        if (!email) {
            formReady = false;
            setErrorMail("Debe ingresar su dirección de e-mail para continuar")
        } else if (!isEmail(email)) {
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
            const res = await fetch(URL, {
                method: "POST",
                mode: "cors", 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    "username": username,
                    "password": password,
                    "role": "USER", 
                    "email": email
                })
            })
            .then((result) => {
                console.log(result); // "initResolve"
                return result.json();
              })
            .then((result) => {
                if (result.ok) {
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 3000)
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
                <form className="containerForm" encType="application/x-www-form-urlencoded" >
                    <h2>Registrate aqu&iacute;!</h2>
                    <label htmlFor="username">Username *</label>
                    <input type="text" id='username' onChange={(e) => setUsername(e.target.value)}  placeholder='Ingrese su username' autoFocus />
                    <span className='errorMessage'>{errorUsername}</span>
                    <label htmlFor="username">E-mail *</label>
                    <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} placeholder='Ingrese su e-mail' />
                    <span className='errorMessage'>{errorMail}</span>
                    <label htmlFor="username">Password *</label>
                    <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Ingrese su password' />
                    <span className='errorMessage'>{errorPassword}</span>
                    <button type='submit' onClick={submitForm}>Registrarme</button>
                    <span className='registrarIngresar'>¿Ya tenés cuenta? <a href="/login">Ingresá aquí</a></span>
                </form>
            }
        </div>
    );
}
 
export default Register;