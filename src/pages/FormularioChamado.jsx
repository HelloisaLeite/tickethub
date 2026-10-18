import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import "./FormularioChamado.css";

function FormularioChamado() {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [local, setLocal] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");

  /* Usa isso para navegar até as páginas depois do alert */
  const navegar = useNavigate();

  const { id } = useParams();
  const modoEdicao = Boolean(id);

  // parte de edição: buscar o chamado e preencher os campos
  useEffect(() => {
    if (!modoEdicao) return;

    async function buscarChamado() {
      try {
        const resposta = await api.get(`/chamados/${id}`);
        const chamado = resposta.data;

        setTitulo(chamado.titulo || "");
        setDescricao(chamado.descricao || "");
        setTipo(chamado.tipo || "");
        setLocal(chamado.local || "");
        setPrioridade(chamado.prioridade || "");
        setDataAbertura(
          chamado.data_abertura
            ? chamado.data_abertura.slice(0, 10)
            : ""
        );
      } catch (erro) {
        console.error(
          "Erro ao buscar chamado:",
          erro.response?.data || erro
        );
        alert("Não foi possível carregar o chamado para edição.");
        navegar("/chamados");
      }
    }

    buscarChamado();
  }, [id, modoEdicao]);

  /* Função para confirmar cancelamento */
  function cancelarFormulario() {
    const confirmar = window.confirm(
      "Tem certeza de que deseja cancelar? As informações preenchidas serão perdidas."
    );

    if (confirmar) {
      navegar("/chamados");
    }
  }

  /* Função para salvar o chamado */
  async function salvarChamado(event) {
    event.preventDefault();

    const dadosChamado = {
      titulo,
      descricao,
      tipo,
      local,
      prioridade,
      data_abertura: dataAbertura,
    };

    try {
      if (modoEdicao) {
        await api.put(`/chamados/${id}`, dadosChamado);
        alert("Chamado atualizado com sucesso!");
      } else {
        await api.post("/chamados", dadosChamado);
        alert("Chamado criado com sucesso!");
      }

      navegar("/chamados");
    } catch (erro) {
      console.error(
        "Erro ao salvar chamado:",
        erro.response?.data || erro
      );
      alert("Não foi possível salvar o chamado. Confira os dados.");
    }
  }

  return (
    <>
      <Header />

      <main className="pagina-formulario">
        <Link to="/chamados" className="voltar-chamados">
          ← Voltar para chamados
        </Link>

        <section className="formulario-box">
          <h2>Abrir/Editar chamado</h2>
          <p>Registre aqui o problema encontrado:</p>

          <form onSubmit={salvarChamado}>

            <div className="campo">
              <label htmlFor="titulo">Título</label>
              <input
                id="titulo"
                type="text"
                placeholder="Lâmpada queimada na sala 45"
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                placeholder="Descreva aqui..."
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
                required
              />
            </div>

            <div className="campos-duplos">
              <div className="campo">
                <label htmlFor="tipo">Tipo</label>
                <select
                  id="tipo"
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                  required>
                  <option value="">Selecionar</option>
                  <option value="elétrica">Elétrica</option>
                  <option value="hidráulica">Hidráulica</option>
                  <option value="informática">Informática</option>
                  <option value="climatização">Climatização</option>
                  <option value="mobiliário">Mobiliário</option>
                  <option value="limpeza">Limpeza</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="campo">
                <label htmlFor="local">Local</label>
                <select
                  id="local"
                  value={local}
                  onChange={(event) => setLocal(event.target.value)}
                  required>
                  <option value="">Selecionar</option>
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
            </div>

            <div className="campo">
              <label htmlFor="prioridae">Prioridade</label>
              <select
                id="prioridade"
                value={prioridade}
                onChange={(event) => setPrioridade(event.target.value)}
                required>
                <option value="">Selecionar</option>
                <option value="alta">Alta</option>
                <option value="média">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="data">Data</label>
              <input
                id="dataAbertura"
                type="date"
                value={dataAbertura}
                onChange={(event) => setDataAbertura(event.target.value)}
                required
              />
            </div>


            <div className="botoes-formulario">
              <div className="container-salvar">
                <button type="submit" className="botao-salvar">
                  Salvar chamado
                </button>
              </div>


              <div className="container-cancelar">
                <button
                  type="button"
                  className="botao-cancelar"
                  onClick={cancelarFormulario}
                >
                  Cancelar
                </button>
              </div>
            </div>

          </form>
        </section>

      </main>
    </>
  )
}

export default FormularioChamado