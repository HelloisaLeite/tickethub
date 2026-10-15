import "./StatusBadge.css";


function StatusBadge({ status }) {
    const classes = {
        "aberto": "status status-aberto",
        "em andamento": "status status-em-andamento",
        "resolvido": "status status-resolvido"
    };

    return (
        <span className={classes[status]}>
            {status}
        </span>
    );
}

export default StatusBadge;

