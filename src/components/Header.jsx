import "./Header.css";

function Header() {
    return (
        <header>
            <div className="header-content">
                <div className="logo">
                    <img src="/src/assets/logo-tickethub.png" alt="Logo do TicketHub" />
                </div>

                <div className="profile">
                    <p>Olá, Helloísa Leite</p>
                    <img src="/src/assets/perfil-icon.png" alt="Icone de perfil" />
                </div>
            </div>
            <div className="line"></div>
        </header>
    )
}

export default Header