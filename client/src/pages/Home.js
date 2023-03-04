import React from 'react';
import Navbar from '../components/Navbar';
import home_img from '../media/home_img.png';
import scrappy_sticker from '../media/scrappy-sticker.png';
import '../styles/home.css';
import { CSSTransition } from 'react-transition-group';

export default function Home() {
  return (
    <div className='homepage'>
      <Navbar></Navbar>

      <div className='main'>
        <div>
          <h2>Robot Battles</h2>
          <h3>Have never been easier</h3>
        </div>
        <img src={home_img}/>
      </div>

      <div className='intro'>
        <img src={scrappy_sticker}/>
        <div className='intro-text'>
          <h2>What is BotBracket?</h2>
          <p>"Water. Earth. Fire. Air. Long ago, the four nations lived together in harmony. Then, everything changed when the Fire Nation attacked. Only the Avatar, master of all four elements, could stop them, but when the world needed him most, he vanished. A hundred years passed and my brother and I discovered the new Avatar, an airbender named Aang. And although his airbending skills are great, he has a lot to learn before he's ready to save anyone. But I believe Aang can save the world."
          </p>
        </div>
      </div>
      
      <div className="footer-home">
          <p>Combat Ready Robotics @ ASU</p>
      </div>
    </div>
  )
}
