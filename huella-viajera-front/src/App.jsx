import {Route, Routes} from 'react-router-dom';


//Components:
import { Header } from './pages/components/Header'
import { Inicio } from './pages/inicio'
import { Ingresar } from './pages/Ingresar';
import { Registro } from './pages/components/Registro';
import {OwnerPet} from './pages/Ownerpet'
import {Carer} from './pages/Carer'

function App() {

  return (
    <div className='container mx-auto'>
      <Header/>
      <Routes>
        <Route path="/" element={<Inicio/>}></Route>
        <Route path="/ingresar" element={<Ingresar/>}></Route>
        <Route path="/registro" element={<Registro/>}></Route>
        <Route path="/ownerPet" element={<OwnerPet/>}></Route>
        <Route path="/carer" element={<Carer/>}></Route>
      </Routes>
    </div>
  )
}

export default App
