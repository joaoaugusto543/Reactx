import {FaFacebook,FaGithub,FaInstagram} from 'react-icons/fa'

import Styles from './Footer.module.css'


function Footer(){
    return(
        <footer className={Styles.footer}>
           

                <div className={Styles.redes_sociais} >

              
                    <a href='/'><FaFacebook/> <p>João Correia Lopes</p> </a>

                    <a href='/'><FaInstagram/> <p>@joao_correia_lopes</p></a>

                    <a href='https://github.com/joaoaugusto543'><FaGithub/> <p>joaoaugusto543</p></a>

                </div>

                <div className={Styles.copyright}>
                    <p>copyright&copy;. Todos os direitos reservados à Reactx.</p>
                </div>


        </footer>
      
    )
}

export default Footer