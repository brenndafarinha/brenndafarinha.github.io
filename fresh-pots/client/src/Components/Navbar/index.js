import React, { Component } from 'react'
import Logo from './img/logo.png'
import './style.css'
import { Link } from 'react-router-dom'




export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            toggle: ""
        }
        // this.handleResponsiveMenu= this.handleResponsiveMenu.bind(this);
    }

    handleResponsiveMenu = () => {
        if (this.state.open) {
            this.setState({
                open: false,
                toggle: ""

            })
        } else {
            this.setState({
                open: true,
                toggle: "change"

            })
        }
    }


    render() {
        let classOptions = "nav-menu__options"
        let classMenuButton = 'nav-menu__btn'
        if (this.state.open) {
            classOptions += " nav-menu__options active"
            classMenuButton += " nav-menu__botao--open"
            document.getElementById('nav-menu').classList.add('active')
        } else {
            classOptions = "nav-menu__options"
            classMenuButton = "'nav-menu__btn'"
            
        }

        return (
            <nav className="nav">
                <div className="nav-content">
                    <Link to='/'><img className="nav-logo" src={Logo}></img></Link>
                    <div className={`menu-responsive ${this.state.toggle}`} onClick={this.handleResponsiveMenu}>
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>
                    {this.props.children}
                </div>
                {/* <div className='menu-options'>{this.props.children}</div> */}
            </nav>
        )
    }
}