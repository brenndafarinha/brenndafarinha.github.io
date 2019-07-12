import React, { Component } from 'react'
import "./style.css"
import Logo from './img/logo.png'
import Validate from '../../functions/validation'
import { Link } from 'react-router-dom'
import FormInput from '../../Components/FormInput'
import FormSubmit from '../../Components/FormSubmit'
import registerApi from '../../../../services/registerApi'
import { Redirect } from 'react-router-dom'





export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerError: '',
            registerIsValid: true,
            formIsValid: false,
            formInputs: {
                email: {
                    type: 'text',
                    value: '',
                    placeholder: "E-mail",
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                        isEmail: false
                    },
                    error: "Digite um email válido"
                },
                name: {
                    type: 'text',
                    value: '',
                    placeholder: "Nome",
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true,
                    },
                    error: "Digite um nome válido (acima de 3 caracteres)"
                },
                password: {
                    type: 'password',
                    value: '',
                    placeholder: "Senha",
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 8,
                        isRequired: true,
                        isPassword: false,
                    },
                    error: "Senha inválida! Sua senha precisa ter 8 caracteres, conter pelo menos um número, ter letras maiúsculas e minúsculas e caracteres especiais"

                },


            }

        }
    }

    changeHandler = event => {
        const name = event.target.name
        const value = event.target.value

        const updatedInputs = {
            ...this.state.formInputs
        }

        const updateFormElement = {
            ...updatedInputs[name]
        }

        updateFormElement.value = value;
        updateFormElement.touched = true;
        updateFormElement.valid = Validate(value, updateFormElement.validationRules)

        updatedInputs[name] = updateFormElement

        let formIsValid = true;
        for (let inputName in updatedInputs) {
            formIsValid = updatedInputs[inputName].valid && formIsValid
        }

        this.setState({
            formInputs: updatedInputs,
            formIsValid: formIsValid,

        })

    }

    registerHandler = async (e) => {
        e.preventDefault()
        const body = {
            username: this.inputName.value,
            password: this.inputPassword.value,
            email: this.inputEmail.value
        }

        try {
            e.preventDefault()
            const response = await registerApi.post('/api/users', body)
            
            const { token, name } = response.data
            localStorage.setItem('token', token);
            this.setState({
                registerIsValid: true
            })
            if (name.indexOf(' ') === -1) {
                localStorage.setItem('username', name)
            } else {
                let firstName = name.substr(0, name.indexOf(" "))
                localStorage.setItem('username', firstName)
            }
            this.props.history.push('/challenge')
            console.log(response.status)
        } catch (error) {
            if (error.response) {
                this.setState({
                    registerIsValid: false,
                    registerError: error.response.data.error
                })
            } 
        }
    }

    formErrorHandler = (input) => {
        let errorMessage = input.error;
        let formError = 'form_erro'
        if (input.touched && !input.valid) {
            formError = 'show_erro'
        } if (input.touched && !input.valid && input.value == "") {
            errorMessage = 'Campo obrigatório'
        }
        return (<small className={formError}>{errorMessage}</small>)
    }

    render() {
        const { formInputs, registerIsValid, registerError } = this.state
        const { name, email, password } = formInputs
        return (

            <div className="register-container">
                
                <form className="register-form" onSubmit={this.registerHandler}>
                    <div className="form-logo-container">
                        <Link to='/'><img className="form-logo" src={Logo}></img></Link>
                    </div>
                    <h2>Faça seu cadastro!</h2>
                    <input
                        ref={(element) => { this.inputName = element }}
                        className='form-input'
                        placeholder={name.placeholder}
                        name='name'
                        value={name.value}
                        onChange={this.changeHandler}
                        touched={name.touched.toString()}
                        valid={name.valid.toString()}
                        error={name.error}
                    ></input>
                    {this.formErrorHandler(name)}
                    <input
                        className='form-input'
                        ref={(element) => { this.inputEmail = element }}
                        name="email"
                        placeholder={email.placeholder}
                        value={email.value}
                        onChange={this.changeHandler}
                        touched={email.touched.toString()}
                        valid={email.valid.toString()}
                        error={email.error}>
                    </input>
                    {this.formErrorHandler(email)}
                    <input
                        className='form-input'
                        ref={(element) => { this.inputPassword = element }}
                        name="password"
                        type={password.type}
                        placeholder={password.placeholder}
                        value={password.value}
                        onChange={this.changeHandler}
                        touched={password.touched.toString()}
                        valid={password.valid.toString()}
                        error={password.error}>
                    </input>
                    {this.formErrorHandler(password)}
                    <FormSubmit formIsValid={this.state.formIsValid} disabled={!this.state.formIsValid}>Cadastrar</FormSubmit>
                    {!registerIsValid ? <p className="register_error">{registerError}</p> : <p></p>}
                </form>
                <img className="register-image"></img>
            </div>

        )
    }
}