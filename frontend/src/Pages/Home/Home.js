import { useDispatch, useSelector } from 'react-redux'
import './Home.css'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { profile } from '../../slices/userSlices'
import Loader from '../../components/Loader/Loader'
import { checkDebt, getAccount } from '../../slices/accountSlices'

function Home() {

  const {user,loading}=useSelector((state)=>state.user)
  const {account,loading:loadingAccount}=useSelector((state)=>state.account)

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(profile())
    dispatch(getAccount())
    dispatch(checkDebt())
  },[dispatch])

  return (
    <div className='home'>
      {!user && loading && <Loader type='Page'/>}
      {user && !loading && !account && loadingAccount && <Loader type='Page'/>}
      {user && account &&
        <section className='bannerHome'>
          <div className='content'>
            <div className='codeAndHello'>
              <div className='codeAccount'>
                <p className='cooperative'>Cooperativa/Conta</p>
                <p className='code'>{account.code}</p>
              </div>
              <div className='hello'>
                  <h1>Olá, {user.name}.</h1>
                  <p>Seja bem-vindo(a) ao Reactx</p>
              </div>
            </div>
            <div className='moneyAndPhrase'>
              <div className='divMoney'>
                <p className='money'>R$ {account.total.replace('.',',')}</p>
                {account.debt && <p className='debt'>Dívida de R$ {account.debt.replace('.',',')}</p>}
              </div>
              <div className='phrase'>
                <p className='phraseOne'>Suas finanças são nossa prioridade.</p>
                <p className='phraseTwo'>Reactx sempre a frente.</p>
              </div>
            </div>
            <ul className='actions'>
              <li><Link to='/transfer'>Fazer transferência</Link></li>
              <li><Link to='/extrato'>Ver extrato</Link></li>
              <li><Link to='/credit'>Crédito</Link></li>
              <li className='later'><Link to='/support'>Suporte</Link></li>
            </ul>
          </div>
        </section>
      }
    </div>
  )
}

export default Home