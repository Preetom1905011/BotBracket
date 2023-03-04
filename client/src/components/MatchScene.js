import React, { useState } from 'react'
import '../styles/matchScene.css'
import MatchCard from './MatchCard'
import scrappyRed from '../media/Updated_Logo_red.png'; 
import scrappyBlue from '../media/Updated_Logo_blue2.png'; 
import vs_logo from '../media/VS_img2.png'; 
import WinToggle from './WinToggle';
import { useCallback } from 'react';
import Timer from './Timer';

export default function MatchScene({names, setNames}) {

  const [outRed, setOutRed] = useState({id:"", bet:0, result:""});
  const [outBlue, setOutBlue] = useState({id:"", bet:0, result:""});
  const [toggleState, setToggleState] = useState('na');
  const [reset, setReset] = useState(false);
  const [matches, setMatches] = useState([]);

  const handleEndMatch = (e) => {
    console.log(toggleState);
    setReset(!reset);

    let winnerName = {id:""};
    let loserName = {id:""};

    const redName = (names.find(name => name.id === outRed.id)).title;
    const blueName = (names.find(name => name.id === outBlue.id)).title;
    
    if (outRed.result === "winner" && outBlue.result === "loser"){
      winnerName = outRed;
      loserName = outBlue;

      setMatches([...matches, {"red": redName, "redScore": '+'+loserName.bet, "blue": blueName, "blueScore": '-'+loserName.bet}]);
    }
    else if (outRed.result === "loser" && outBlue.result === "winner"){
      winnerName = outBlue;
      loserName = outRed;

      setMatches([...matches, {"red": redName, "redScore": '-'+loserName.bet, "blue": blueName, "blueScore": '+'+loserName.bet}]);
    }
    
    const edited = names.map(name =>{
      if (name.id === winnerName.id && winnerName.id !== loserName.id) {
          return { ...name, chip: Number(name.chip) + Number(loserName.bet)};
      }
      else if (name.id === loserName.id  && winnerName.id !== loserName.id) {
        return { ...name, chip: Number(name.chip) - Number(loserName.bet)};
      }
      else return name;
    });
    

    handleSortName(edited);
    setToggleState("na");
    setOutRed({id:"", bet:0, result:""});
    setOutBlue({id:"", bet:0, result:""});

    console.log(matches);

  }

  const handleSortName = (names) => {
    // set the state to the newly created sorted array with the three dots operator:
    setNames(
      [...names].sort((a, b) => Number(b.chip) - Number(a.chip))
    );
  };

  // const childApi = useCallback((api) => {
  //   // do something in the parent with the childs exposed api
  //   api.updateState();
  // });

  return (
    <div className='backdrop'>
        <Timer 
            toggleState={toggleState} 
            setToggleState={setToggleState}
            reset={reset} 
            outRed={outRed} 
            outBlue={outBlue}></Timer>
        <div className='side-grid'>
          <MatchCard 
              reset={reset}
              names={names} 
              outcome={outRed}
              setOutcome={setOutRed}
              select_style={"fighter-select"} 
              confirm_style={"fighter-confirmed"}
              scrappy={scrappyRed}></MatchCard>
          <img src={vs_logo} className="vs_img"/>
          <MatchCard 
              reset={reset}
              names={names} 
              outcome={outBlue}
              setOutcome={setOutBlue}
              select_style={"fighter-select fighter-select2"} 
              confirm_style={"fighter-confirmed fighter-confirmed2"}
              scrappy={scrappyBlue}></MatchCard>
        </div>
        <WinToggle 
              outRed={outRed} 
              setOutRed={setOutRed} 
              outBlue={outBlue} 
              setOutBlue={setOutBlue}
              toggleState={toggleState}
              setToggleState={setToggleState}></WinToggle>
        <button 
              className='end-match-bt'
              onClick={handleEndMatch} 
              disabled={toggleState === "na"? true: false}>END MATCH</button>
        <div className='match-history'>
          <h3>Match History</h3>
          <div className='scroll'>
            {matches.slice(0).reverse().map(match => (
              <li className='match-hist-list' key={match.red + " " + match.blue}>
                <div className='match-list-each'>
                  <span>{match.red}</span> 
                  {match.redScore}
                </div>
                <div className='match-list-each list-each2'>
                  <span>{match.blueScore}</span>
                  <span>{match.blue}</span> 
                </div>
              </li>
            ))}
          </div>
        </div>
    </div>
  )
}

