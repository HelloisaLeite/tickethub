import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";
import "./DetalheChamado.css";
import StatusBadge from "../components/StatusBadge"

function DetalheChamado() {
  const { id } = useParams();

  const [chamado, setChamado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [responsavel, setResponsavel] = useState("");
  const [solucao, setSolucao] = useState("");
  const [dataResolucao, setDataResolucao] = useState("");

  /* Usa isso para navegar até as páginas depois do alert */
  const navegar = useNavigate();

  /* Função para deletar chamado */
  async function ExcluirChamado() {
    const confirmar = window.confirm(
      "Tem certeza de que deseja excluir esse chamado? As informações preenchidas serão perdidas."
    );

    if (confirmar) {
      try {
        await api.delete(`/chamados/${id}`);

        alert("Chamado excluído com sucesso!");

        navegar("/chamados");
      } catch (erro) {
        console.error("Erro ao excluir chamado:", erro);

        alert("Não foi possível excluir o chamado. Tente novamente.");
      }
    }
  }

  // busca as infomações do chamado na api
  useEffect(() => {
    async function buscarChamado() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await api.get(`/chamados/${id}`);
        setChamado(resposta.data);
      } catch (erro) {
        console.error(erro);
        setErro("Não foi possível carregar os dados do chamado.");
      } finally {
        setCarregando(false);
      }
    }

    buscarChamado();
  }, [id]);

  if (carregando) {
    return (
      <>
        <Header />
        <main className="pagina-detalhe">
          <p>Carregando chamado...</p>
        </main>
      </>
    );
  }

  if (erro || !chamado) {
    return (
      <>
        <Header />
        <main className="pagina-detalhe">
          <p>{erro || "Chamado não encontrado."}</p>
          <Link to="/chamados">Voltar para chamados</Link>
        </main>
      </>
    );
  }

  const status = chamado.status?.toLowerCase();

  const aberto = status === "aberto";
  const emAndamento =
    status === "em andamento" || status === "em_andamento";
  const resolvido = status === "resolvido";

  // funçao para formatar a data no formato brasileiro
  function formatarData(data) {
    if (!data) return "Não informada";

    return new Date(data).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  }

  // função para iniciar o atendimento 
  async function iniciarAtendimento() {
    if (!responsavel.trim()) {
      alert("Informe o nome do responsável pelo atendimento.");
      return;
    }

    try {
      await api.patch(`/chamados/${id}/iniciar`, {
        responsavel: responsavel.trim(),
      });

      alert("Atendimento iniciado com sucesso!");

      // Busca novamente os dados atualizados na API
      const resposta = await api.get(`/chamados/${id}`);
      setChamado(resposta.data);
      setResponsavel("");
    } catch (erro) {
      console.error(
        "Erro ao iniciar atendimento:",
        erro.response?.data || erro
      );
      alert("Não foi possível iniciar o atendimento.");
    }
  }

  // função para resolver o chamado

  async function resolverChamado() {
    if (!solucao.trim()) {
      alert("Descreva a solução do problema antes de concluir.");
      return;
    }

    if (!dataResolucao) {
      alert("Informe a data em que o problema foi resolvido.");
      return;
    }

    try {
      await api.patch(`/chamados/${id}/resolver`, {
        solucao: solucao.trim(),
        data_resolucao: dataResolucao,
      });

      alert("Chamado resolvido com sucesso!");

      const resposta = await api.get(`/chamados/${id}`);
      setChamado(resposta.data);
      setSolucao("");
      setDataResolucao("");
    } catch (erro) {
      console.error(
        "Erro ao resolver chamado:",
        erro.response?.data || erro
      );

      alert("Não foi possível resolver o chamado. Verifique se a API aceita a data informada.");
    }
  }

  return (
    <>
      <Header />

      <main className="pagina-detalhe">
        <Link className="voltar-chamados" to="/chamados">
          ← Voltar para chamados
        </Link>

        <section className="detalhes-box">
          <div className="detalhe-topo">

            <div>
              <h2>{chamado.titulo}</h2>
              <p>Prioridade {chamado.prioridade}</p>
            </div>

            <div className="status">
              <StatusBadge status={chamado.status} />
            </div>
          </div>

          <div className="line"></div>

          <section className="secao-detalhe">
            <h3>Descrição do problema</h3>
            <p>{chamado.descricao}</p>
          </section>

          <div className="informacoes">

            <div>
              <span>Tipo</span>
              <p>{chamado.tipo}</p>
            </div>

            <div>
              <span>Local</span>
              <p>{chamado.local}</p>
            </div>

            <div>
              <span>Data de abertura</span>
              <p>{formatarData(chamado.data_abertura)}</p>
            </div>

            <div>
              <span>Responsável</span>
              <p>{chamado.responsavel || "Ainda não definido"}</p>
            </div>
          </div>

          <div className="line"></div>

          <section className="secao-detalhe">
            <h3>Solução</h3>

            {resolvido ? (
              <>
                <p>{chamado.solucao || "Nenhuma solução registrada."}</p>
                <span>
                  Data da resolução: {formatarData(chamado.data_resolucao)}
                </span>
              </>
            ) : (
              <p>
                A solução será registrada quando o atendimento for concluído.
              </p>
            )}
          </section>

          {!resolvido && (
            <>
              <div className="line"></div>

              <section className="secao-atendimento">
                <h3>Atendimento</h3>

                {aberto && (
                  <>
                    <p>Informe quem ficará responsável pelo atendimento</p>

                    <input
                      type="text"
                      placeholder="Nome do responsável"
                      value={responsavel}
                      onChange={(e) => setResponsavel(e.target.value)}
                    />

                    <button className="botao-azul"
                      type="button"
                      onClick={iniciarAtendimento}>
                      Iniciar atendimento
                    </button>
                  </>
                )}

                {emAndamento && (
                  <>
                    <p>Descreva o processo de solução do problema</p>

                    <textarea
                      placeholder="Solução"
                      value={solucao}
                      onChange={(e) => setSolucao(e.target.value)}
                    />

                    <p>Data em que o problema foi resolvido</p>

                    <input
                      type="date"
                      value={dataResolucao}
                      onChange={(e) => setDataResolucao(e.target.value)}
                    />

                    <button className="botao-azul"
                      type="button"
                      onClick={resolverChamado}>
                      Resolver chamado
                    </button>
                  </>
                )}
              </section>
            </>
          )}

          {aberto && (
            <div className="acoes-detalhe">
              <Link to={`/editar/${chamado.id}`} className="botao-editar">
                Editar
              </Link>

              <button type="button"
                className="botao-excluir"
                onClick={ExcluirChamado}>
                Excluir
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default DetalheChamado;
