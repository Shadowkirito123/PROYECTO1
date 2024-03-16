import React, {useEffect,useState} from "react";
import './Login.css'
import '../../App.css'
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'

// importar iconos
import { PiAddressBookBold } from "react-icons/pi";
import { MdPassword } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";


//importar imagenes y video
// import video from '../LoginAssets/video.mp4'
// import logo from '../LoginAssets/pngegg.png'
import { CgAlbum } from "react-icons/cg";


const Login = () =>{
    //use el hook de estado para almacenar los inputs
    const [loginUserName, setLoginUserName] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const navigateTo = useNavigate()

    //
    const [loginStatus, setLoginStatus] = useState('')
    const [statusHolder, setstatusHolder] = useState('message')


    //obtener lo que la usuario ha ingresado
    const loginUser = (e)=>{
        //Default
        e.preventDefault();
        //Necesitaremos que Axios cree una API que se conecte al servidor. Instalemos eso.
        Axios.post('http://localhost:3002/login',{
            //creamos las variables y las enviamos a el servidor a traves del route
            LoginUserName: loginUserName,
            LoginPassword: loginPassword
        }).then((response)=>{
            console.log()
            // captar la respuesta: tenemos datos exitosos de la base de datos y podemos detectar un error si las credenciales son incorrectas.
            if(response.data.message || loginUserName == '' || loginPassword == ''){
                navigateTo('/')
                setLoginStatus('La contraseña o el usuario son incorrectos')
            }
            else{
                navigateTo('/dashboard')
            }
        })
    }

    useEffect(()=>{
        if(loginStatus !== ''){
            setstatusHolder('showMessage')
            setTimeout(()=>{
                setstatusHolder('message')
            }, 4000)
        }
    }, [loginStatus])


   //vamos a borrar el formulario al enviar
    const onSubmit = ()=>{
        setLoginUserName('')
        setLoginPassword('')
    }


    return(
        <div className="loginPage flex">
            <div className="container flex">
            <div className="videoDiv">
                {/* <video src={video} autoPlay muted loop></video> */}
                {/* <div className="textDiv">
                    <h2 className="title">Crear y vender</h2>
                    
                    <p>Adopta ahora</p>
                    
                </div> */}
            
                <div className="footerDiv flex">
                    <span className="text"> No posees una cuenta?</span>
                    <Link to = {'/register'}>
                    <button className="btn"> haz click aqui</button>
                    </Link>
                </div>
            </div>

            <div className="formDiv flex">
                <div className="headerDiv">
                    <CgAlbum className="img2"/>
                    <h3>¡Bienvenido!</h3>
                </div>
                <form action="" className="form grid" onSubmit={onSubmit}>
                    <span className={statusHolder}>{loginStatus}</span>
                    <div className="inputDiv">
                        <label htmlFor="username">Nombre de usuario</label> 
                        <div className="input flex">
                            <PiAddressBookBold className='icon'/>
                            <input type="text" id='username' placeholder="Ingresa tu nombre de usuario" onChange={(event)=>{
                                setLoginUserName(event.target.value)
                            }}/>
                        </div>

                    </div>

                    <div className="inputDiv">
                        <label htmlFor="password">Contraseña</label> 
                        <div className="input flex">
                            <MdPassword className='icon'/>
                            <input type="password" id='password' placeholder="Ingresa tu contraseña" onChange={(event)=>{
                                setLoginPassword(event.target.value)
                            }}/>
                        </div>

                    </div>
                    <button type="submit" className="btn flex" onClick={loginUser}>
                        <span>Ingresar</span>
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

export default Login;