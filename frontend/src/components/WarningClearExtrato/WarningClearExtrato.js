import './WarningClearExtrato.css'

function WarningClearExtrato({closeWarning,clear}) {
  return (
    <div className='warningClearExtrato'>
        <div className='warningClearExtratoBox'>
            <p>Tem certeza que deseja limpar seu extrato?</p>
            <div className='boxButtons'>
                <button onClick={clear}>Sim</button>
                <button onClick={closeWarning}>Não</button>
            </div>
        </div>
    </div>
  )
}

export default WarningClearExtrato