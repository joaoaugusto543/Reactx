import Logo from '../../imgs/logo.png'
import Styles from './NavBar.module.css'
import Conteiner from './Conteiner'
import { Link } from 'react-router-dom'

function NavBar(){
    return(
        <>
        <header  className={Styles.cabecalho}>
            <Conteiner>
          
            <img src={Logo} alt='logo'></img>
            <ul>
                <li> <Link to='/'>Home</Link></li>
                <li> <Link to='/Contas'>Contas</Link></li>
                <li> <Link to='/Contato'>Contato</Link></li>
                <li> <Link to='/SobreNos'>Sobre nós</Link></li>
            </ul>

           

            </Conteiner>
        </header>
        </>
    )
}

export default NavBar