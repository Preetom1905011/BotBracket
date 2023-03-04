import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import MatchScene from '../components/MatchScene';
import '../styles/base.css';
import '../styles/card.css';
import '../styles/bracket.css'
import { CSSTransition } from 'react-transition-group';

export default function Bracket() {
  
  // const [input, setInput] = useState({botname: "", chipnum: "3"});
  const [input, setInput] = useState({});
  const [names, setNames] = useState([]);

  return (
    <div>
      <Navbar></Navbar>
      <div className='side-grid-main'>
        <span>
        <CSSTransition
            appear
            in
            classNames="card-transition"
            timeout={350}
        >
            <Card
                input={input} 
                setInput={setInput} 
                names={names} 
                setNames={setNames}>
            </Card>
        </CSSTransition>
        </span>
        <CSSTransition
            appear
            in
            classNames="matchScene-transition"
            timeout={350}
        >
            <MatchScene names={names} setNames={setNames}></MatchScene>
        </CSSTransition>
      </div>

      <div className="footer">
          <p>Combat Ready Robotics @ ASU</p>
      </div>
    </div>
  );
}
