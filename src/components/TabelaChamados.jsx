import {Link} from "react-router-dom";
import "./TabelaChamados.css"
import StatusBadge from "./StatusBadge";


function TabelaChamados({ chamados }) {
    return (
        <div className="tabela-container">
            <table className="tabela-chamados">
                <thead>
                    <tr>
                        <th>Nº</th>
                        <th>Chamado</th>
                        <th>Local</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Data de abertura</th>
                    </tr>
                </thead>
                <tbody>
                    {chamados.map((chamado) => (
                        <tr key={chamado.id}>
                            <td>{chamado.id}</td>
                            <td><Link to={`/chamado/${chamado.id}`}>{chamado.titulo}</Link></td>
                            <td>{chamado.local}</td>
                            <td>{chamado.prioridade}</td>
                            <td><StatusBadge status={chamado.status} /></td>
                            <td>{chamado.data_abertura}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaChamados;