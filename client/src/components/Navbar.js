import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/card.css'
import logo from "../media/scrappyhead_sticker.png"

export default function Navbar() {
  return (
    <div className="navbar" id="navbar">
        <img src={logo}/>
        <h1><Link to="/">BotBracket</Link></h1>
        <ul>
            <Link to='/bracket'><li>Bracket</li></Link>
            <Link to='/tournaments'><li>Tournaments</li></Link>
            <Link to='/roster'><li>Roster</li></Link>
            <Link to='/login'><li>Login</li></Link>
            &nbsp;
        </ul>
        {/* <i className="material-icons" id="burger">menu</i> */}
    </div>
  )
}
