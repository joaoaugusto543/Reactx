import Loading from '../../imgs/loading.svg'
import Styles from './loader.module.css'

function Loader(){
    return(
        <div className={Styles.loader}>
            <img src={Loading} alt='loader'></img>
        </div>
    )
}
export default Loader