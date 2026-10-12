import { Link } from "react-router-dom";
import logo from "../assets/logo-tickethub.png";
import "./Apresentacao.css";
import LinkBotao from "../components/LinkBotao";

function Apresentacao() {
  return (
    <main className="apresentacao">
        
      <div className="logo-container">
        <img src={logo} alt="Logo do TicketHub" className="logo" />
      </div>

      <div className="descricao">
        <p>Registre problemas, acompanhe chamados e facilite a manutencão do campus!</p>
      </div>

      <LinkBotao to="/chamados" variante="primary">
        Acessar Chamados →
      </LinkBotao>

    </main>
  );
}

export default Apresentacao;