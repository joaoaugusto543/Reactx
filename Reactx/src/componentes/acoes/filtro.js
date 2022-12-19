import { useEffect, useState } from 'react';

import SelectAcoes from '../forms/SelectAcoes';
import Styles from './filtro.module.css'

function Filtro({filtro,setFiltro}){

    const [tipoAcoes,setTipoAcoes]=useState()

    useEffect(()=>{
        fetch('http://localhost:5000/Acoes',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json()).then(data=>setTipoAcoes(data))
    },[])
    

    function handleTipoAcao(e){
       
        setFiltro({...filtro,tipoDaAcao:{
            id:e.target.value,
            tipo:e.target.options[e.target.selectedIndex].text   
        }})

     

    }

    function handleFiltro(e){
        setFiltro({...filtro,[e.target.name]:e.target.value})
        
       
    }

  
    return(
        <div className={Styles.filtro} >
            <form>
            <label htmlFor='nomeFiltrada'>Nome</label>
            <input type='text' name='nomeFiltrada' id='nomeFiltrada' placeholder='Ex:Salário' value={filtro.nomeFiltrada ? filtro.nomeFiltrada:''} onChange={handleFiltro}></input>
            <label htmlFor='dataFiltrada'>Data</label>
            <input type='date' name='dataFiltrada' id='dataFiltrada' value={filtro.dataFiltrada ? filtro.dataFiltrada:''} onChange={handleFiltro}></input>
            </form>
            <SelectAcoes name='tipoDaAcao' array={tipoAcoes} text='Acão' value={filtro.tipoDaAcao ? filtro.tipoDaAcao.id:''} OnChange={handleTipoAcao}/>
        
        </div>
        )
}

export default Filtro