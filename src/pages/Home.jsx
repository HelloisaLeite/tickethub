import api from "../services/api"
import { useEffect, useState } from "react";
import "./Home.css"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import LinkBotao from "../components/LinkBotao";
import StatusBadge from "../components/StatusBadge";
import TabelaChamados from "../components/TabelaChamados";

function Home() {

  // Listar chamados
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

  //Parte do filtro
  const [statusSelecionado, setStatusSelecionado] = useState("");
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState("");
  const [localSelecionado, setLocalSelecionado] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  const chamadosFiltrados = chamados.filter((chamado) => {
    const correspondeStatus =
      statusSelecionado === "" ||
      chamado.status?.toLowerCase() === statusSelecionado.toLowerCase();

    const correspondePrioridade =
      prioridadeSelecionada === "" ||
      chamado.prioridade?.toLowerCase() === prioridadeSelecionada.toLowerCase();

    const correspondeTipo =
      tipoSelecionado === "" ||
      chamado.tipo?.toLowerCase() === tipoSelecionado.toLowerCase();

    const correspondeLocal =
      localSelecionado === "" ||
      chamado.local?.toLowerCase() === localSelecionado.toLowerCase();

    return (
      correspondeStatus &&
      correspondePrioridade &&
      correspondeTipo &&
      correspondeLocal
    );
});



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

        <div className="filtros">
          <h4>Filtrar</h4>

          {/* filtro do status */}
          <select
              value={statusSelecionado}
              onChange={(evento) => setStatusSelecionado(evento.target.value)}
            >
              <option value="">Status</option>
              <option value="aberto">Aberto</option>
              <option value="em andamento">Em andamento</option>
              <option value="resolvido">Resolvido</option>
          </select>

          {/* filtro da prioridade */}
          <select
                value={prioridadeSelecionada}
                onChange={(evento) => setPrioridadeSelecionada(evento.target.value)}
              >
                <option value="">Prioridade</option>
                <option value="alta">Alta</option>
                <option value="média">Média</option>
                <option value="baixa">Baixa</option>
            </select>

            {/* filtro de tipo */}
            <select
                value={tipoSelecionado}
                onChange={(evento) => setTipoSelecionado(evento.target.value)}
              >
                <option value="">Tipo</option>
                <option value="elétrica">Elétrica</option>
                <option value="hidráulica">Hidráulica</option>
                <option value="informática">Informática</option>
                <option value="climatização">Climatização</option>
                <option value="mobiliário">Mobiliário</option>
                <option value="limpeza">Limpeza</option>
                <option value="outro">Outro</option>
            </select>

            {/* filtro de local */}
            <select
                value={localSelecionado}
                onChange={(evento) => setLocalSelecionado(evento.target.value)}
              >
                <option value="">Local</option>
                <option value="Bloco A">Bloco A</option>
                <option value="Bloco B">Bloco B</option>
                <option value="Laboratórios">Laboratórios</option>
                <option value="Biblioteca">Biblioteca</option>
                <option value="Cantina">Cantina</option>
                <option value="Quadra">Quadra</option>
                <option value="Auditório">Auditório</option>
                <option value="Banheiros">Banheiros</option>
                <option value="Estacionamento">Estacionamento</option>
            </select>
        </div>
        

        {carregando && <p>Carregando chamados...</p>}
        {erro && <p>{erro}</p>}
        {!carregando && !erro && chamados.length === 0 && (
            <p>Nenhum chamado encontrado.</p>
        )}
        {!carregando && !erro && chamados.length > 0 && (
            <TabelaChamados chamados={chamadosFiltrados} />
        )}
      </main>
      
    </>
  )
  
}

export default Home;