import { Link } from 'react-router-dom'
import Styles from './exclusao.module.css'

function Exclusão({excluir,tirarMensagem}){
    return(
        <div>
        <div className={Styles.fundo}></div>
        <div className={Styles.exclusao}>
            <h3>Tem certeza que deseja excluir essa conta?</h3>
            <div className={Styles.buttons}>
                <Link to='/Contas'><button onClick={excluir}>Sim</button></Link>
                <button onClick={tirarMensagem}>Não</button>
            </div>
            
        </div>

        </div>
    )
} 

export default Exclusão
