import Styles from './Conteiner.module.css'

function Conteiner(props){
    return <div className={`${Styles.container} ${Styles[props.customClass]}`}>{props.children}</div>
    
}
export default Conteiner

