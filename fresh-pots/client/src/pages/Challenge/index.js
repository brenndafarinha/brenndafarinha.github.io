import React, { Component } from 'react'
import './style.css'
import Navbar from '../../Components/Navbar'
import Button from '../../Components/Button/Button'
import Output from '../../Components/Output/Output'
import AceEditor from 'react-ace';
import 'react-ace/'
import 'brace/mode/javascript';
import 'brace/theme/twilight';
import 'brace/theme/tomorrow'
import 'brace/snippets/javascript'
import 'brace/ext/language_tools'
import api from '../../services/api'
import theme from './img/adjust-contrast.svg'
import ChallengeImg from './img/challenge-img.png'

export default class Challenge extends Component {
    constructor(props) {
        super(props)
        let testChallenge = {
            value: ''
        }
        this.state = {
            challengeValue: `function DNAComplementar(dna){
    //seu código aqui
    //exemplo:
    //DNAComplementar("ATTGC") # retorna "TAACG"
    //teste:
    
    }
DNAComplementar("GTAT")`,
            userInput: '',
            output: '',
            isValidOutput: false,
            activeInput: false,
            resultMessage: '',
            theme: 'twilight',
            username: ''
        }

        // this.onChange = this.onChange.bind(this)
    }

    onChange = (newValue) => {
        this.setState({
            userInput: newValue,
            activeInput: true
        })
    }


    runTest = async () => {
        const code = this.refs.userTest.editor.getValue()
        const body = {
            clientId: '271d0be6a9ca41346be87d0f36d3cf6d',
            clientSecret: "1c3722361c77d46463ce3e0b0e7029e01a85f51e6426326c632a1633b079609a",
            script: code,
            language: 'nodejs',
            versionIndex: '1',
        }
        const response = await api.post('/execute', body)
        const { output } = response.data

        this.setState({
            output: output
        })

        if (output.replace('\n', '') === 'CATA') {
            this.setState({
                isValidOutput: true,
                resultMessage: 'Boa! Sua solução funcionou!'
            })
        } else {
            this.setState({
                isValidOutput: true,
                resultMessage: 'Sua solução não funcionou, tenta de novo!'
            })
        }
        console.log(this.state.isvalidOutput)

    }


    resetChallenge = () => {
        this.setState({
            activeInput: false,
            output: '',
            isValidOutput: false

        })
    }

    changeTheme = () => {
        const lightTheme = 'tomorrow'
        const darkTheme = 'twilight'
        if (this.state.theme === darkTheme) {
            this.setState({
                theme: lightTheme
            })
        } else {
            this.setState({
                theme: darkTheme
            })
        }
        console.log(this.state)
    }

    logoutHandler = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        this.props.history.push('/')
    }

    render() {
        console.log(this.state)
        return (
            <div className="challenge">
                <Navbar>
                    <div className="nav-menu">
                        <ul className="dropdown">
                            <li>Oi, {localStorage.getItem('username')}</li>
                            <div className='dropdown-content'>
                                <p onClick={() => this.props.history.push('/buildin')}>Perfil</p>
                                <p onClick={this.logoutHandler}>Sair</p>
                            </div>

                        </ul>
                    </div>
                </Navbar>
                <div className='challenge-container'>
                    <div className="challenge-img">
                        <img src={ChallengeImg}></img>
                    </div>
                    <div className="instructions">
                        <h1>Fita complementar</h1>
                        <p>
                            O ácido desoxirribonucleico (DNA) é uma molécula encontrada no núcleo das células, sua funçãe é transportar "instruções" para o desenvolvimento e funcionamento dos organismos vivos.</p>
                        <p>Se quiser saber mais, <a href="https://pt.wikipedia.org/wiki/%C3%81cido_desoxirribonucleico">clica aqui</a></p>
                        <p>Nas cadeias de DNA, os símbolos "A" e "T" são complementares, assim como "C" e "G". Você precisa criar uma função que receba uma fita de DNA  e produza a fita complementar.</p>
                    </div>
                    <div className="code-container">
                        <div className='code'>
                            <div className='editor-container'>
                                <div className='editor-box'>
                                    <span className="title">Solução:</span>

                                    <div className='btn-control'>
                                        <div className='theme-container'>
                                            <img onClick={this.changeTheme} className="theme" src={theme}></img>
                                        </div>
                                        <Button onClick={this.resetChallenge}>Reset</Button>
                                        <Button onClick={this.runTest}>Executar</Button>
                                    </div>
                                </div>
                                <AceEditor
                                    ref='userTest'
                                    className='editor'
                                    maxLines={Infinity}
                                    minLines={20}
                                    width={'100%'}
                                    mode={"javascript"}
                                    theme={this.state.theme}
                                    name={"editor"}
                                    editorProps={{ $blockScrolling: true }}
                                    enableBasicAutocompletion={true}
                                    enableLiveAutocompletion={true}
                                    enableSnippets={true}
                                    value={this.state.activeInput ? this.state.userInput : this.state.challengeValue}
                                    onChange={this.onChange}
                                ></AceEditor>
                            </div>
                            <div className="output-container">
                                <div className='output-box'>
                                    <span className="title">Output:</span>
                                </div>

                                <Output value={this.state.output} readOnly></Output>
                                {this.state.isValidOutput ? <div className="result">{this.state.resultMessage}<Button onClick={() => this.props.history.push('/buildin')}>Fazer outro desafio</Button></div> : <div></div>}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}