import React, {useState} from "react";
import './Register.css';
import '../../App.css';
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios'

// importar iconos
import { PiAddressBookBold } from "react-icons/pi";
import { MdPassword } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiTwotoneMail } from "react-icons/ai";



//importar imagenes y video
// import video from '../LoginAssets/video.mp4'
// import logo from '../LoginAssets/pngegg.png'
import { CgAlbum } from "react-icons/cg";


const Register = () =>{
    //estado para el manejo de formulario
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigateTo = useNavigate()

    //obtener lo que la usuario ha ingresado
    const createUser = (e)=>{
        e.preventDefault()
        //Necesitaremos que Axios cree una API que se conecte al servidor. Instalemos eso.
        Axios.post('http://localhost:3002/register',{
            //creamos las variables y las enviamos a el servidor a traves del route
            Email: email,
            UserName: userName,
            Password: password
        }).then(()=>{
            //Al registrarse, redirijamos al usuario al inicio de sesión.
            navigateTo('/')

            //Despues limpiamos los campos tambien
            setEmail('')
            setUserName('')
            setUserName('')
        })

    }

    return(
        <div className="registerPage flex">
            <div className="container flex">
            <div className="videoDiv">
                {/* <video src={video} autoPlay muted loop></video>
                <div className="textDiv">
                    <h2 className="title">Crear y vender</h2>
                    
                    <p>Adopta ahora</p>
                    
                </div> */}
            
                <div className="footerDiv flex">
                    <span className="text"> ¿Ya posees una cuenta?</span>
                    <Link to = {'/'}>
                    <button className="btn"> Login</button>
                    </Link>
                </div>
            </div>

            <div className="formDiv flex">
                <div className="headerDiv">
                    <CgAlbum className="img2"/>
                    <h3>Dejanos conocerte</h3>
                </div>
                <form action="" className="form grid">
                    
                    <div className="inputDiv">
                        <label htmlFor="email">Email</label> 
                        <div className="input flex">
                            <PiAddressBookBold className='icon'/>
                            <input type="email" id='email' placeholder="Ingresa tu correo electronico" onChange={(event)=>{
                                setEmail(event.target.value)
                            }}/>
                        </div>

                    </div>


                    <div className="inputDiv">
                        <label htmlFor="username">Nombre de usuario</label> 
                        <div className="input flex">
                            <PiAddressBookBold className='icon'/>
                            <input type="text" id='username' placeholder="Ingresa tu nombre de usuario" onChange={(event)=>{
                                setUserName(event.target.value)
                            }}/>
                        </div>

                    </div>


                    <div className="inputDiv">
                        <label htmlFor="password">Password</label> 
                        <div className="input flex">
                            <MdPassword className='icon'/>
                            <input type="password" id='password' placeholder="Ingresa tu contraseña" onChange={(event)=>{
                                setPassword(event.target.value)
                            }}/>
                        </div>

                    </div>
                    <button type="submit" className="btn flex" onClick={createUser}>
                        <span>Register</span>
                        <AiOutlineArrowRight className="icon" />
                    </button>
                    <span className="forgotPassword">
                        Olvido su contraseña? <a href="">Click aqui</a>
                    </span>
                </form>
            </div>

            


            </div>  
        </div>
    )
}

export default Register