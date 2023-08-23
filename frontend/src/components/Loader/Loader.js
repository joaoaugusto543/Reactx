import './Loader.css'

function Loader({type}) {
  return (
    <div className={`backgrounLoader backgrounLoader${type}`} data-testid='Loader' >
        <div className={`loader loader${type}`}></div>
    </div>
  )
}

export default Loader