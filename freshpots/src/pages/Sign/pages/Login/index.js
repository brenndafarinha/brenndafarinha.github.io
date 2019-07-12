import React, { Component } from 'react'
import "./login.css"
import FormSubmit from '../../Components/FormSubmit'
import { Link } from 'react-router-dom'
import Logo from './img/logo.png'
import LoginImage from './img/login.jpg'
import GitHubIcon from './img/github-icon.png'
import registerApi from '../../../../services/registerApi'


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginIsValid: true,
            loginError: "",
            formIsValid: false,
            formInputs: {
                email: {
                    type: 'text',
                    placeholder: "E-mail",
                },
                password: {
                    type: 'password',
                    placeholder: "Senha"
                },
            }
        }
    }

    loginHandler = async (e) => {
        e.preventDefault()
        const body = {
            email: this.inputEmail.value,
            password: this.inputPassword.value,
        }
        try {
            const response = await registerApi.post('/api/login', body)
            const { token, name } = response.data
            console.log(response)
            if (name.indexOf(' ') === -1) {
                localStorage.setItem('username', name)
            } else {
                let firstName = name.substr(0, name.indexOf(" "))
                localStorage.setItem('username', firstName)
            }
            
            localStorage.setItem('token', token);
                        
            this.props.history.push('/challenge')

        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                this.setState({
                    loginIsValid: false,
                    loginError: error.response.data.error
                })
            }
        }
 
    }


    render() {
        const { formInputs, loginError, loginIsValid } = this.state
        const { email, password } = formInputs
        return (
            <div className="login">
                <div className="login-container">
                    <img className="login-image" src={LoginImage}></img>
                    <form className="login-form" onSubmit={this.loginHandler}>
                        <div className="login-logo-container">
                            <Link to='/'><img className="login-logo" src={Logo}></img></Link>
                        </div>
                        <div className="form-api">
                            <p>Entre com sua conta do GitHub</p>
                            <img src={GitHubIcon}></img>
                        </div>
                        <p className="form-text">Ou entre com seu e-mail</p>
                        <input
                            className='form-input'
                            ref={(element) => { this.inputEmail = element }}
                            name="email"
                            placeholder={email.placeholder}>
                        </input>
                        <input
                            className='form-input'
                            ref={(element) => { this.inputPassword = element }}
                            name="password"
                            type={password.type}
                            placeholder={password.placeholder}>
                        </input>
                        <FormSubmit >Entrar</FormSubmit>
                        {!loginIsValid ? <div className="login_error">{loginError}</div> : <p></p>}
                        <p className="form-text">Ainda não possui conta? <Link to="/register">Registre-se aqui!</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}