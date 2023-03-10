import React, { useEffect, useState } from 'react'
import '../styles/matchScene.css'
import MatchCard from './MatchCard'
import scrappyRed from '../media/Updated_Logo_red.png'; 
import scrappyBlue from '../media/Updated_Logo_blue2.png'; 
import vs_logo from '../media/VS_img2.png'; 
import WinToggle from './WinToggle';
import Timer from './Timer';
import { useBotsContext } from '../contexts/useBotContext';
import { useMatchesContext } from '../contexts/useMatchContext';
import {useSelectedTMContext} from '../contexts/useSelectedTMContext';

export default function MatchScene({sortedNames}) {

  const {names, dispatch} = useBotsContext()
  const {matches, dispatch: matchDispatch} = useMatchesContext()
  const {selectedTourney} = useSelectedTMContext()
  const [outRed, setOutRed] = useState({_id:"", bet:0, result:""});
  const [outBlue, setOutBlue] = useState({_id:"", bet:0, result:""});
  const [toggleState, setToggleState] = useState('na');
  const [reset, setReset] = useState(false);
  const [timerState, setTimerState] = useState("reset");

  // to prevent same bots being chosen 
  const [fightersDuo, setFightersDuo] = useState([]);

  // call PATCH request here to update botlist
  const handleEndMatch = async (e) => {
    console.log(toggleState);
    setReset(!reset);

    let winnerName = {_id:""};
    let loserName = {_id:""};
    let newMatch = null;

    console.log("outRed", outRed);
    try{
      const redName = (names.find(name => name._id === outRed._id)).title;
      const blueName = (names.find(name => name._id === outBlue._id)).title;
    
      if (outRed.result === "winner" && outBlue.result === "loser"){
        winnerName = outRed;
        loserName = outBlue;

        // setMatches([...matches, {"red": redName, "redScore": '+'+loserName.bet, "blue": blueName, "blueScore": '-'+loserName.bet}]);
        newMatch = {"red": redName, "redScore": '+'+loserName.bet, "blue": blueName, "blueScore": '-'+loserName.bet}
      }
      else if (outRed.result === "loser" && outBlue.result === "winner"){
        winnerName = outBlue;
        loserName = outRed;

        // setMatches([...matches, {"red": redName, "redScore": '-'+loserName.bet, "blue": blueName, "blueScore": '+'+loserName.bet}]);
        newMatch = {"red": redName, "redScore": '-'+loserName.bet, "blue": blueName, "blueScore": '+'+loserName.bet}
      }
      
      const winner = names.find((name) => name._id === winnerName._id)
      const loser = names.find((name) => name._id === loserName._id)

      console.log("match", matches);
      // update winner
      const response1 = await fetch('http://localhost:4000/api/participants/'+winner._id, {
        method: 'PATCH',
        body: JSON.stringify({chip: winner.chip + Number(loserName.bet)}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json1 = await response1.json()
      if (response1.ok){
        dispatch({type: 'UPDATE_BOT', payload: json1})
      }
      // update loser
      const response2 = await fetch('http://localhost:4000/api/participants/'+loser._id, {
        method: 'PATCH',
        body: JSON.stringify({chip: loser.chip - Number(loserName.bet)}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json2 = await response2.json()
      if (response2.ok){
        dispatch({type: 'UPDATE_BOT', payload: json2})
      }

      // add match to DB
      const response3 = await fetch('http://localhost:4000/api/matches', {
        method: 'POST',
        body: JSON.stringify(newMatch),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json3 = await response3.json()

      if (!response3.ok){
        alert(json3.error)
      }
      else {
        // setError(null);
        console.log("New Match Added")
        matchDispatch({type: "ADD_MATCH", payload: json3})
        // add match to the TM DB
        const response4 = await fetch('http://localhost:4000/api/tournaments/matches/'+selectedTourney._id, {
          method: 'POST',
          body: JSON.stringify(json3),
          headers: {
            'Content-Type': 'application/json'
          }
        })

      }

      setToggleState("na");
      setOutRed({_id:"", bet:0, result:""});
      setOutBlue({_id:"", bet:0, result:""});
    } catch(error) {
      console.log("No Bot selected")
    }

  }


  // mount all the matches from DB
  useEffect(() => {
    const fetchMatches = async () => {
      if (selectedTourney._id !== "Default"){
        const response = await fetch('http://localhost:4000/api/tournaments/matches/'+selectedTourney._id)
        const json = await response.json()

        if (response.ok){
          console.log("-->", json)
          console.log("SET MATCH", json)
          // setNames(data)
          matchDispatch({type: 'SET_MATCHES', payload: json})
        }
        else{
          console.log("failed")
        }
      }
    }
    fetchMatches()
  }, [])


  return (
    <div className='backdrop'>
        <Timer 
            toggleState={toggleState} 
            setToggleState={setToggleState}
            timerState={timerState} 
            setTimerState={setTimerState}
            reset={reset} 
            outRed={outRed} 
            outBlue={outBlue}></Timer>
        <div className='side-grid'>
          <MatchCard 
              reset={reset}
              sortedNames={sortedNames}
              outcome={outRed}
              setOutcome={setOutRed}
              fightersDuo={fightersDuo}
              setFightersDuo={setFightersDuo}
              toggleState={toggleState}
              timerState={timerState} 
              select_style={"fighter-select"} 
              confirm_style={"fighter-confirmed"}
              scrappy={scrappyRed}></MatchCard>
          <img src={vs_logo} className="vs_img"/>
          <MatchCard 
              reset={reset}
              sortedNames={sortedNames}
              outcome={outBlue}
              setOutcome={setOutBlue}
              fightersDuo={fightersDuo}
              setFightersDuo={setFightersDuo}
              toggleState={toggleState}
              timerState={timerState} 
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
            {matches.map(match => (
              <li className='match-hist-list' key={match._id}>
                <div className={Number(match.redScore) < 0? 'match-list-each list-each-lose': 'match-list-each list-each-win'}>
                  <span>{match.red}</span> 
                  {match.redScore}
                </div>
                <div className={Number(match.blueScore) < 0? 'match-list-each list-each-lose': 'match-list-each list-each-win'}>
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

