import "./Header.css";
import { useEffect, useState } from "react";
import api from "../services/api";

function Header() {
    const [nome, setNome] = useState("");

     useEffect(() => {
    async function buscarUsuario() {
      try {
        const resposta = await api.get("/eu");
        setNome(resposta.data.nome);
      } catch (erro) {
        console.error("Não foi possível carregar o usuário:", erro);
      }
    }

    buscarUsuario();
  }, []);

    return (
        <header>
            <div className="header-content">
                <div className="logo">
                    <img src="/src/assets/logo-tickethub.png" alt="Logo do TicketHub" />
                </div>

                <div className="profile">
                    <p>Olá, {nome || "usuário"}</p>
                    <img src="/src/assets/perfil-icon.png" alt="Icone de perfil" />
                </div>
            </div>
            <div className="line"></div>
        </header>
    )
}

export default Header