import Styles from './acoesCard.module.css'
import { AiFillCloseCircle } from "react-icons/ai";

function AcoesCards({id,nomeAcao,valor,dataDaAcao,tipo,remover,desaparecer}){

    function remove(e){
        e.preventDefault()
        remover(id)
    }
    
    return(
        <div>
        {!desaparecer && (

             <div className={Styles.cardAcao}>
                <button className={Styles.fechar} onClick={remove}><AiFillCloseCircle/></button>
                <h4 className={Styles.nome}>{nomeAcao}</h4>
                <p><span>Valor:</span>{valor}</p>
                <p><span>Data:</span>{dataDaAcao}</p>
                <p><span>Tipo:</span>{tipo}</p>
            </div>

        )}
        </div>
    )
}

export default AcoesCards
