import React from 'react'
import "../styles/matchScene.css";
import { PlusCircle } from 'react-bootstrap-icons'
import { useState } from 'react';
import { useEffect } from 'react';
// import { useAlert } from 'react-alert';


export default function MatchCard(props) {
  const {reset, names, outcome, setOutcome, select_style, confirm_style, scrappy} = props;

  const [allowPlus, setAllowPlus] = useState(true);
  const [selectedFighter, setSelectedFighter] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [fighterId, setFighterId] = useState("");
  const [bet, setBet] = useState(1);
  // const alert = useAlert()

  useEffect(() => {
      setAllowPlus(true);
      setFighterId("");
      setBet(1);
      setIsConfirmed(false);
  }, [reset]);

  const handlePlus = () => {
    if (allowPlus){
      setAllowPlus(false);
    }
    else {
      setAllowPlus(true);
      setFighterId("");
      setBet(1);
      setOutcome({id:"", bet:0, result:""});
    }
    setIsConfirmed(false);
    // console.log(names);
  }  
  const handleConfirm = (event) => {
    event.preventDefault();
    
    const bot = names.find(name => name.id === fighterId);
    if (bot !== undefined){
      if (Number(bet) < 1 || Number(bet) > Number(bot.chip)){
        alert("You cannot bet " + bet + " chips.\n" + bot.title + " only has " + bot.chip + " chips");
        setBet(1);
      }
      else{
        setSelectedFighter({...bot, bet: bet});
        setIsConfirmed(true);
        if (outcome.result === "winner") {
          setOutcome({...bot, bet: bet, result:"winner"});
        }
        else if (outcome.result === "loser") {
          setOutcome({...bot, bet: bet, result:"loser"});
        }
        else {
          setOutcome({...bot, bet: bet, result:""});
        }
      }
    }
  }

  const handleFighterId = (event) => {
      setFighterId(event.target.value);
      setBet(1);
  }

  return (
    <form className='matchCard' onSubmit={handleConfirm}>
      {allowPlus ? (
          <PlusCircle className='plus-button' onClick={handlePlus}></PlusCircle>
        ) : (
          <>
          { !isConfirmed ? (
            <div className= {select_style}>
              <select 
                name="fighterId"
                value={fighterId}
                onChange={handleFighterId}
              >
                <option value="">Select Bot</option>
                {names.filter((name) => name.chip !== 0).map(name => (
                  <option value={name.id}>{name.title}</option>
                ))}
              </select>
              <img src={scrappy} alt="Logo"/>
              <input
                  type="number"
                  name="bet"
                  autoComplete="off"
                  value={bet}
                  max= {fighterId === ""? 1: names.find((name) => name.id === fighterId).chip}
                  min={1}
                  onChange={(e) => {setBet(e.target.value)}}
                  required
                />
              <div className='bottom-bt-bar'>
                <button type='submit'>Confirm</button>
                <button onClick={handlePlus}>Cancel</button>
              </div>
            </div>
          ) : (
              <div className={confirm_style}>
                <h3>{selectedFighter.title}</h3> 
                <img src={scrappy} alt="Logo"/>
                <h4>Bet: {selectedFighter.bet}</h4>
                <button onClick={handlePlus}>Remove</button>
              </div>
          )}
          </>
        )}
        
    </form>
  )
}
