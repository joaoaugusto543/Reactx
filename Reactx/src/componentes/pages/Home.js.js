
import Styles from './Home.module.css'
import Saving from '../../imgs/savings.svg' 
import { Link } from 'react-router-dom'

function Home(){
    return(
        <div className={Styles.home}>
            
                <h1>Bem vindo ao <span>Reactx</span></h1>
                <h2>Cuidamos bem das suas finanças</h2>
                <img src={Saving} alt='Porco'></img>
                <Link to='/NewConta'><button>Criar conta</button></Link>
       
        </div>
    )
}
export default Home