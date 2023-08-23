import './NavBar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {BiSupport,BiLogOut} from 'react-icons/bi'
import {BsShieldLockFill} from 'react-icons/bs'
import Logo from '../../img/logo.png'
import { useDispatch } from 'react-redux'
import { logout } from '../../slices/authSlices'
import { resetAccount } from '../../slices/accountSlices'
import { resetUser } from '../../slices/userSlices'
import openNavBar from '../../scripts/NavBar/openNavBar'
import closeNavBar from '../../scripts/NavBar/closeNavBar'
import {AiOutlineMenu} from 'react-icons/ai'
import { useEffect } from 'react'
import screenSize from '../../scripts/NavBar/screenSize'

function NavBar() {

  const dispatch=useDispatch()

  const navigate=useNavigate()

  function handleLogout(){
    dispatch(logout())
    dispatch(resetAccount())
    dispatch(resetUser())
    navigate('/login')
  }

  useEffect(()=>{
    screenSize()
  },[])

  return (
    <>
      <button className='buttonNavBar buttonOpenNavBar' onClick={openNavBar}><AiOutlineMenu/></button>
      <button className='buttonNavBar buttonCloseNavBar' onClick={closeNavBar}><AiOutlineMenu/></button>
      <nav>
        <img className='logo' src={Logo} alt='logo' />
        <ul className='navLinks'>
          <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/'><AiFillHome/>Home</NavLink></li>
          <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/profile'><CgProfile/>Perfil</NavLink></li>
          <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/support'><BiSupport/>Suporte</NavLink></li>
          <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/security'><BsShieldLockFill/>Segurança</NavLink></li>
          <li><button className='logout' onClick={handleLogout}><BiLogOut/>Sair</button></li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar