import './NotFound.css'
import Gear from '../../img/gear.png'

function NotFound() {
  return (
    <div className='notFound'>
        <h1>Erro 404</h1>
        <img src={Gear} alt='engrenagem' />
        <h2>Página não encontrada.</h2>
    </div>
  )
}

export default NotFound