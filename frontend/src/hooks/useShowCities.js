import {useEffect, useState} from 'react'
import citiesServices from '../services/citiesServices'

function useShowCities(state) {
  const [cities,setCities]=useState([])

  
  useEffect(()=>{
    loadData()
  },[])
  
  if(!state){
    return false
  }
  
  async function loadData(){
    const data=await citiesServices.showCities()
    setCities(data)
    return data
  }

  return cities.filter(citie=>citie.uf===state)
}

export default useShowCities