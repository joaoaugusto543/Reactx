import Styles from './buttonDuplaFuncao.module.css'

function ButtonDuplaFuncao({validacao,funcaoUm,funcaoDois,text}){

    return(
        <>
        {validacao() ? (<button className={Styles.button} onClick={funcaoUm} >{text}</button>):(<button className={Styles.button} onClick={funcaoDois}>{text} </button>)}
        </>
        )
    
}

export default ButtonDuplaFuncao
