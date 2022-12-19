import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import Conteiner from './componentes/layout/Conteiner';
import Footer from './componentes/layout/Footer';
import NavBar from './componentes/layout/NavBar'
import Conta from './componentes/pages/Conta';
import EditarConta from './componentes/pages/ContaEditar';
import Contas from './componentes/pages/Contas';
import Contato from './componentes/pages/Contato';
import Home from './componentes/pages/Home';
import NewConta from './componentes/pages/NewConta';
import SobreNos from './componentes/pages/SobreNos';

function App() {
  return (
    <Router>
      <NavBar/>
      <Conteiner customClass='min_height'>
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route path='/Contas' element={<Contas/>}></Route>
            <Route path='/SobreNos' element={<SobreNos/>}></Route>
            <Route path='/Contato' element={<Contato/>}></Route>
            <Route path='/NewConta' element={<NewConta/>}></Route>
            <Route path='/Conta/:id' element={<Conta/>}></Route>
            <Route path='/EditarConta/:id' element={<EditarConta/>}></Route>
           

          </Routes>
      </Conteiner>

      <Footer/>
    </Router>
  );
}

export default App;
