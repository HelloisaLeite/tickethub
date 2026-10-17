import {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import "./FormularioChamado.css";
import LinkBotao from "../components/LinkBotao";

function FormularioChamado() {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [local, setLocal] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");

  /* Usa isso para navegar até as páginas depois do alert */
  const navegar = useNavigate();

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

    const chamado = {
      titulo,
      descricao,
      tipo,
      local,
      prioridade,
      data_abertura: dataAbertura,
    };

    try {
      const resposta = await api.post("/chamados", chamado);

      console.log("Chamado criado:", resposta.data);
      alert("Chamado criado com sucesso!");

      navegar("/chamados");

    } catch (erro) {
      console.error("Erro ao criar chamado:", erro.response?.data || erro);
      alert("Não foi possível criar o chamado. Confira os dados e tente novamente.");
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