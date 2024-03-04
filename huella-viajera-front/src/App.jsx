import { Route, Routes } from "react-router-dom";

//Components:
import { Header } from "./pages/Header";
import { Inicio } from "./pages/inicio";
import { Ingresar } from "./pages/Ingresar";
import { Registro } from "./pages/Registro";
import { OwnerPet } from "./pages/OwnerPet/OwnerPet";
import { Carer } from "./pages/Carer/Carer";

function App() {
  return (
    //agregar este param al container para cambiar fuente:
    // style={{fontFamily: 'Poppins'}}
    <div className="container mx-auto">
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/ingresar" element={<Ingresar />}></Route>
        <Route path="/registro" element={<Registro />}></Route>
        <Route path="/ownerPet" element={<OwnerPet />}></Route>
        <Route path="/carer/*" element={<Carer />}></Route>
      </Routes>
    </div>
  );
}

export default App;
