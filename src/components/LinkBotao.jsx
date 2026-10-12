import {Link} from 'react-router-dom';
import './LinkBotao.css';

function LinkBotao({ to, children, variante = "primary" }) {
    return (
        <Link to={to} className={`link-botao link-botao-${variante}`}>
            {children}
        </Link>
    );
}

export default LinkBotao;