import { useState } from 'react'
import './ConfigExtrato.css'
import { clearExtract } from '../../slices/accountSlices'
import { useDispatch } from 'react-redux'
import WarningClearExtrato from '../WarningClearExtrato/WarningClearExtrato'

function ConfigExtrato({setExtrato,closeConfig,extrato}) {

  const [maxValue,setMaxValue]=useState('')
  const [minValue,setMinValue]=useState('')
  const [name,setName]=useState('')
  const [date,setDate]=useState('')
  const [showWarning,setShowWarning]=useState(false)
  const dispatch=useDispatch()

  function clear(){
    dispatch(clearExtract())
    closeConfig()
    setExtrato([])
    setShowWarning(false)
  }

  function clearFilter(e){

    e.preventDefault()

    setExtrato(extrato)
    setMaxValue('')
    setMinValue('')
    setDate('')
    setName('')
  }

  function handleShowWarning(){
    setShowWarning(true)
  }

  function handleCloseWarning(){
    setShowWarning(false)
  }

  function handleSubmit(e){

    e.preventDefault()

    const filteredExtrato=extrato.filter((e)=>{

        if(e.name.indexOf(name)===-1 && name !== ''){
            return false
        }

        if(e.date!==date.split('-').reverse().join('/') && date !==''){
            return false
        }

        if(parseFloat(e.value.replace('R$','')) > parseInt(maxValue) && maxValue!==''){
            return false
        }

        if(parseFloat(e.value.replace('R$','')) < parseInt(minValue) && minValue!=='') {
            return false
        }

        return e
    })

    setExtrato(filteredExtrato)
    closeConfig()
  }


  return (
    <>
        {showWarning && <WarningClearExtrato clear={clear} closeWarning={handleCloseWarning}/>}
        <div className='configExtrato'>
            <h1>Filtro</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input type='text' placeholder='Digite o nome' value={name} onChange={(e)=>setName(e.target.value)}/>
                </label>
                <label>
                    <span>Valor máximo:</span>
                    <p>R$ {maxValue}</p>
                    <input type='range' min='-15000' max='15000' value={maxValue} onChange={(e)=>setMaxValue(e.target.value)} />
                </label>
                <label>
                    <span>Valor mínimo:</span>
                    <p>R$ {minValue}</p>
                    <input type='range' min='-15000' max='15000' value={minValue} onChange={(e)=>setMinValue(e.target.value)} />
                </label>
                <label>
                    <span>Data:</span>
                    <input type='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
                </label>
                <div className='buttonsFilter'>
                    <input type='submit' value='Filtrar' />
                    <input type='submit' value='Limpar filtro' onClick={clearFilter} className='clearFilter' />
                </div>
            </form>
            <h1>Limpar</h1>
            <div className='divButton'>
                <button className='clear' onClick={handleShowWarning} >Limpar</button>
            </div>
        </div>
    </>
  )
}

export default ConfigExtrato