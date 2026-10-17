import {useState} from "react";
import { Link } from "react-router-dom";
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

  function salvarChamado(event) {
    event.preventDefault();

    const chamado = {
      titulo, 
      descricao, 
      tipo, 
      local, 
      prioridade, 
      data_abertura: dataAbertura,
    }

    console.log(chamado)
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
                <option value=""></option>
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
                <option value=""></option>
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
              <option value=""></option>
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
            <div className="botao-salvar">
              <button type="submit" className="botao-salvar">
                Salvar chamado
              </button>
            </div>
          
            <div className="botao-danger">
              <LinkBotao to="/chamados" clasName="botao-cancelar" variante="secondary">Cancelar</LinkBotao>
            </div>
          </div>
          
        </form>

        </section>

      </main>
    </>
  )
}

export default FormularioChamado