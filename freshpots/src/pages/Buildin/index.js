import React from 'react'
import './style.css'
import Image from './img/under-construction.jpg'
import Logo from './img/logo.png'
import { Link } from 'react-router-dom'

export default function Build(props) {
    return (
        <div className="build">
            <Link to='/'><img className="logo" src={Logo}></img></Link>
            <h1>Página em construção</h1>
            <Link to='/challenge'><h2>Voltar para o desafio</h2></Link>
            <img className='image' src={Image}></img>

        </div>
    )
}