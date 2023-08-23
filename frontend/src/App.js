import './App.css'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import NavBar from './components/NavBar/NavBar';
import Profile from './Pages/Profile/Profile';
import Support from './Pages/Support/Support';
import Security from './Pages/Security/Security'
import Credit from './Pages/Credit/Credit';
import Transfer from './Pages/Transfer/Transfer';
import Extrato from './Pages/Extrato/Extrato';
import { useSelector } from 'react-redux';
import Waiting from './Pages/Waiting/Waiting';
import NotFound from './Pages/NotFound/NotFound'
import Loader from './components/Loader/Loader';
import { useEffect } from 'react';
import Banned from './Pages/Banned/Banned';


function App() {

  const {auth,loading,errors}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  
  useEffect(()=>{
    
    if(errors){

      console.log(errors)

      if(errors==='User on hold'){
        navigate('/waiting')
      }

      if(errors==='User has been banned'){
        navigate('/banned')
      }
    }
    
  },[errors,navigate])

  if(loading){
    return <Loader/>
  }

  return (
    <>
      {auth && <NavBar/>}
      <Routes>
        <Route exact path='/' element={auth ? <Home/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={!auth ? <Login/> : <Navigate to='/'/>}/>
        <Route path='/register' element={!auth ? <Register/> : <Navigate to='/'/>}/>
        <Route path='/profile' element={auth ? <Profile/> : <Navigate to='/login'/>}/>
        <Route path='/support' element={<Support/>}/>
        <Route path='/security' element={auth ? <Security/> : <Navigate to='/login'/>}/>
        <Route path='/credit' element={auth ? <Credit/> : <Navigate to='/login'/>}/>
        <Route path='/transfer' element={auth ? <Transfer/> : <Navigate to='/login'/>}/>
        <Route path='/extrato' element={auth ? <Extrato/> : <Navigate to='/login'/>}/>
        <Route path='/waiting' element={!auth ? <Waiting/> : <Navigate to='/'/>}/>
        <Route path='/banned' element={!auth ? <Banned/> : <Navigate to='/'/>}/>
        <Route path='*' element={auth ? <NotFound/> : <Navigate to='/login'/>}/>
      </Routes>
    </>

  )
}

export default App;
