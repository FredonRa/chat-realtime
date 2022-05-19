import * as React from 'react'

interface RegisterProps {
    
}
 
const Register: React.FC<RegisterProps> = () => {
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

    // const { currentUser } = useContext(AuthContext);

    const URL = "http://localhost:3001/register";

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
        const { username, password, email } = user;
        if (!username) return setErrorUser({...errorUser, username: true});
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
    
    return (  
        <main className="container">
            <h2>Registrate aqu&iacute;!</h2>
            <form className="containerForm" encType="application/x-www-form-urlencoded" >
                <label htmlFor="username">Username *</label>
                <input type="text" id='username' onChange={(e) => setUSer({...user, username: e.target.value})}  placeholder='Ingrese su username' autoFocus />
                <span className='errorMessage'>{errorUsername}</span>
                <label htmlFor="username">E-mail *</label>
                <input type="email" id='email' onChange={(e) => setUSer({...user, email: e.target.value})} placeholder='Ingrese su e-mail' />
                <span className='errorMessage'>{errorMail}</span>
                <label htmlFor="username">Password *</label>
                <input type="password" id='password' onChange={(e) => setUSer({...user, password: e.target.value})} placeholder='Ingrese su password' />
                <span className='errorMessage'>{errorPassword}</span>
                <button type='submit' onClick={submitForm}>Registrarme</button>
                <span className='registrarIngresar'>¿Ya tenés cuenta? <a href="/login">Ingresá aquí</a></span>
            </form>
        </main>
    );
}
 
export default Register;