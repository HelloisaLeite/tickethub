function Header() {
    return (
        <header>
            <div className="header-content">
                <div className="logo">
                    <img src="/src/assets/logo.png" alt="Logo do TicketHub" />
                </div>

                <div className="profile">
                    <p>Olá, Usuário!</p>
                    <img src="/src/assets/profile.png" alt="Icone de perfil" />
                </div>
            </div>
        </header>
    )
}

export default Header