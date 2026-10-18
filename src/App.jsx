import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Apresentacao from "./pages/Apresentacao";
import DetalheChamado from "./pages/DetalheChamado";
import FormularioChamado from "./pages/FormularioChamado";
import './App.css'

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Apresentacao />} />
        <Route path="/chamados" element={<Home />} />
        <Route path="/chamado/:id" element={<DetalheChamado />} />
        <Route path="/novo" element={<FormularioChamado />} />
        <Route path="/editar/:id" element={<FormularioChamado />} />
      </Routes>
    </div>
  )
}

export default App;
