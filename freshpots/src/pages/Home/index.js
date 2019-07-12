import React from 'react'
import Navbar from '../../Components/Navbar'
import './home.css'
import HomeImage from './img/home-freshpots.png'
import ImageBg from './img/home-image-bg-01.png'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="home">
            <Navbar>
                <div className="nav-menu" id='nav-menu'>
                    <ul>
                        <Link to='/login'><li>Entrar</li></Link>
                        <Link to='/register'><li>Cadastre-se</li></Link>
                    </ul>
                </div>
            </Navbar>
            <div className="home-container">


                <div className="home-descript">
                    <h1>Fresh Pots</h1>
                    <p>Desafie você mesmo e melhore suas habilidades em JavaScript resolvendo desafios com as mãos no código.</p>
                    <Link to='/login'><button className="home-btn">Começar!</button></Link>
                </div>
                <div className="home-image">
                    <img className="image-1" src={HomeImage}></img>
                    <img className="image-2" src={ImageBg}></img>
                </div>

            </div>

        </div>
    )
}