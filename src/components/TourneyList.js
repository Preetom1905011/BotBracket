import React, { useEffect, useState } from 'react'
import '../styles/card.css'
import '../styles/tournament.css'
import {useSelectedTMContext} from '../contexts/useSelectedTMContext';
import { useTMContext } from "../contexts/useTMContext";

const TourneyList = () => {

  const {selectedTourney, dispatch: selectDispatch} = useSelectedTMContext()
  const {allTournaments, dispatch: allTMDispatch} = useTMContext()

  const handleLoadTourney = async (TM) => {
    console.log(TM);
    // setSelectedTourney(name);
    // select this TM
    selectDispatch({type: "UPDATE_TM", payload: TM})
  }

  // Load the tournaments from DB on mount
  useEffect(() => {
    console.log(process.env.REACT_APP_URL)
    const fetchTMS = async () => {
      const response = await fetch(process.env.REACT_APP_URL+'/api/tournaments')
      const json = await response.json()

      if (response.ok){
        console.log("-->", json)
        allTMDispatch({type: 'SET_TMS', payload: json})
        // selectDispatch({type: "UPDATE_TM", payload: json[0]})
      }
      else{
        console.log("failed")
      }
    }

    fetchTMS()
  }, [])

  return (
      <div className='TM-scroll-box'>
        {allTournaments && allTournaments.map(TM => (
          (selectedTourney && selectedTourney._id === TM._id?
            <li className='TM-list-item container TM-list-item-selected' key={TM._id}>
              {TM.name} 
            </li>
            : <li className='TM-list-item container' onClick={() => {handleLoadTourney(TM);}} key={TM._id}>
            {TM.name} 
          </li>
          )
        ))}
      </div>

  )
}


export default TourneyList
