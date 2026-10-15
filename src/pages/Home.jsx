import api from "../services/api"
import { useEffect, useState } from "react";
import "./Home.css"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import LinkBotao from "../components/LinkBotao";
import StatusBadge from "../components/StatusBadge";
import TabelaChamados from "../components/TabelaChamados";

function Home() {

  const [chamados, setChamados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarChamados() {
      try {
        const resposta = await api.get("/chamados");
        setChamados(resposta.data);
      } catch (erro) {
        console.error(erro);
        setErro("Não foi possível carregar os chamados.");
      } finally {
        setCarregando(false);
      }
    }

    buscarChamados();
  }, []);

  return (
    <>

    <Header />

    <main className="pagina-chamados">
        <div className="content">
          <div className="text">
            <h1>Chamados</h1>
            <p>Acompanhe e atualize os pedidos de manutenção do campus.</p>
          </div>

          <div className="botao-novo">
            <LinkBotao to="/novo" variante="primary">
              + Abrir chamado
            </LinkBotao>
          </div>
        </div>

        

        {carregando && <p>Carregando chamados...</p>}
        {erro && <p>{erro}</p>}
        {!carregando && !erro && chamados.length === 0 && (
            <p>Nenhum chamado encontrado.</p>
        )}
        {!carregando && !erro && chamados.length > 0 && (
            <TabelaChamados chamados={chamados} />
        )}
      </main>
      
    </>
  )
  
}

export default Home;