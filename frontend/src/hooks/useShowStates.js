import {useEffect, useState} from 'react'
import statesServices from '../services/statesServices'

function useShowStates() {
  const [states,setStates]=useState([])

  useEffect(()=>{
    loadData()
  },[])

  async function loadData(){
    const data=await statesServices.showStates()
    setStates(data)
    return data
  }

  return states
}

export default useShowStates